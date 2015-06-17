import {Inject} from 'angular2/di';
import {httpInjectables, Http} from 'angular2/http';
import {HttpFactory} from 'angular2/src/http/http';
import { Request } from 'angular2/src/http/static_request';
import { Response } from 'angular2/src/http/static_response';
import {IHttp} from 'angular2/src/http/interfaces';

export class CinemaList {
  API_KEY: string = '7waqfqbprs7pajbz28mqf6vz';
  API_URL: string =  'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
  pageSize: number = 50;
  params: string; //= '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
  requestUrl: string;
  http: any;
  data: Array<Object>;
  constructor(@Inject(HttpFactory) http:Http) {
    this.http = http;
    this.params = `?apikey=${this.API_KEY}&page_limit=${this.pageSize}`;
    this.requestUrl = this.API_URL + this.params;
  }
  fetch() {
    let self = this;
    return this.http(this.requestUrl);
  }
}
