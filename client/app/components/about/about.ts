import {Component, View, NgFor} from 'angular2/angular2';


@Component({
  selector: 'component-2',
})
@View({
  template: `
  <p>
    For reward, here is a list of awesome computer scientists!
  </p>

  <p>
    You want more? Add them yourself!
  </p>
  <p>
    <input #newname>
    <button (click)="addName(newname)">Add</button>
  </p>

  `,
  directives: [NgFor]
})
export class About {
  names:Array<string>;

  constructor() {
  }
}
