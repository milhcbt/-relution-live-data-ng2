import {Component, View, NgFor, NgIf} from 'angular2/angular2';
import {TodosList} from '../../services/TodosList';

@Component({
  selector: 'component-1',
  appInjector: [TodosList]
})
@View({
  template: `
  <ul class="list">
    <li class="item item-toggle item-light " [class.completed]="todo.completed !== false" *ng-for="#todo of todos">
      {{todo.title}}
      <label class="toggle toggle-balanced " (click)="setCompleted(todo._id)">
         <input type="checkbox" [checked]="todo.completed !== false">
         <div class="track">
           <div class="handle"></div>
         </div>
      </label>
    </li>
  </ul>
  `,
  directives: [NgFor, NgIf]
})
export class Todo {
  list:TodosList;
  todos:Array<Object> = [];

  constructor(list:TodosList) {
    this.list = list;
    this.getList();
  }
  getList(){
    let self = this;
    let promise = new Promise(resolve => {
      resolve(this.list.fetch());
    });
    promise.then(function (models) {
      self.todos = models;
      //debugger;
    });
  }
  filterById(obj){
    if ('_id' in obj && obj._id === this[0]) {
      return true;
    } else {
      return false;
    }
  }
  setCompleted(id) {
    let model = this.todos.find(this.filterById, [id]);
    model.completed = !model.completed;
    let promise = new Promise(resolve => {
      resolve(this.list.save(id, model));
    });
    promise.then(function (model) {
      //debugger;
      //self.getList();
    }).catch(function (e) {
      //debugger;
    });
  }
}
