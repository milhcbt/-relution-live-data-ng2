import {Component, View, NgFor, NgIf} from 'angular2/angular2';
import {CinemaList} from '../../services/CinemaList';

@Component({
  selector: 'component-1',
  appInjector: [CinemaList]
})
@View({
  template: `
  <div class="list card" *ng-for="#movie of movies" [id]="movie.id">
  <div class="item item-avatar">
    <img [src]="movie.posters.thumbnail">
    <h2>{{movie.title}}</h2>
    <p>{{movie.release_dates.theater}} {{movie.year}}</p>
  </div>

  <div class="item item-body">
    <img class="full-image" [src]="movie.posters.profile">
    <p>
      {{movie.synopsis}}
    </p>
    <p>
      <a href="#" class="subdued">1 Like</a>
      <a href="#" class="subdued">5 Comments</a>
    </p>
  </div>

  <div class="item tabs tabs-secondary tabs-icon-left">
    <a class="tab-item" href="#">
      <i class="icon ion-thumbsup"></i>
      Like
    </a>
    <a class="tab-item" href="#">
      <i class="icon ion-chatbox"></i>
      Comment
    </a>
    <a class="tab-item" href="#">
      <i class="icon ion-share"></i>
      Share
    </a>
  </div>
</div>
  `,
  directives: [NgFor, NgIf]
})
export class Todo {
  list:CinemaList;
  movies:Array<Object> = [];
  data: Array<Object>;
  constructor(list:CinemaList) {
    this.list = list;
    this.getList();
  }
  getList(){
    let self = this;
    this.list.fetch().subscribe(function (res) {
      self.data = JSON.parse(res._body);
      self.movies = self.data.movies;
      console.log(self.movies[0]);
    });
  }
}
