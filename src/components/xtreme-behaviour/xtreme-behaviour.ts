import { Component, Input } from '@angular/core';

/**
 * Generated class for the XtremeBehaviour component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'xtreme-behaviour',
  templateUrl: 'xtreme-behaviour.html'
})
export class XtremeBehaviour {

  @Input() xtremereason: Object;
  text: string;

  constructor() {
    console.log('Hello XtremeBehaviour Component');
    this.text = 'Hello World';
  }

}
