/**
* @Author: admin
* @Date:   2017-05-11T09:30:55+02:00
* @Last modified by:   admin
* @Last modified time: 2017-05-11T11:00:50+02:00
*/



import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviourModel } from './behaviourModel';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BehaviourService {

  url = "https://boiling-cliffs-15389.herokuapp.com"

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
