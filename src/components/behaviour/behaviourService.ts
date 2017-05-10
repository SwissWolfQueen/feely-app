import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviourModel } from './behaviourModel';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BehaviourService {

  url = "http://localhost:8000"

  constructor(private http: Http) {
  }

  add(behaviour: BehaviourModel) {
      return this.http
        .post(this.url + "/add", behaviour)
        .toPromise()
  }

  getAll() {
    return this.http
			.get(this.url + "/list")
			.toPromise()
  }
}
