import { Component, Input } from '@angular/core';

/**
 * Generated class for the FeelyIcon component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'feely-icon',
  templateUrl: 'feely-icon.html'
})
export class FeelyIcon {

  @Input() identity: string;
  @Input() size: string; //normal, small
  @Input() off: boolean;



  buildFileName(){
    let fileName = "";
    fileName += this.identity;
    fileName += "Icon";
    if (this.size=="small"){
      fileName += "Small"
    }
    if (this.off==true){
      fileName += "Off"
    }
    return fileName;
  }

}
