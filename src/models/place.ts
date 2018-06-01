import { Location } from "./locations";

export class Place {
  constructor(public title: string,
              public desciption: string,
              public location: Location,
              public imagePath: string) {

  }
}