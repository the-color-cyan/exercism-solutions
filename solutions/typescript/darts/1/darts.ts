const scoringRings = [
  { radius: 1, score: 10 },
  { radius: 5, score: 5 },
  { radius: 10, score: 1 },
];
export function score(x: number, y: number): number {
  const distance = Math.hypot(x, y);

  return scoringRings.find((ring) => distance <= ring.radius)?.score ?? 0;
}
