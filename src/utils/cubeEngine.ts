export type FaceName = 'U' | 'D' | 'F' | 'B' | 'L' | 'R';
export type CubeColor = 'white' | 'yellow' | 'green' | 'blue' | 'orange' | 'red';
export type Move = 'U' | "U'" | 'U2' | 'D' | "D'" | 'D2' | 'F' | "F'" | 'F2' | 'B' | "B'" | 'B2' | 'L' | "L'" | 'L2' | 'R' | "R'" | 'R2';

export interface CubeState {
  U: CubeColor[]; // 9 stickers: White
  D: CubeColor[]; // 9 stickers: Yellow
  F: CubeColor[]; // 9 stickers: Green
  B: CubeColor[]; // 9 stickers: Blue
  L: CubeColor[]; // 9 stickers: Orange
  R: CubeColor[]; // 9 stickers: Red
}

export const CUBE_COLORS_HEX: Record<CubeColor, string> = {
  white: '#F8FAFC',
  yellow: '#EAB308',
  green: '#16A34A',
  blue: '#2563EB',
  orange: '#EA580C',
  red: '#DC2626',
};

export const INITIAL_SOLVED_CUBE: CubeState = {
  U: Array(9).fill('white'),
  D: Array(9).fill('yellow'),
  F: Array(9).fill('green'),
  B: Array(9).fill('blue'),
  L: Array(9).fill('orange'),
  R: Array(9).fill('red'),
};

export function createSolvedCube(): CubeState {
  return JSON.parse(JSON.stringify(INITIAL_SOLVED_CUBE));
}

export function isCubeSolved(state: CubeState): boolean {
  const faces: FaceName[] = ['U', 'D', 'F', 'B', 'L', 'R'];
  return faces.every((f) => {
    const centerColor = state[f][4];
    return state[f].every((c) => c === centerColor);
  });
}

function rotateFaceClockwise(face: CubeColor[]): CubeColor[] {
  return [
    face[6], face[3], face[0],
    face[7], face[4], face[1],
    face[8], face[5], face[2],
  ];
}

function rotateFaceCounterClockwise(face: CubeColor[]): CubeColor[] {
  return [
    face[2], face[5], face[8],
    face[1], face[4], face[7],
    face[0], face[3], face[6],
  ];
}

export function applySingleClockwiseMove(state: CubeState, face: FaceName): CubeState {
  const next: CubeState = {
    U: [...state.U],
    D: [...state.D],
    F: [...state.F],
    B: [...state.B],
    L: [...state.L],
    R: [...state.R],
  };

  next[face] = rotateFaceClockwise(state[face]);

  if (face === 'U') {
    const temp = [next.R[0], next.R[1], next.R[2]];
    next.R[0] = next.B[0]; next.R[1] = next.B[1]; next.R[2] = next.B[2];
    next.B[0] = next.L[0]; next.B[1] = next.L[1]; next.B[2] = next.L[2];
    next.L[0] = next.F[0]; next.L[1] = next.F[1]; next.L[2] = next.F[2];
    next.F[0] = temp[0]; next.F[1] = temp[1]; next.F[2] = temp[2];
  } else if (face === 'D') {
    const temp = [next.L[6], next.L[7], next.L[8]];
    next.L[6] = next.B[6]; next.L[7] = next.B[7]; next.L[8] = next.B[8];
    next.B[6] = next.R[6]; next.B[7] = next.R[7]; next.B[8] = next.R[8];
    next.R[6] = next.F[6]; next.R[7] = next.F[7]; next.R[8] = next.F[8];
    next.F[6] = temp[0]; next.F[7] = temp[1]; next.F[8] = temp[2];
  } else if (face === 'F') {
    const temp = [next.U[6], next.U[7], next.U[8]];
    next.U[6] = next.L[8]; next.U[7] = next.L[5]; next.U[8] = next.L[2];
    next.L[2] = next.D[0]; next.L[5] = next.D[1]; next.L[8] = next.D[2];
    next.D[0] = next.R[6]; next.D[1] = next.R[3]; next.D[2] = next.R[0];
    next.R[0] = temp[0]; next.R[3] = temp[1]; next.R[6] = temp[2];
  } else if (face === 'B') {
    const temp = [next.U[0], next.U[1], next.U[2]];
    next.U[0] = next.R[2]; next.U[1] = next.R[5]; next.U[2] = next.R[8];
    next.R[2] = next.D[8]; next.R[5] = next.D[7]; next.R[8] = next.D[6];
    next.D[6] = next.L[0]; next.D[7] = next.L[3]; next.D[8] = next.L[6];
    next.L[0] = temp[2]; next.L[3] = temp[1]; next.L[6] = temp[0];
  } else if (face === 'R') {
    const temp = [next.U[2], next.U[5], next.U[8]];
    next.U[2] = next.F[2]; next.U[5] = next.F[5]; next.U[8] = next.F[8];
    next.F[2] = next.D[2]; next.F[5] = next.D[5]; next.F[8] = next.D[8];
    next.D[2] = next.B[6]; next.D[5] = next.B[3]; next.D[8] = next.B[0];
    next.B[0] = temp[2]; next.B[3] = temp[1]; next.B[6] = temp[0];
  } else if (face === 'L') {
    const temp = [next.U[0], next.U[3], next.U[6]];
    next.U[0] = next.B[8]; next.U[3] = next.B[5]; next.U[6] = next.B[2];
    next.B[2] = next.D[6]; next.B[5] = next.D[3]; next.B[8] = next.D[0];
    next.D[0] = next.F[0]; next.D[3] = next.F[3]; next.D[6] = next.F[6];
    next.F[0] = temp[0]; next.F[3] = temp[1]; next.F[6] = temp[2];
  }

  return next;
}

export function applyMove(state: CubeState, move: Move | string): CubeState {
  const baseFace = move[0] as FaceName;
  if (!['U', 'D', 'F', 'B', 'L', 'R'].includes(baseFace)) return state;

  if (move.endsWith("'")) {
    // 3 clockwise moves = 1 counter-clockwise
    let s = applySingleClockwiseMove(state, baseFace);
    s = applySingleClockwiseMove(s, baseFace);
    return applySingleClockwiseMove(s, baseFace);
  } else if (move.endsWith('2')) {
    let s = applySingleClockwiseMove(state, baseFace);
    return applySingleClockwiseMove(s, baseFace);
  } else {
    return applySingleClockwiseMove(state, baseFace);
  }
}

export function generateWcaScramble(length: number = 20): string {
  const faces: FaceName[] = ['U', 'D', 'F', 'B', 'L', 'R'];
  const modifiers = ['', "'", '2'];
  const moves: string[] = [];
  let lastFace = '';

  for (let i = 0; i < length; i++) {
    let nextFace: FaceName;
    do {
      nextFace = faces[Math.floor(Math.random() * faces.length)];
    } while (nextFace === lastFace);

    lastFace = nextFace;
    const mod = modifiers[Math.floor(Math.random() * modifiers.length)];
    moves.push(`${nextFace}${mod}`);
  }

  return moves.join(' ');
}
