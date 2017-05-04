/**
* @Author: admin
* @Date:   2017-05-03T03:55:16+02:00
* @Last modified by:   admin
* @Last modified time: 2017-05-04T13:16:13+02:00
*/



import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  title = 'Play with the Feely';
  imageUrl = '../assets/img/neutral.svg';
  placeName: any = '';
  humeurBase: number = 0;
  userStateData = {
            mood: "",
            reason: "",
            placeName: ""
            };
  isVisible:boolean = true;
  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage) {
    this.readCalcAndDisplayBaseMood();
  }

  findMoodNumber(mood) {
    if (mood == 'happy') {
        return 1
    }
    if (mood == 'unhappy') {
        return -1
    }
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

// step one
checkMood(mood) {
  console.log(mood);
  this.userStateData.mood = mood
  this.isVisible = false
}

// step two
checkReason(reason) {
  console.log(reason);
  this.userStateData.reason = reason
  this.isVisible = true
  //console.log(this.userStateData);
  this.userStateData.placeName = this.placeName;
  this.clearPlaceName();
  this.storeDataAndDisplayFeely();
}

// store data in object
storeUserStateData(userStateData) {
      console.log(userStateData)
    let objetBase = {
        "mood": userStateData.mood,
        "reason": userStateData.reason,
        "placeName": userStateData.placeName,
        date: Date.now()
    }
    if (userStateData.placeName.length > 0) {
        objetBase.placeName = userStateData.placeName
    }

    // Est-ce qu'il y a un truc dans le localStorage?

    //Je récupère le localStorage
    let datas = JSON.parse(localStorage.getItem('feely-app'));

    // Si y a qqch dedans on y rajoute (datas.push) et on store en stringifiant
    if (datas){
        datas.push(objetBase);
        localStorage.setItem('feely-app', JSON.stringify(datas))
    }
    //Sinon on crée un tableau vide pour pouvoir storer les datas dedans
    else {
        datas = [];
        datas.push(objetBase);
        localStorage.setItem('feely-app', JSON.stringify(datas))
    }
    console.log(JSON.parse(localStorage.getItem('feely-app')));
}

    readLastTwentyMood() {
      let datas = JSON.parse(localStorage.getItem('feely-app'));

      if (datas){
          return datas.reverse()
                      .slice(0, 21);
      }
      else {
        return [];
      }
    }

    readLastFive() {
      let datas = JSON.parse(localStorage.getItem('feely-app'));

      if (datas){
          return datas.reverse()
                      .slice(0, 6);
      }
      else {
        return [];
      }
    }

    

    readCalcAndDisplayBaseMood() {
      let tab = this.readLastTwentyMood()
      console.log(tab.length);
      this.humeurBase = 0
      for (let i = 0; i < tab.length; i++) {
        console.log('toto');
        this.humeurBase += this.findMoodNumber(tab[i].mood)
        console.log(this.findMoodNumber(tab[i].mood));
      }
      if (this.humeurBase === 0) {
          this.displayFeely('neutral');
      }
      if (this.humeurBase >= 1) {
          this.displayFeely('happy');
      }
      if (this.humeurBase <= -1) {
          this.displayFeely('unhappy');
      }
    }

clearPlaceName(){
  this.placeName = '';
}

// store&display feely
storeDataAndDisplayFeely(){
  let imgId = this.findImgIdForMoodAndReason(this.userStateData.mood, this.userStateData.reason);
  this.storeUserStateData(this.userStateData);
  this.displayFeely(imgId);
}

displayFeely(id){
  this.imageUrl = `../assets/img/${id}.svg`
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
