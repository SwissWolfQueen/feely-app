/**
* @Author: admin
* @Date:   2017-05-03T03:55:16+02:00
* @Last modified by:   admin
* @Last modified time: 2017-05-08T12:39:08+02:00
*/



import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
// import { Behaviour } from '../components/behaviour/behaviour';
// import { XtremeBehaviour } from '../components/xtreme-behaviour/xtreme-behaviour';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  title = 'Play with the Feely';
  imageUrl = '../assets/img/neutral.svg';
  behaviourTab: any[]=[];
  placeName: any = '';
  humeurBase: number = 0;
  userStateData = {
            mood: "",
            reason: "",
            placeName: ""
            };
  bestOrWorstReason = {
            place: 0,
            loveLife: 0,
            socialLife: 0,
            weather: 0,
            health: 0,
            hobbies: 0
          };
  dataCount = 0;
  xtremReason = {
      minReason: "",
      minReasonValue: 0,
      maxReason: "",
      maxReasonValue: 0
  };
  isVisible:boolean = true;
  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage) {
    this.readCalcAndDisplayBaseMood();
    this.displayLastFiveBehaviour();
    this.displayBestAndWorstReasonPerWeek();
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
  this.displayLastFiveBehaviour();
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

findMoodNumber(mood) {
    if (mood == 'happy') {
        return 1
    }
    if (mood == 'unhappy') {
        return -1
    }
}

readCalcAndDisplayBaseMood() {
  let tab = this.readLastTwentyMood()
  //console.log(tab.length);
  this.humeurBase = 0
  for (let i = 0; i < tab.length; i++) {
    //console.log('toto');
    this.humeurBase += this.findMoodNumber(tab[i].mood)
    //console.log(this.findMoodNumber(tab[i].mood));
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

readLastFiveBehaviour() {
  let datas = JSON.parse(localStorage.getItem('feely-app'));

  if (datas){
      return datas.reverse()
                  .slice(0, 5);
  }
  else {
    return [];
  }
}

displayLastFiveBehaviour() {
  this.behaviourTab = this.readLastFiveBehaviour()

  };

displayBestAndWorstReasonPerWeek() {
  let oneWeekMilliSec = (7 * 24 * 3600 * 1000)
  let oneWeekAgo = (Date.now() - oneWeekMilliSec)
  let tab = JSON.parse(localStorage.getItem('feely-app'));
      for (let i = 0; i < tab.length; i++) {
            this.dataCount += 1;
            let comportement = tab[i]
            if (comportement.date > oneWeekAgo) {
                let change = this.findMoodNumber(comportement.mood);
                this.bestOrWorstReason[comportement.reason] += change;
            } else {
                return;
            }
      }
    console.log(this.bestOrWorstReason);

    for (let key in this.bestOrWorstReason) {
        if (this.bestOrWorstReason.hasOwnProperty(key)) {
            let stat = this.bestOrWorstReason[key]

            if (!stat) {
                continue
            }
            //console.log("ITERATION:", stat, key, this.xtremReason);
            if (stat < this.xtremReason.minReasonValue) {
                this.xtremReason.minReason = key
                this.xtremReason.minReasonValue = stat
            }

            if (stat > this.xtremReason.maxReasonValue) {
                this.xtremReason.maxReason = key
                this.xtremReason.maxReasonValue = stat
            }
        }


        //this.displayXtremeBehaviour();

    }
    console.log(this.xtremReason);
}

}
