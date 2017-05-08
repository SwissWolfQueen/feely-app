/**
* @Author: admin
* @Date:   2017-05-08T09:23:16+02:00
* @Last modified by:   admin
* @Last modified time: 2017-05-08T12:38:21+02:00
*/



import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Behaviour } from '../components/behaviour/behaviour';
import { XtremeBehaviour } from '../components/xtreme-behaviour/xtreme-behaviour';
import { FeelyIcon } from '../components/feely-icon/feely-icon';

import { NativeStorage } from '@ionic-native/native-storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Behaviour,
    XtremeBehaviour,
    FeelyIcon
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Behaviour,
    XtremeBehaviour,
    FeelyIcon
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
