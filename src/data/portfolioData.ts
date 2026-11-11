import { Project, Experience, Certificate, Education, AnimeInspiration } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Abderrahmane Mlih',
  title: {
    fr: 'Développeur Web Full-Stack',
    en: 'Full-Stack Web Developer',
  },
  tagline: {
    fr: "Développeur Full-Stack à Casablanca · React.js, Laravel, Speedcubing & Arduino",
    en: "Full-Stack Developer in Casablanca · React.js, Laravel, Speedcubing & Arduino",
  },
  bio: {
    fr: "Développeur Full-Stack basé à Casablanca. Je conçois des interfaces réactives sous React.js et des backends solides avec Laravel et TypeScript. Mon expérience sur des projets réels chez Baydeck et Tedi services se double d'une passion quotidienne pour la résolution rapide du Rubik's Cube (méthode CFOP) et le prototypage électronique sur microcontrôleurs Arduino.",
    en: "Full-stack developer from Casablanca. I build responsive frontends with React and clean, robust backends with Laravel and TypeScript. Alongside real-world work at Baydeck and Tedi services, I channel my problem-solving drive into competitive speedcubing (sub-20s CFOP) and hands-on Arduino hardware prototyping.",
  },
  location: 'Casablanca, Maroc',
  email: 'abderrahmanmlih9@gmail.com',
  phone: '+212-644353222',
  github: 'https://github.com/Son-Abderrahmane',
  linkedin: 'https://www.linkedin.com/in/abderrahmane-mlih/',
  cvPdfUrl: '/assets/aistudio/CV-Abderrahmane-Mlih_1ea73a6e.pdf',
};

