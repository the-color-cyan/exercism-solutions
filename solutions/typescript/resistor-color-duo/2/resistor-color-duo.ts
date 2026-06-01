export function decodedValue([first, second]: [
  Color,
  Color,
  ...Color[],
]): number {
  return 10 * colorCode(first) + colorCode(second);
}

export const colorCode = (color: Color): number => COLORS.indexOf(color);

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
