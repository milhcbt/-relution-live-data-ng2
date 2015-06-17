/// <reference path="../typings/tsd.d.ts" />
import {Component, View, bootstrap, NgFor} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {Todo} from './components/todo/todo';
import {About} from './components/about/about';
@Component({
  selector: 'app'
})
@RouteConfig([
  {path: '/', component: Todo, as: 'todo'},
  {path: '/about', component: About, as: 'about'}
])
@View({
  template: `
  <div class="view">
    <div class="bar bar-header">
      <div class="bar bar-header">
        <div class="button-bar">
          <a class="button" router-link="todo">Todo - List</a>
          <a class="button" router-link="about">About</a>
        </div>
      </div>
    </div>
    <div class="content padding has-header">
      <router-outlet></router-outlet>
    </div>
  </div>
  `,
  directives: [RouterOutlet, RouterLink]
})
class App {}
this.bindEvents = function () {
  document.addEventListener('deviceready', function () {
    bootstrap(App, [routerInjectables]);
  }, false);
};
//If cordova is present, wait for it to initialize, otherwise just try to
//bootstrap the application.
if (window.cordova !== undefined) {
  this.bindEvents();
} else {
  console.log('no device');
  bootstrap(App, [routerInjectables]);
}


