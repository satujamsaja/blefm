import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { BleFmPage } from './../pages';

@IonicPage()
@Component({
  selector: 'page-ble-list-page',
  templateUrl: 'ble-list-page.html',
})
export class BleListPage {
  
  bles: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, private ble: BLE) {
  }

  scanBle() {
    this.bles = [];
    let loading = this.loadingCtrl.create({
      content: "Scanning...",

    });

    loading.present();
    this.ble.startScan([]).subscribe(ble => {
      if (ble) {
        this.bles.push(ble);
        loading.dismiss();
        this.ble.stopScan();
      }
    });
  }

  connectBle(ble) {
    this.navCtrl.push(BleFmPage, { ble: ble});
  }

  ionViewDidLoad() {
  }

}
