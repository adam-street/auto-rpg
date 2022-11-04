import {Roll} from "./Roll";

export class CharacterStats {

  private _strength: number;
  private _stamina: number;
  private _dexterity: number;

  private _health: number;

  constructor(strength: number, stamina: number, dexterity: number) {
    this._strength = strength;
    this._stamina = stamina;
    this._dexterity = dexterity;

    this._health = Roll.d20()  + (stamina * 5);
  }

  get strength(): number {
    return this._strength;
  }

  set strength(value: number) {
    this._strength = value;
  }

  get stamina(): number {
    return this._stamina;
  }

  set stamina(value: number) {
    this._stamina = value;
  }

  get dexterity(): number {
    return this._dexterity;
  }

  set dexterity(value: number) {
    this._dexterity = value;
  }

  get health(): number {
    return this._health;
  }

  set health(value: number) {
    this._health = value;
  }
}
