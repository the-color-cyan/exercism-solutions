export function decodedValue(colors: Array<Color>): number {
  let color_code_0 = colorCode(colors[0]);
  let color_code_1 = colorCode(colors[1]);
  let color_duo = 10 * color_code_0 + color_code_1;
  return color_duo;
}

export const colorCode = (color: Color) => {
  return COLORS.indexOf(color);
};

export const COLORS = [
  "black",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
  "white",
] as const;

type Color = (typeof COLORS)[number];
