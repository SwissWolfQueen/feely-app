import { Component, Input } from '@angular/core';

/**
 * Generated class for the Behaviour component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'behaviour',
  templateUrl: 'behaviour.html'
})
export class Behaviour {

@Input() mood: string;
@Input() reason: string;
@Input() note: string;

  text: string;

  constructor() {
    console.log('Hello Behaviour Component');
    this.text = 'Hello World';
  }

}