export const EXPERIENCES: Experience[] = [
  {
    id: 'la-casa-podcast',
    role: {
      fr: 'Développeur Full-Stack & Gestion Technique',
      en: 'Full-Stack Developer & Technical Operations',
    },
    company: 'La casa podcast',
    period: '03-2026 / 05-2026',
    location: 'Casablanca, Maroc',
    description: {
      fr: 'Développement d’une application de facturation, gestion du matériel audiovisuel (caméras et éclairage) et optimisation du workflow vidéo pour la production de contenus podcast.',
      en: 'Engineered a specialized billing and asset management web application for audiovisual equipment (cameras, studio lighting) and streamlined video post-production workflows for podcast media.',
    },
    achievements: {
      fr: [
        'Conception et déploiement du module de facturation et génération automatisée de devis/factures.',
        'Système d’inventaire dynamique pour la réservation et le suivi d’usure du matériel audiovisuel de pointe.',
        'Intégration d’un pipeline de gestion de fichiers et synchronisation des rushes vidéo.',
      ],
      en: [
        'Designed and deployed automated invoicing and quotation generation pipeline.',
        'Created dynamic inventory tracking system for professional studio cameras and lighting rigs.',
        'Integrated automated media asset management for video podcast episodes.',
      ],
    },
    skills: ['React.js', 'Laravel', 'MySQL', 'Tailwind CSS', 'Asset Management'],
  },
  {
    id: 'tedi-services',
    role: {
      fr: 'Développeur Web Full-Stack',
      en: 'Web Developer Full-Stack',
    },
    company: 'Tedi services',
    period: '11-2025 / 02-2026',
    location: 'Casablanca, Maroc',
    projectWorkedOn: 'tedi-export',
    description: {
      fr: 'Développement d’interfaces web modernes et responsives en collaboration avec l’équipe technique (Laravel) sur la solution tedi-export.',
      en: 'Engineered responsive modern web interfaces and backend integration in close collaboration with the technical engineering team using Laravel for the tedi-export product.',
    },
    achievements: {
      fr: [
        'Développement d’interfaces utilisateur intuitives sous Laravel Blade et JavaScript moderne.',
        'Optimisation des temps de chargement des tableaux de données et filtres d’exportation.',
        'Maintenance évolutive et correction de bugs sur les applications web internes.',
      ],
      en: [
        'Developed intuitive user interfaces using Laravel and modern JavaScript for complex export queries.',
        'Optimized data table rendering and query performance for high-volume exports.',
        'Maintained agile code quality, debugging, and continuous feature rollouts.',
      ],
    },
    skills: ['Laravel', 'JavaScript', 'MySQL', 'Tailwind CSS', 'REST API', 'Git'],
  },
  {
    id: 'baydeck',
    role: {
      fr: 'Développeur Frontend React',
      en: 'Frontend React Developer',
    },
    company: 'Baydeck',
    period: '07-2025 / 08-2025',
    location: 'Casablanca, Maroc',
    projectWorkedOn: 'GoFlexiMobile',
    description: {
      fr: 'Contribution active au développement d’applications web React.js et à la création d’interfaces utilisateur hautement responsives sur le projet GoFlexiMobile.',
      en: 'Contributed to the core frontend development of React.js web applications, crafting mobile-first responsive interfaces and micro-interactions for the GoFlexiMobile product.',
    },
    achievements: {
      fr: [
        'Création d’un design system responsive avec Tailwind CSS adapté aux écrans mobiles et desktop.',
        'Découpage en composants React modulaires réutilisables avec gestion propre du state.',
        'Respect scrupuleux des normes d’accessibilité et de performance mobile.',
      ],
      en: [
        'Built a modular, responsive UI component library with React and Tailwind CSS.',
        'Refined touch interactions and layout stability across diverse mobile viewports.',
        'Reduced interface rendering latency through memoized components and clean hooks.',
      ],
    },
    skills: ['React.js', 'Tailwind CSS', 'JavaScript', 'UI/UX Design', 'Component Architecture'],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'gofleximobile',
    title: 'GoFlexiMobile',
    tagline: {
      fr: 'Application web responsive pensée mobile-first avec React et Tailwind CSS.',
      en: 'Mobile-first responsive web application built with React and Tailwind CSS.',
    },
    description: {
      fr: 'Développement d’une application web moderne et ultra-responsive en appliquant les meilleures pratiques UI/UX, assurant une navigation fluide sur mobile et desktop.',
      en: 'Engineered a modern, ultra-responsive web application applying modern UI/UX standards, ensuring frictionless navigation across both mobile viewports and desktop workstations.',
    },
    fullDetails: {
      fr: 'Projet développé chez Baydeck. Focus particulier sur la modularité des composants React, la rapidité d’exécution et une hiérarchie visuelle claire.',
      en: 'Built during tenure at Baydeck. Special emphasis on modular React architecture, fast rendering cycles, and clear visual hierarchy.',
    },
    technologies: ['React.js', 'Tailwind CSS', 'JavaScript (ES6+)', 'HTML5/CSS3'],
    category: 'frontend',
    companyOrContext: 'Baydeck',
    year: '2025',
    highlights: {
      fr: ['Design 100% responsive', 'Composants réutilisables', 'Score Lighthouse 95+'],
      en: ['100% responsive mobile-first', 'Modular reusable components', '95+ Lighthouse score'],
    },
    featured: true,
  },
  {
    id: 'absence-management',
    title: 'Système de Gestion des Absences',
    tagline: {
      fr: 'Plateforme institutionnelle OFPPT avec suivi en temps réel et gestion des rôles.',
      en: 'Institutional OFPPT attendance tracking and role management platform.',
    },
    description: {
      fr: 'Conception et développement d’une application web de gestion des absences pour l’OFPPT avec suivi granulaire, gestion des autorisations et reporting dynamique.',
      en: 'Engineered a full-stack student attendance management platform for OFPPT featuring granular tracking, multi-tier user permissions, and automated status notifications.',
    },
    fullDetails: {
      fr: 'Combine une API REST Laravel robuste avec un client React rapide. Inclut l’authentification sécurisée, la génération de rapports d’absence et la gestion des formateurs/stagiaires.',
      en: 'Combines a robust Laravel REST API with a reactive React frontend. Features role-based access control, automated absence justifications, and exportable analytics.',
    },
    technologies: ['React.js', 'Laravel', 'MySQL', 'Tailwind CSS', 'REST API'],
    category: 'fullstack',
    companyOrContext: 'OFPPT NTIC SM',
    year: '2025',
    highlights: {
      fr: ['Suivi en temps réel des absences', 'Architecture API REST', 'Authentification RBAC'],
      en: ['Real-time absence logging', 'RESTful API architecture', 'Role-based access control'],
    },
    featured: true,
  },
  {
    id: 'e-invoicing',
    title: 'E-Invoicing System',
    tagline: {
      fr: 'Moteur de facturation électronique ultra-rapide propulsé par Bun, TypeScript et Python.',
      en: 'High-throughput electronic invoicing engine powered by Bun, TypeScript, and Python.',
    },
    description: {
      fr: 'Développement d’une solution moderne d’automatisation des processus de facturation électronique, validation fiscale et génération de documents.',
      en: 'Architected an automated electronic invoicing and tax computation solution designed for high throughput, data validation, and asynchronous PDF generation.',
    },
    fullDetails: {
      fr: 'Utilisation de Bun pour l’exécution ultra-rapide de TypeScript et scripts Python pour le calcul financier et la conversion de documents normalisés.',
      en: 'Leveraged Bun runtime for sub-millisecond API execution and Python scripts for compliant financial number crunching and schema validation.',
    },
    technologies: ['Bun', 'TypeScript', 'Python', 'Tailwind CSS', 'JSON Schema'],
    category: 'backend',
    companyOrContext: 'Projet d’ingénierie',
    year: '2025',
    highlights: {
      fr: ['Exécution Bun haute performance', 'Scripts Python de validation', 'Génération automatisée de factures'],
      en: ['High-performance Bun execution', 'Python validation scripts', 'Automated document pipeline'],
    },
    featured: true,
  },
  {
    id: 'tedi-export',
    title: 'Tedi Services Platform & tedi-export',
    tagline: {
      fr: 'Outils internes de gestion commerciale et d’exportation de données métier.',
      en: 'Internal business management and high-volume data export application.',
    },
    description: {
      fr: 'Participation au développement et à la maintenance d’applications web internes pour des besoins métier réels au sein de l’équipe technique de Tedi services.',
      en: 'Contributed to the development and ongoing maintenance of core internal web applications, streamlining daily operational data flows and export capabilities.',
    },
    fullDetails: {
      fr: 'Intégration poussée sous Laravel avec gestion de requêtes SQL optimisées, sécurisation des flux de données et interfaces réactives.',
      en: 'Deep Laravel integration with query-optimized data structures, secured endpoint layers, and reactive data tables.',
    },
    technologies: ['Laravel', 'JavaScript', 'MySQL', 'CSS3/Tailwind', 'Git/GitHub'],
    category: 'fullstack',
    companyOrContext: 'Tedi services',
    year: '2025 - 2026',
    highlights: {
      fr: ['Module d’export tedi-export', 'Requêtes SQL optimisées', 'Codebase maintenable'],
      en: ['Custom tedi-export engine', 'Optimized SQL queries', 'Production maintainability'],
    },
  },
  {
    id: 'archiflow',
    title: 'Archiflow',
    tagline: {
      fr: 'Système intelligent de gestion et d’archivage documentaire pour l’OFPPT.',
      en: 'Intelligent document management and archiving system for OFPPT.',
    },
    description: {
      fr: 'Développement d’une application de gestion et d’archivage documentaire permettant de numériser, classer et retrouver facilement les documents administratifs.',
      en: 'Developed a comprehensive digital archiving and file tracking system enabling rapid scanning, indexing, categorization, and retrieval of institutional documents.',
    },
    fullDetails: {
      fr: 'Moteur de recherche par métadonnées, gestion fine des droits d’accès aux archives et interface épurée facilitant la saisie pour le personnel administratif.',
      en: 'Metadata-driven document search, hierarchical category tagging, and audit trail for secure institutional record keeping.',
    },
    technologies: ['Laravel', 'React.js', 'MySQL', 'Tailwind CSS', 'Object Storage'],
    category: 'fullstack',
    companyOrContext: 'OFPPT',
    year: '2024 - 2025',
    highlights: {
      fr: ['Archivage sécurisé', 'Recherche instantanée', 'Workflow d’approbation'],
      en: ['Secure digital vaults', 'Instant metadata search', 'Verification workflow'],
    },
  },
  {
    id: 'arduino-iot-rig',
    title: 'Arduino IoT Hardware Lab & Cube Timer',
    tagline: {
      fr: 'Chronomètre WCA intelligent et passerelle de télémétrie pour microcontrôleurs.',
      en: 'Smart WCA Rubik’s cube timer & microcontroller sensor telemetry gateway.',
    },
    description: {
      fr: 'Conception de prototypes électroniques combinant Arduino Uno/ESP32, capteurs ultrasons, écran LCD et communication série bidirectionnelle avec interface web.',
      en: 'Designed embedded hardware prototypes pairing Arduino Uno/ESP32 microcontrollers, ultrasonic sensors, custom speedcubing touch pads, and real-time serial web telemetry.',
    },
    fullDetails: {
      fr: 'Passionné par l’IOT et l’interaction hardware-software. Comprend un chronomètre de speedcubing précis à la milliseconde avec détection capacitive et moniteur série Web.',
      en: 'Explores hardware-to-software bridging. Features millisecond-accurate speedcubing touch triggers, sensor telemetry, and live serial monitor telemetry console.',
    },
    technologies: ['Arduino (C/C++)', 'ESP32', 'WebSockets', 'React.js', 'IoT/Sensors'],
    category: 'hardware',
    companyOrContext: 'Hardware & IoT Lab',
    year: '2024 - 2026',
    highlights: {
      fr: ['Chronométrage à la milliseconde', 'Télémétrie série temps réel', 'Circuits & microcontrôleurs'],
      en: ['Millisecond touch timing', 'Live serial telemetry stream', 'Embedded C/C++ control'],
    },
    featured: true,
  },
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 'alx-frontend',
    title: 'Alx Front End Web Development',
    issuer: 'Alx-Africa',
    period: '01-2025 / 04-2025',
    credentialUrl: 'https://savanna.alxafrica.com/certificates/zH7MS6YsLZ',
    description: {
      fr: 'Certification approfondie en développement web Frontend : maîtrise de JavaScript moderne, React, accessibilité, architecture logicielle et tests.',
      en: 'Intensive specialization in modern Frontend engineering: JavaScript deep-dives, React component lifecycle, accessibility, software architecture, and testing.',
    },
    skills: ['React.js', 'Modern JavaScript', 'CSS3/Tailwind', 'Responsive Web Design', 'Git Workflow'],
  },
  {
    id: 'alx-foundations',
    title: 'ALX Professional Foundations',
    issuer: 'Alx-Africa',
    period: '10-2024 / 12-2024',
    credentialUrl: 'https://savanna.alxafrica.com/certificates/x9mMELYJC8',
    description: {
      fr: 'Formation d’excellence en compétences professionnelles : résolution de problèmes complexes, esprit critique, communication stratégique et leadership collaboratif.',
      en: 'Rigorous professional leadership and engineering foundation program: complex problem-solving, critical thinking, agile collaboration, and execution discipline.',
    },
    skills: ['Problem Solving', 'Critical Thinking', 'Team Leadership', 'Communication', 'Agile Mindset'],
  },
];

