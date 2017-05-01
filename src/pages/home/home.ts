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
  userStateData = {
            mood: "",
            reason: "",
            placeName: "",
            };
  isVisible:boolean  = true;
  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage) {

  }

  findImgIdForMoodAndReason(mood, reason) {
    if (mood == 'happy' && reason == 'loveLife') {
        return 'inLove'
    }
    if (mood == 'unhappy' && reason == 'loveLife') {
        return 'sad'
    }
    if (mood == 'happy' && reason == 'socialLife') {
        return 'excited'
    }
    if (mood == 'unhappy' && reason == 'socialLife') {
        return 'depressed'
    }
    if (mood == 'happy' && reason == 'health') {
        return 'happy'
    }
    if (mood == 'unhappy' && reason == 'health') {
        return 'sick'
    }
    if (mood == 'happy' && reason == 'weather') {
        return 'joyfull'
    }
    if (mood == 'unhappy' && reason == 'weather') {
        return 'pissed'
    }
    if (mood == 'happy' && reason == 'freeTime') {
        return 'excited'
    }
    if (mood == 'unhappy' && reason == 'freeTime') {
        return 'annoyed'
    }
    if (mood == 'happy' && reason == 'place') {
        return 'happy'
    }
    if (mood == 'unhappy' && reason == 'place') {
        return 'unhappy'
    }
}

checkMood(mood) {
  console.log(mood);
  this.userStateData.mood = mood
  this.isVisible = false
}

checkReason(reason) {
  console.log(reason);
  this.userStateData.reason = reason
  this.isVisible = true
  console.log(this.userStateData);
  this.storeDataAndDisplayFeely();
}

storeDataAndDisplayFeely(){
  let imgId = this.findImgIdForMoodAndReason(this.userStateData.mood, this.userStateData.reason);
  this.displayFeely(imgId);
  localStorage.setItem('feely-app', JSON.stringify(this.userStateData))
  console.log(JSON.parse(localStorage.getItem('feely-app')))
}

displayFeely(id){
  this.imageUrl = `../assets/img/${id}.png`
}

  // changeImage(mood) {
  //   console.log(mood);
  //   if (mood === 'happy'){
  //     this.imageUrl = '../assets/img/happy.png'
  //   }
  //   if (mood === 'unhappy'){
  //     this.imageUrl = '../assets/img/unhappy.png'
  //   }
  // }
}
