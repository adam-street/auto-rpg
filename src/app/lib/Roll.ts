export class Roll {
  public static d6() {
    return this.roll(DICE.SIX);
  }

  public static d8() {
    return this.roll(DICE.EIGHT);
  }

  public static d20() {
    return this.roll(DICE.TWENTY);
  }

  private static roll(dice: DICE) {
    return Math.round(
      (Math.random() * dice - 1) + 1
    )
  }
}

enum DICE {
  SIX = 6,
  EIGHT = 8,
  TWENTY = 20
}