export const EDUCATION: Education[] = [
  {
    id: 'ista-ntic',
    degree: {
      fr: 'Formation professionnelle en développement web Full-Stack',
      en: 'Professional Degree in Full-Stack Web Development',
    },
    institution: 'Institut Spécialisé de Technologie Appliquée NTIC SM',
    period: '2024 - 2026',
    location: 'Casablanca, Maroc',
    field: {
      fr: 'Développement Web Full-Stack (React, Laravel, Bases de données, Architecture logicielle)',
      en: 'Full-Stack Web Engineering (React, Laravel, Database Architecture, OOP)',
    },
  },
  {
    id: 'bac-scientifique',
    degree: {
      fr: 'Baccalauréat scientifique – option Physique',
      en: 'Scientific Baccalaureate – Physics Track',
    },
    institution: 'Lycée Qualifiant Jaâfar Elfassi Elfihri',
    period: '2023 - 2024',
    location: 'Casablanca, Maroc',
    field: {
      fr: 'Sciences Physiques, Mathématiques et modélisation scientifique',
      en: 'Physics, Mathematics, and Analytical Modeling',
    },
  },
];

export const SKILL_CATEGORIES = [
  {
    name: { fr: 'Développement Frontend', en: 'Frontend Engineering' },
    skills: [
      { name: 'React.js', level: 92 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'TypeScript', level: 85 },
      { name: 'JavaScript (ES6+)', level: 90 },
      { name: 'HTML5 & CSS3', level: 95 },
      { name: 'jQuery', level: 80 },
    ],
  },
  {
    name: { fr: 'Backend & Bases de Données', en: 'Backend & Databases' },
    skills: [
      { name: 'Laravel (PHP)', level: 88 },
      { name: 'MySQL', level: 85 },
      { name: 'Bun Runtime', level: 82 },
      { name: 'Python', level: 78 },
      { name: 'RESTful APIs', level: 90 },
      { name: 'OOP (Programmation Orientée Objet)', level: 92 },
    ],
  },
  {
    name: { fr: 'IoT & Systèmes Embarqués', en: 'Hardware & IoT' },
    skills: [
      { name: 'Arduino (C/C++)', level: 88 },
      { name: 'Microcontrôleurs & Capteurs', level: 85 },
      { name: 'Communication Série & UART', level: 82 },
      { name: 'Prototypage Breadboard', level: 90 },
      { name: 'Logique Algorithmique (CFOP)', level: 95 },
    ],
  },
  {
    name: { fr: 'Outils & Méthodologie', en: 'DevOps & Tooling' },
    skills: [
      { name: 'Git & GitHub Workflow', level: 90 },
      { name: 'Debugging & DevTools', level: 92 },
      { name: 'Linux / Bash Scripting', level: 82 },
      { name: 'UI/UX Prototyping', level: 86 },
    ],
  },
];

