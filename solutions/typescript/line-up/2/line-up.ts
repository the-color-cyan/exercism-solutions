export function format(name: string, position: number): string {
  return `${name}, you are the ${formatOrdinal(position)} customer we serve today. Thank you!`;
}

function formatOrdinal(number: number): string {
  return `${number}${getOrdinalSuffix(number)}`;
}

function getOrdinalSuffix(num: number): string {
  const lastTwoDigits = num % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return "th";
  }

  switch (num % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
