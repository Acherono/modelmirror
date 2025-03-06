export const randomHexColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
};

/**
 * Generates a seeded random number between min and max
 */
export const seededRandom = (seed: number, min = 0, max = 1): number => {
  const seedValue = Math.sin(seed) * 10000;
  return min + (((seedValue - Math.floor(seedValue)) + 1) % 1) * (max - min);
};

/**
 * Color palettes for gradients
 */
export const colorPalettes = [
  // Purple to Orange
  ['#6b46c1', '#f97316'],
  // Blue to Red
  ['#3b82f6', '#ef4444'],
  // Green to Yellow
  ['#10b981', '#fbbf24'],
  // Indigo to Pink
  ['#6366f1', '#ec4899'],
  // Cyan to Lime
  ['#06b6d4', '#a3e635'],
  // Purple to Pink
  ['#8b5cf6', '#ec4899'],
  // Teal to Lime
  ['#14b8a6', '#a3e635'],
  // Rose to Indigo
  ['#f43f5e', '#6366f1'],
];

/**
 * Generates a gradient CSS style based on an index seed
 */
export const generateGradient = (index: number): string => {
  const paletteIndex = index % colorPalettes.length;
  const [startColor, endColor] = colorPalettes[paletteIndex];
  const angle = Math.floor(seededRandom(index * 7, 90, 270));
  
  return `linear-gradient(${angle}deg, ${startColor} 0%, ${endColor} 100%)`;
};

/**
 * Pre-defined gradients for static usage
 */
export const predefinedGradients = [
  'linear-gradient(135deg, #6b46c1 0%, #f97316 100%)',
  'linear-gradient(135deg, #3b82f6 0%, #ef4444 100%)',
  'linear-gradient(135deg, #10b981 0%, #fbbf24 100%)',
  'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
  'linear-gradient(135deg, #06b6d4 0%, #a3e635 100%)',
];

/**
 * Get a gradient class based on index
 */
export const getGradientClass = (index: number): string => {
  const classes = [
    'gradient-purple-orange',
    'gradient-blue-red',
    'gradient-green-yellow',
    'gradient-indigo-pink',
    'gradient-cyan-lime',
  ];
  
  return classes[index % classes.length];
};
