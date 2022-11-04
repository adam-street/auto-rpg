export class Helpers {
  public static numberClamp(num:number, min: number, max: number) {
    return Math.min(Math.max(num, min), max);
  }

  public static clone(obj: Object) {
    return Object.create(
      Object.getPrototypeOf(obj),
      Object.getOwnPropertyDescriptors(obj)
    );
  }

}
