const ORDINAL_SUFFIXES = ["th", "st", "nd", "rd"] as const;

export function format(name: string, number: number): string {
  return `${name}, you are the ${formatOrdinal(number)} customer we serve today. Thank you!`;
}

function formatOrdinal(number: number): string {
  return `${number.toString() + getOrdinal(number)}`;
}

function getOrdinal(num: number): (typeof ORDINAL_SUFFIXES)[number] {
  const lastTwo = num % 100;
  let suffix: (typeof ORDINAL_SUFFIXES)[number] = ORDINAL_SUFFIXES[0];
  if (lastTwo < 11 || lastTwo > 13) {
    const last = num % 10;
    if (last >= 1 && last <= 3) {
      suffix = ORDINAL_SUFFIXES[last];
    }
  }

  return suffix;
}
