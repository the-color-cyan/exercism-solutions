const SECONDS_IN_EARTH_YEAR: number = 31_557_600;

const PLANETARY_ORBITAL_PERIODS: Record<string, number> = {
  mercury: 0.2408467,
  venus: 0.61519726,
  earth: 1.0,
  mars: 1.8808158,
  jupiter: 11.862615,
  saturn: 29.447498,
  uranus: 84.016846,
  neptune: 164.79132,
};

type Planet = keyof typeof PLANETARY_ORBITAL_PERIODS;

export function age(planet: Planet, seconds: number): number {
  const orbitalPeriod = PLANETARY_ORBITAL_PERIODS[planet.toLowerCase()];
  const age = seconds / (SECONDS_IN_EARTH_YEAR * orbitalPeriod);

  return Math.round(age * 100) / 100;
}
