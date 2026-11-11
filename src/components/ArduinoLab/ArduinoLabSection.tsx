import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../../types/portfolio';
import { Cpu, Terminal, Sliders, Radio, Activity, Zap, Play, RotateCcw, Send, CheckCircle2 } from 'lucide-react';

interface ArduinoLabProps {
  lang: Language;
}

export const ArduinoLabSection: React.FC<ArduinoLabProps> = ({ lang }) => {
  // Virtual Arduino Hardware State
  const [led13State, setLed13State] = useState<'off' | 'on' | 'blink'>('blink');
  const [blinkRateHz, setBlinkRateHz] = useState<number>(2); // 2 Hz
  
  // Analog Sensor A0 (Potentiometer: 0 - 1023)
  const [analogA0, setAnalogA0] = useState<number>(682);
  
  // Ultrasonic HC-SR04 Distance (2cm - 400cm)
  const [distanceCm, setDistanceCm] = useState<number>(24);
  
  // Servo Motor Angle (0 - 180 deg)
  const [servoAngle, setServoAngle] = useState<number>(90);
  
  // Relay State
  const [relayActive, setRelayActive] = useState<boolean>(false);

  // Serial Monitor Terminal
  const [baudRate, setBaudRate] = useState<number>(9600);
  const [serialLog, setSerialLog] = useState<string[]>([
    '[INIT] ATmega328P booting @ 16MHz...',
    '[SERIAL] Serial interface configured @ 9600 baud.',
    '[READY] Type "help" or adjust pins to test telemetry.',
    'ARDUINO_PORTFOLIO_LINK >> Connected to Abderrahmane Mlih Lab',
  ]);
  const [serialInput, setSerialInput] = useState<string>('');
  const [autoStream, setAutoStream] = useState<boolean>(false);

  // Canvas Oscilloscope for Analog A0
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const historyRef = useRef<number[]>(Array(50).fill(analogA0));

  const isLedLit = led13State !== 'off';

  // Oscilloscope canvas animation
  useEffect(() => {
    historyRef.current = [...historyRef.current.slice(1), analogA0];
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 100);
      ctx.stroke();
    }
    for (let y = 0; y < 100; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw waveform
    ctx.strokeStyle = '#10b981'; // emerald
    ctx.lineWidth = 2;
    ctx.beginPath();
    const step = canvas.width / (historyRef.current.length - 1);
    historyRef.current.forEach((val, idx) => {
      // invert y (1023 is top, 0 is bottom)
      const y = 90 - (val / 1023) * 80;
      const x = idx * step;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }, [analogA0]);

  // Auto Serial Telemetry Stream
  useEffect(() => {
    if (!autoStream) return;
    const timer = setInterval(() => {
      const voltage = ((analogA0 / 1023) * 5.0).toFixed(2);
      const echoUs = (distanceCm * 58.2).toFixed(0);
      const line = `[TELEM] A0: ${analogA0} (${voltage}V) | DIST: ${distanceCm}cm (${echoUs}µs) | SERVO: ${servoAngle}° | D13: ${isLedLit ? 'HIGH' : 'LOW'}`;
      setSerialLog((prev) => [...prev.slice(-40), line]);
    }, 1500);
    return () => clearInterval(timer);
  }, [autoStream, analogA0, distanceCm, servoAngle, isLedLit]);

  // Serial Monitor Command Dispatcher
  const handleCommandSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cmd = serialInput.trim();
    if (!cmd) return;

    const newLogs = [...serialLog, `> ${cmd}`];
    const lower = cmd.toLowerCase();

    if (lower === 'help') {
      newLogs.push('--- AVAILABLE SERIAL COMMANDS ---');
      newLogs.push('status           - Dump full telemetry of all digital/analog pins');
      newLogs.push('led on           - Force digital pin 13 to HIGH');
      newLogs.push('led off          - Force digital pin 13 to LOW');
      newLogs.push('blink [1-10]     - Set LED 13 blink frequency (e.g. blink 4)');
      newLogs.push('servo [0-180]    - Rotate servo motor to specific degree');
      newLogs.push('cv               - Output formatted developer resume summary');
      newLogs.push('skills           - List technical capabilities & frameworks');
      newLogs.push('anime            - Print hardware hacker anime quote & easter egg');
      newLogs.push('clear            - Clear serial buffer console');
    } else if (lower === 'status' || lower === 'read_pins') {
      newLogs.push(`PIN_13: ${isLedLit ? 'HIGH' : 'LOW'} (Mode: ${led13State})`);
      newLogs.push(`ANALOG_A0: ${analogA0} raw (${((analogA0 / 1023) * 5).toFixed(2)}V)`);
      newLogs.push(`HC_SR04_DIST: ${distanceCm} cm`);
      newLogs.push(`SERVO_POS: ${servoAngle} deg PWM`);
      newLogs.push(`RELAY_COIL: ${relayActive ? 'ENERGIZED (CLOSED)' : 'OPEN'}`);
    } else if (lower === 'led on') {
      setLed13State('on');
      newLogs.push('ACK: D13 set to HIGH (Continuous ON)');
    } else if (lower === 'led off') {
      setLed13State('off');
      newLogs.push('ACK: D13 set to LOW (OFF)');
    } else if (lower.startsWith('blink')) {
      const parts = lower.split(' ');
      const hz = parts[1] ? Math.max(1, Math.min(10, parseInt(parts[1], 10))) : 2;
      setBlinkRateHz(hz);
      setLed13State('blink');
      newLogs.push(`ACK: D13 blink frequency set to ${hz} Hz`);
    } else if (lower.startsWith('servo')) {
      const parts = lower.split(' ');
      const deg = parts[1] ? Math.max(0, Math.min(180, parseInt(parts[1], 10))) : 90;
      setServoAngle(deg);
      newLogs.push(`ACK: Servo PWM pulse updated -> ${deg}°`);
    } else if (lower === 'cv') {
      newLogs.push('====================================================');
      newLogs.push('CANDIDATE: Abderrahmane Mlih | Casablanca, Morocco');
      newLogs.push('ROLE: Full-Stack Web Developer (React.js, Laravel)');
      newLogs.push('CONTACT: abderrahmanmlih9@gmail.com | +212-644353222');
      newLogs.push('STAGE: Baydeck (GoFlexiMobile), Tedi services, La casa podcast');
      newLogs.push('FORMATION: ISTA NTIC SM (2024-2026) | ALX Africa Certified');
      newLogs.push('====================================================');
    } else if (lower === 'skills') {
      newLogs.push('FRONTEND: React.js, Tailwind CSS, TypeScript, ES6+, HTML5/CSS3');
      newLogs.push('BACKEND:  Laravel, PHP, MySQL, Bun, Python, REST APIs');
      newLogs.push('EMBEDDED: Arduino (C/C++), ESP32, UART, Sensors, PWM, I2C');
    } else if (lower === 'anime') {
      newLogs.push('>>> EL PSY KONGROO (Steins;Gate Future Gadget Lab)');
      newLogs.push('"Ten billion percent! There is nothing science cannot solve." - Senku');
      newLogs.push('Discipline + Curiosity = Unstoppable engineering velocity.');
    } else if (lower === 'clear') {
      setSerialLog(['[SERIAL] Buffer cleared.']);
      setSerialInput('');
      return;
    } else {
      newLogs.push(`ERR: Unknown command "${cmd}". Type "help" for syntax.`);
    }

    setSerialLog(newLogs.slice(-35));
    setSerialInput('');
  };

  return (
    <section id="arduino-lab" className="py-20 border-b border-stone-200 dark:border-stone-800 bg-stone-950 text-stone-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                {lang === 'fr' ? 'Systèmes Embarqués & Prototypage IoT' : 'Embedded Systems & IoT Workbench'}
              </span>
              <span>·</span>
              <span>ATmega328P & ESP32</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              {lang === 'fr' ? 'Laboratoire Virtuel Arduino' : 'Virtual Arduino Hardware Lab'}
            </h2>
            <p className="mt-3 text-stone-400 max-w-2xl text-sm md:text-base leading-relaxed">
              {lang === 'fr'
                ? 'Mon intérêt pour les microcontrôleurs et l’IOT enrichit ma vision du développement web : gestion des états temps réel, protocoles série bas niveau et synchronisation hardware-logiciel.'
                : 'Tinkering with microcontrollers and IoT bridges the physical and digital worlds: asynchronous telemetry, UART serial pipelines, and real-time state machines.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAutoStream((prev) => !prev)}
              type="button"
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer border ${
                autoStream
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border-stone-700'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${autoStream ? 'animate-pulse text-emerald-400' : ''}`} />
              <span>{autoStream ? (lang === 'fr' ? 'Streaming Télémétrie ON' : 'Telemetry Streaming ON') : (lang === 'fr' ? 'Lancer Streaming Télémétrie' : 'Stream Telemetry')}</span>
            </button>
          </div>
        </div>

        {/* The Hardware Board & Oscilloscope Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Microcontroller Pin Interactive Controls */}
          <div className="lg:col-span-7 bg-stone-900/80 border border-stone-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            {/* PCB Trace decorative background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Board Header Bar */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white font-mono flex items-center gap-2">
                    <span>ARDUINO_CORE_REV3</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      16.0 MHz
                    </span>
                  </h3>
                  <span className="text-xs text-stone-400">
                    {lang === 'fr' ? 'Banc d’essai interactif des broches I/O' : 'Interactive GPIO Pin Control Bank'}
                  </span>
                </div>
              </div>

              {/* Board Power Indicator */}
              <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                <span>VCC: 5.0V</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
              </div>
            </div>

            {/* Pin 1: D13 Built-in LED */}
            <div className="p-4 bg-stone-950/70 border border-stone-800/80 rounded-xl mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  {/* Glowing LED representation */}
                  <div
                    className={`w-4 h-4 rounded-full border transition-all duration-100 ${
                      led13State === 'on'
                        ? 'bg-amber-400 border-amber-300 shadow-[0_0_12px_#fbbf24]'
                        : led13State === 'blink'
                        ? 'animate-led-blink'
                        : 'bg-stone-800 border-stone-700'
                    }`}
                    style={led13State === 'blink' ? { animationDuration: `${1 / blinkRateHz}s` } : undefined}
                  />
                  <div>
                    <span className="text-xs font-mono font-bold text-stone-200">DIGITAL PIN 13 (LED_BUILTIN)</span>
                    <span className="block text-[11px] text-stone-500">
                      {lang === 'fr' ? 'Indicateur lumineux d’état embarqué' : 'Onboard surface mount LED indicator'}
                    </span>
                  </div>
                </div>

                {/* State selector buttons */}
                <div className="flex items-center gap-1 p-1 bg-stone-900 rounded-lg">
                  <button
                    onClick={() => setLed13State('off')}
                    type="button"
                    className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer transition-colors ${
                      led13State === 'off' ? 'bg-stone-800 text-white font-semibold' : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    LOW (OFF)
                  </button>
                  <button
                    onClick={() => setLed13State('on')}
                    type="button"
                    className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer transition-colors ${
                      led13State === 'on' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    HIGH (ON)
                  </button>
                  <button
                    onClick={() => setLed13State('blink')}
                    type="button"
                    className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer transition-colors ${
                      led13State === 'blink' ? 'bg-emerald-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    BLINK
                  </button>
                </div>
              </div>

              {led13State === 'blink' && (
                <div className="flex items-center gap-3 pt-2 text-xs font-mono text-stone-400">
                  <span>Frequency:</span>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={blinkRateHz}
                    onChange={(e) => setBlinkRateHz(Number(e.target.value))}
                    className="flex-1 accent-emerald-500 cursor-pointer h-1.5 bg-stone-800 rounded-lg"
                  />
                  <span className="text-emerald-400 font-bold w-12 text-right">{blinkRateHz} Hz</span>
                </div>
              )}
            </div>

            {/* Pin 2: Analog Pin A0 Potentiometer & Voltage */}
            <div className="p-4 bg-stone-950/70 border border-stone-800/80 rounded-xl mb-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs font-mono font-bold text-stone-200">ANALOG IN (A0) - 10-bit ADC</span>
                  <span className="block text-[11px] text-stone-500">
                    {lang === 'fr' ? 'Potentiomètre ou capteur analogique (0 à 1023)' : 'Potentiometer slider (0 to 1023 resolution)'}
                  </span>
                </div>
                <div className="text-right font-mono">
                  <span className="text-sm font-bold text-emerald-400">{analogA0}</span>
                  <span className="text-stone-500 text-xs ml-1.5">
                    ({((analogA0 / 1023) * 5.0).toFixed(2)}V)
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="1023"
                value={analogA0}
                onChange={(e) => setAnalogA0(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-stone-800 rounded-lg mt-1"
              />

              {/* Oscilloscope Mini Waveform */}
              <div className="mt-3 pt-2 border-t border-stone-800/60">
                <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 mb-1">
                  <span className="flex items-center gap-1">
                    <Activity className="w-3 h-3 text-emerald-500" />
                    OSCILLOSCOPE PROBE (A0)
                  </span>
                  <span>TIMEBASE: 50ms/div</span>
                </div>
                <canvas
                  ref={canvasRef}
                  width={420}
                  height={70}
                  className="w-full h-[70px] bg-stone-900/90 rounded border border-stone-800"
                />
              </div>
            </div>

            {/* Pin 3: Ultrasonic HC-SR04 & Servo Motor Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Ultrasonic Distance */}
              <div className="p-4 bg-stone-950/70 border border-stone-800/80 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-stone-200">HC-SR04 ULTRASONIC</span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">{distanceCm} cm</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="200"
                  value={distanceCm}
                  onChange={(e) => setDistanceCm(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-stone-800 rounded-lg mb-2"
                />
                <div className="text-[10px] font-mono text-stone-500">
                  Echo: {(distanceCm * 58.2).toFixed(0)} µs time-of-flight
                </div>
              </div>

              {/* Servo Angle */}
              <div className="p-4 bg-stone-950/70 border border-stone-800/80 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-stone-200">PWM SERVO MOTOR (D9)</span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">{servoAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="180"
                  value={servoAngle}
                  onChange={(e) => setServoAngle(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-stone-800 rounded-lg mb-2"
                />
                <div className="flex items-center justify-between text-[10px] font-mono text-stone-500">
                  <span>Pulse: {Math.round(1000 + (servoAngle / 180) * 1000)} µs</span>
                  <span
                    className="w-4 h-1 bg-amber-400 rounded transition-transform origin-left inline-block"
                    style={{ transform: `rotate(${servoAngle - 90}deg)` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Serial Monitor Console on Right */}
          <div className="lg:col-span-5 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 flex flex-col h-[520px] shadow-2xl">
            {/* Serial Header */}
            <div className="flex items-center justify-between pb-4 mb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Serial Monitor (/dev/ttyUSB0)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={baudRate}
                  onChange={(e) => setBaudRate(Number(e.target.value))}
                  className="bg-stone-950 border border-stone-800 text-stone-300 text-[11px] font-mono rounded px-2 py-1 outline-none"
                >
                  <option value={9600}>9600 baud</option>
                  <option value={115200}>115200 baud</option>
                </select>
                <button
                  onClick={() => setSerialLog(['[SERIAL] Monitor cleared.'])}
                  type="button"
                  title="Clear Console"
                  className="p-1 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Terminal Output Area */}
            <div className="flex-1 bg-stone-950 rounded-xl p-3.5 font-mono text-[11px] overflow-y-auto custom-scrollbar border border-stone-800/80 space-y-1">
              {serialLog.map((line, idx) => (
                <div
                  key={idx}
                  className={`${
                    line.startsWith('>')
                      ? 'text-amber-400 font-semibold'
                      : line.startsWith('[ERR]')
                      ? 'text-rose-400'
                      : line.startsWith('[TELEM]')
                      ? 'text-emerald-400'
                      : line.startsWith('ACK:')
                      ? 'text-sky-300'
                      : 'text-stone-300'
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Quick Command Chips */}
            <div className="flex items-center gap-1.5 py-2 overflow-x-auto custom-scrollbar text-[10px] font-mono text-stone-400">
              <span>Try:</span>
              <button
                onClick={() => { setSerialInput('help'); }}
                className="px-2 py-0.5 bg-stone-800 hover:bg-stone-700 rounded text-stone-300 cursor-pointer"
              >
                help
              </button>
              <button
                onClick={() => { setSerialInput('status'); }}
                className="px-2 py-0.5 bg-stone-800 hover:bg-stone-700 rounded text-stone-300 cursor-pointer"
              >
                status
              </button>
              <button
                onClick={() => { setSerialInput('cv'); }}
                className="px-2 py-0.5 bg-stone-800 hover:bg-stone-700 rounded text-emerald-400 cursor-pointer"
              >
                cv
              </button>
              <button
                onClick={() => { setSerialInput('anime'); }}
                className="px-2 py-0.5 bg-stone-800 hover:bg-stone-700 rounded text-amber-400 cursor-pointer"
              >
                anime
              </button>
            </div>

            {/* Command Input Form */}
            <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={serialInput}
                onChange={(e) => setSerialInput(e.target.value)}
                placeholder={lang === 'fr' ? 'Tapez une commande série (ex: status, led on, cv)...' : 'Type command (e.g. help, status, cv, led on)...'}
                className="flex-1 bg-stone-950 border border-stone-800 focus:border-emerald-500 rounded-lg px-3 py-2 text-xs font-mono text-stone-200 outline-none placeholder:text-stone-600 transition-colors"
              />
              <button
                type="submit"
                className="p-2 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold rounded-lg transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Embedded Projects Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 bg-stone-900/60 border border-stone-800 rounded-2xl hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <span>Hardware #1</span>
              <span>·</span>
              <span>Arduino Uno + LCD</span>
            </div>
            <h4 className="text-base font-bold text-white mb-2">
              {lang === 'fr' ? 'Chronomètre WCA Précision Milliseconde' : 'Millisecond-Accurate WCA Speedcube Timer'}
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              {lang === 'fr'
                ? 'Conception d’un chronomètre physique pour speedcubing avec touches capacitives en aluminium, microcontrôleur ATmega328P et affichage LCD I2C instantané.'
                : 'Engineered a dedicated physical speedcubing timer with dual capacitive touch pads, ATmega328P millisecond timers, and I2C liquid crystal readout.'}
            </p>
            <div className="text-[11px] font-mono text-stone-500">
              Stack: C++, Arduino IDE, CapSense, I2C LiquidCrystal
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-stone-900/60 border border-stone-800 rounded-2xl hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <span>Hardware #2</span>
              <span>·</span>
              <span>ESP32 + MQTT</span>
            </div>
            <h4 className="text-base font-bold text-white mb-2">
              {lang === 'fr' ? 'Station IoT & Télémétrie Climat' : 'IoT Ambient Telemetry Node'}
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              {lang === 'fr'
                ? 'Station météo et qualité de l’air avec capteurs DHT22 et MQ-135, publiant ses métriques en temps réel sur un broker MQTT relié à un tableau de bord React.'
                : 'Ambient room condition monitor with DHT22 and air quality probes, transmitting real-time sensor frames over MQTT to a centralized React dashboard.'}
            </p>
            <div className="text-[11px] font-mono text-stone-500">
              Stack: ESP32 WiFi, MQTT, PubSubClient, React Dashboard
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-stone-900/60 border border-stone-800 rounded-2xl hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <span>Hardware #3</span>
              <span>·</span>
              <span>RFID + Laravel Bridge</span>
            </div>
            <h4 className="text-base font-bold text-white mb-2">
              {lang === 'fr' ? 'Lecteur de Badges RFID pour Présence' : 'RFID Smart Attendance Bridge'}
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              {lang === 'fr'
                ? 'Passerelle physique de pointage utilisant un lecteur RFID RC522. Les scans UID sont validés et synchronisés directement avec l’application de gestion des absences OFPPT.'
                : 'Hardware attendance check-in terminal utilizing an MFRC522 RFID scanner, instantly communicating card UID scans over serial to the Laravel API.'}
            </p>
            <div className="text-[11px] font-mono text-stone-500">
              Stack: RC522 SPI, Serial-to-REST daemon, Laravel Auth
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
