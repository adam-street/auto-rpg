import {CharacterStats} from "./CharacterStats";
import {Roll} from "./Roll";
import {IAttackProfile} from "../interface/IAttackProfile";
import {IDefenceProfile} from "../interface/IDefenceProfile";

export class Character extends CharacterStats {

  private _name: string;
  private _level: number;

  constructor(level: number, name: string, strength: number, stamina: number, dexterity: number) {
    super(strength, stamina, dexterity);
    this._level = level;
    this._name = name;
  }

  public getAttackProfile(): IAttackProfile {
    const attackProfile: IAttackProfile = {
      damage: Roll.d20() + this.strength,
      stagger: Roll.d20() + this.stamina,
      hit: Roll.d20() + this.dexterity,
    }

    return attackProfile;
  }

  public getDefenceProfile(): IDefenceProfile {
    const defenceProfile: IDefenceProfile = {
      mitigation: Roll.d20() + this.stamina,
      block: Roll.d20() + this.strength,
      dodge: Roll.d20() + this.dexterity,
    }

    return defenceProfile;
  }

  public takeAttack(attackProfile: IAttackProfile): number | string {
    const defenceProfile: IDefenceProfile = this.getDefenceProfile();

    const didDodge: boolean = (defenceProfile.dodge * 0.5) > attackProfile.hit;
    const didBlock: boolean = (defenceProfile.block * 0.5) > attackProfile.stagger;
    if (didDodge) {
      return "dodge";
    }
    if (didBlock) {
      return "block";
    }

    const damageTaken: number = attackProfile.damage - (defenceProfile.mitigation * 0.5);
    if (damageTaken < 0) {
      return "mitigated";
    }

    this.health -= damageTaken;
    return damageTaken;
  }


  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    this._level = value;
  }
}
