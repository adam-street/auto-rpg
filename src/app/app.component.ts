import {Component} from '@angular/core';
import {Character} from "./lib/Character";
import {HttpService} from "./http.service";
import {first, generate} from "rxjs";
import {Roll} from "./lib/Roll";
import {ICombatLongEntry} from "./interface/ICombatLongEntry";
import {IGameResult} from "./interface/IGameResult";
import {Helpers} from "./lib/Helpers";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'auto-rpg';
  playerOne!: Character;
  playerTwo!: Character;
  gameResult: IGameResult | null = null;

  constructor(private httpService: HttpService) {
    this.generate();
  }

  public async generate() {
    this.playerOne = await this.getRandomCharacter();
    this.playerTwo = await this.getRandomCharacter();
  }

  public play() {
    const playerOne: Character = Helpers.clone(this.playerOne);
    const playerTwo: Character = Helpers.clone(this.playerTwo);
    const combatLog: Array<ICombatLongEntry> = [];

    while (playerOne.health > 0 && playerTwo.health > 0) {
      const playerOneAttackResult = playerTwo.takeAttack(playerOne.getAttackProfile());
      combatLog.push({
        actor: playerOne.name,
        target: playerTwo.name,
        result: playerOneAttackResult
      })

      if (playerTwo.health < 0) {
        combatLog.push({
          actor: playerOne.name,
          target: playerTwo.name,
          result: "killed"
        });
        break;
      }

      const playerTwoAttackResult = playerOne.takeAttack(playerTwo.getAttackProfile());
      combatLog.push({
        actor: playerTwo.name,
        target: playerOne.name,
        result: playerTwoAttackResult
      })

      if (playerOne.health < 0) {
        combatLog.push({
          actor: playerTwo.name,
          target: playerOne.name,
          result: "killed"
        });
        break;
      }
    }

    this.gameResult = {
      winner: playerOne.health > 0 ? playerOne : playerTwo,
      combatLog: combatLog
    }
  }

  public reset() {
    this.gameResult = null;
    this.generate();
  }

  private async getRandomCharacter(): Promise<Character> {
    const name: string = await this.httpService.getName();
    return new Character(
      1,
      name,
      Roll.d6() + 10,
      Roll.d6() + 10,
      Roll.d6() + 10
    );
  }
}
