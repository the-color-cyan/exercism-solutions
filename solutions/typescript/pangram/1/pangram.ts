export function isPangram(sentence: string): boolean {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const lower = sentence.toLowerCase();

  return alphabet.split("").every((letter) => lower.includes(letter));
}
