import {ICombatLongEntry} from "./ICombatLongEntry";
import {Character} from "../lib/Character";

export interface IGameResult {
  winner: Character,
  combatLog: Array<ICombatLongEntry>
}
