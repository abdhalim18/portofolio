// Sprite pixel orisinal untuk tema platformer 8-bit. Bukan karakter dari game mana pun.

export const CLOUD = {
  map: [
    '.......kkkk.........',
    '.....kkwwwwkk.......',
    '....kwwwwwwwwk.kkk..',
    '..kkwwwwwwwwwwkwwwk.',
    '.kwwwwwwwwwwwwwwwwwk',
    'kwwwwwwwwwwwwwwwwwwk',
    'kwwwwwwwwwwwwwwwwbbk',
    '.kbbwwwwwwwwwwbbbbk.',
    '..kkbbbbbbbbbbbbkk..',
    '....kkkkkkkkkkkk....',
  ],
  palette: { k: '#1a1a3a', w: '#fcfcfc', b: '#bcd8fc' },
} as const;

export const HILL = {
  map: [
    '...........kkkkkk...........',
    '.........kkggggggkk.........',
    '........kggggggggggk........',
    '.......kggggkggggkggk.......',
    '......kgggggkggggkgggk......',
    '.....kgggggggggggggggggk....',
    '....kggggggggggggggggggggk..',
    '...kggggggggggggggggggggggk.',
    '..kgggggggggggggggggggggggk.',
    '.kgggggggggggggggggggggggggk',
    'kggggggggggggggggggggggggggk',
  ],
  palette: { k: '#004400', g: '#00a844' },
} as const;

export const COIN = {
  map: [
    '..kkkk..',
    '.kyyyyk.',
    'kyyoyyyk',
    'kyyoyyyk',
    'kyyoyyyk',
    'kyyoyyyk',
    '.kyyyyk.',
    '..kkkk..',
  ],
  palette: { k: '#000000', y: '#fcb800', o: '#fcf0a0' },
} as const;

/** Karakter pemain: developer berhoodie hijau toska dengan laptop. */
export const PLAYER = {
  map: [
    '....hhhhh...',
    '...hhhhhhh..',
    '...hhssshh..',
    '..hsesssess.',
    '...ssssssss.',
    '....ssmsss..',
    '...tttttt...',
    '..ttttttttt.',
    '.tttgggggtt.',
    '.ssttggggtss',
    '...pppppp...',
    '...pp..pp...',
    '..bbb..bbb..',
  ],
  palette: {
    h: '#3c1c00',
    s: '#fcbc8c',
    e: '#000000',
    m: '#c84c0c',
    t: '#00a8a8',
    g: '#bcbcbc',
    p: '#24188c',
    b: '#000000',
  },
} as const;
