import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BLE } from '@ionic-native/ble';

import { MyApp } from './app.component';
import { BleListPage } from '../pages/pages';
import { BleFmPage } from '../pages/pages';

@NgModule({
  declarations: [
    MyApp,
    BleListPage,
    BleFmPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BleListPage,
    BleFmPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BLE,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