export const SOFT_SKILLS = [
  { fr: 'Résolution de problèmes', en: 'Complex Problem Solving' },
  { fr: 'Esprit critique & Analyse', en: 'Critical Thinking' },
  { fr: 'Adaptabilité agile', en: 'Adaptability & Quick Learning' },
  { fr: 'Travail d’équipe', en: 'Collaborative Teamwork' },
  { fr: 'Communication claire', en: 'Clear Communication' },
];

export const LANGUAGES = [
  { name: { fr: 'Arabe', en: 'Arabic' }, level: { fr: 'Langue maternelle (Courant)', en: 'Native Speaker' }, proficiency: 100 },
  { name: { fr: 'Français', en: 'French' }, level: { fr: 'Bilingue / Bon niveau', en: 'Bilingual / Fluent' }, proficiency: 88 },
  { name: { fr: 'Anglais', en: 'English' }, level: { fr: 'Professionnel / Bon niveau', en: 'Professional Working' }, proficiency: 85 },
];

export const ANIME_INSPIRATIONS: AnimeInspiration[] = [
  {
    title: 'Steins;Gate',
    japaneseTitle: 'シュタインズ・ゲート',
    characterOrTheme: 'Rintaro Okabe & Future Gadget Lab',
    connectionToDev: {
      fr: 'L’amour pour le bricolage hardware, les microcontrôleurs, les tubes nixie et la curiosité obsessionnelle de comprendre comment chaque ligne de code affecte le monde.',
      en: 'The obsession with garage hardware hacking, microcontrollers, embedded timing, and the unrelenting curiosity to understand how software bends physical reality.',
    },
    quote: 'There is no such thing as a coincidence in this world. There is only the inevitable.',
    quoteAuthor: 'Steins;Gate',
  },
  {
    title: 'Dr. Stone',
    japaneseTitle: 'ドクターストーン',
    characterOrTheme: 'Senku Ishigami',
    connectionToDev: {
      fr: 'Reconstruire des technologies complexes à partir des premiers principes élémentaires : de la physique du silicium jusqu’à l’architecture logicielle moderne.',
      en: 'Building complex civilization systems from raw first principles: from raw silicon physics up to reactive distributed software architectures.',
    },
    quote: 'Ten billion percent! There is nothing you cannot solve with science and relentless logic.',
    quoteAuthor: 'Senku Ishigami',
  },
  {
    title: 'Hunter x Hunter',
    japaneseTitle: 'ハンター×ハンター',
    characterOrTheme: 'Nen System & Strategic Foresight',
    connectionToDev: {
      fr: 'Chaque fonction a un coût et des conditions précises. Comme le système de Nen, une bonne architecture logicielle repose sur des règles strictes et de la stratégie.',
      en: 'Every function has trade-offs and strict invariants. Like the Nen system, solid software architecture thrives on strict constraints and disciplined strategy.',
    },
    quote: 'You should enjoy the little detours to the fullest. Because that’s where you’ll find the things more important than what you want.',
    quoteAuthor: 'Ging Freecss',
  },
  {
    title: 'Fullmetal Alchemist: Brotherhood',
    japaneseTitle: '鋼の錬金術師',
    characterOrTheme: 'Equivalent Exchange',
    connectionToDev: {
      fr: 'Le principe de l’Échange Équivalent en code : pour obtenir de la performance, il faut de la rigueur algorithmique. Zéro gaspillage, zéro dette technique inutile.',
      en: 'The Law of Equivalent Exchange applied to engineering: clean performance requires algorithmic discipline. Zero bloat, zero unnecessary technical debt.',
    },
    quote: 'Humankind cannot gain anything without first giving something in return.',
    quoteAuthor: 'Edward Elric',
  },
];

