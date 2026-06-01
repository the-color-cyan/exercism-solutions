import { randomBytes } from "crypto";

class Die {
  public value: number;

  constructor() {
    this.value = (randomBytes(1)[0] % 6) + 1;
  }
}

class Bag extends Array<Die> {
  public size: number;

  constructor(size: number) {
    super();

    this.size = size;
    this.push(...Array.from({ length: size }, () => new Die()));
  }
}

export class DnDCharacter {
  public strength: number;
  public dexterity: number;
  public constitution: number;
  public intelligence: number;
  public wisdom: number;
  public charisma: number;
  public hitpoints: number;

  constructor() {
    this.strength = DnDCharacter.generateAbilityScore();
    this.dexterity = DnDCharacter.generateAbilityScore();
    this.constitution = DnDCharacter.generateAbilityScore();
    this.intelligence = DnDCharacter.generateAbilityScore();
    this.wisdom = DnDCharacter.generateAbilityScore();
    this.charisma = DnDCharacter.generateAbilityScore();
    this.hitpoints = 10 + DnDCharacter.getModifierFor(this.constitution);
  }

  public static generateAbilityScore(): number {
    const bag = new Bag(4);
    return bag
      .sort((a, b) => a.value - b.value)
      .slice(1)
      .reduce((sum, die) => sum + die.value, 0);
  }

  public static getModifierFor(abilityValue: number): number {
    return Math.floor((abilityValue - 10) / 2);
  }
}
