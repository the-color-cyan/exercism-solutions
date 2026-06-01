const COLORS = [
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
type ColorPair = readonly [Color, Color];
type ColorTrio = readonly [...ColorPair, Color, ...Color[]];

function colorCode(color: Color): number {
  return COLORS.indexOf(color);
}

function decodedValue([first, second]: ColorPair): number {
  return 10 * colorCode(first) + colorCode(second);
}

function formatOhms(ohms: number): string {
  if (ohms >= 1e9) return `${ohms / 1e9} gigaohms`;
  if (ohms >= 1e6) return `${ohms / 1e6} megaohms`;
  if (ohms >= 1e3) return `${ohms / 1e3} kiloohms`;

  return `${ohms} ohms`;
}

export function decodedResistorValue(trio: ColorTrio): string {
  const [first, second, third] = trio;
  const sigFigs = decodedValue([first, second]);
  const ohms = sigFigs * 10 ** colorCode(third);

  return formatOhms(ohms);
}
