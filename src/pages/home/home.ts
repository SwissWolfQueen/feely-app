import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  title = 'Play with the Feely';
  imageUrl = '../assets/img/neutral.png';
  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage) {

  }
  changeImage(mood) {
    console.log(mood);
    if (mood === 'happy'){
      this.imageUrl = '../assets/img/happy.png'
    }
    if (mood === 'unhappy'){
      this.imageUrl = '../assets/img/unhappy.png'
    }
  }
}