export const RUBIKS_CFOP_STAGES = [
  {
    step: 'Cross',
    name: { fr: 'La Croix Blanche', en: 'White Cross' },
    description: {
      fr: 'Résolution des 4 arêtes de la face inférieure en alignant les couleurs des centres. C’est la fondation architecturale du cube (analogue au schéma de base de données).',
      en: 'Solving the 4 edge pieces on the bottom layer matching center colors. The foundational architectural groundwork (analogous to the database schema).',
    },
    movesCount: '~6-8 moves',
  },
  {
    step: 'F2L',
    name: { fr: 'First Two Layers (4 paires coin-arête)', en: 'First Two Layers (4 slots)' },
    description: {
      fr: 'Résolution simultanée des coins et arêtes des deux premières couches. Exige de la vision spatiale et de la reconnaissance de patterns (analogue aux composants React et API REST).',
      en: 'Simultaneously pairing corners and edges into 4 slots. Requires spatial intuition and pattern matching (analogous to React modular components and REST endpoints).',
    },
    movesCount: '41 standard algorithms',
  },
  {
    step: 'OLL',
    name: { fr: 'Orientation of the Last Layer', en: 'Orientation of the Last Layer' },
    description: {
      fr: 'Orienter toutes les pièces de la dernière face pour obtenir une face supérieure monochrome jaune en un seul algorithme.',
      en: 'Orienting all top-layer stickers so the yellow top face is uniform in a single algorithmic execution.',
    },
    movesCount: '57 cases (2-look beginner)',
  },
  {
    step: 'PLL',
    name: { fr: 'Permutation of the Last Layer', en: 'Permutation of the Last Layer' },
    description: {
      fr: 'Permuter les pièces restantes sans défaire leur orientation pour terminer la résolution. Précision chirurgicale et vitesse d’exécution.',
      en: 'Permuting remaining corners and edges to complete the solved cube state. Surgical precision and high TPS (turns per second).',
    },
    movesCount: '21 algorithms (T-perm, Y-perm...)',
  },
];
