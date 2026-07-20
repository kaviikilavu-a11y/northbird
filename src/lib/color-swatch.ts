const COLOR_SWATCH: Record<string, string> = {
  black: "#1a1a1a", white: "#f5f5f5", red: "#c0392b", blue: "#2c5f8a", silver: "#c9cdd1",
  gold: "#d4af37", pink: "#e39fb3", yellow: "#e8c547", mint: "#a8d5c0", grey: "#9aa0a3",
  gray: "#9aa0a3", green: "#4a7a5c", orange: "#d97b2b", brown: "#6b4a34", beige: "#d9c9a8",
  "light green": "#a8c98a",
};

export function swatchColor(name: string): string {
  const key = name.toLowerCase().split("/")[0].trim();
  return COLOR_SWATCH[key] ?? "#b8b8b8";
}
