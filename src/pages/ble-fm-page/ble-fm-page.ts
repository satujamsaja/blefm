import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

@IonicPage()
@Component({
  selector: 'page-ble-fm-page',
  templateUrl: 'ble-fm-page.html',
})
export class BleFmPage {

  ble: any;
  connectionStatus: string = 'Not connected';
  blerxData: string;
  section: string = 'status';
  showStatus: boolean = true;
  showClock: boolean;
  showRadio: boolean;
  freq: string;
  vol: string;
  broadcast: string;

  hm10 = {
    serviceUUID: '0000ffe0-0000-1000-8000-00805f9b34fb',
    txCharacteristic: '0000ffe1-0000-1000-8000-00805f9b34fb',
    rxCharacteristic: '0000ffe1-0000-1000-8000-00805f9b34fb'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private ngZone: NgZone, private BLE: BLE) {
    this.ble = this.navParams.get('ble');
  }

  ionViewDidLoad() {
    this.BLE.connect(this.ble.id).subscribe(bleinfo => {
      this.connectionStatus = 'Connected';
      this.ngZone.run(() => {
        this.BLE.startNotification(this.ble.id, this.hm10.serviceUUID, this.hm10.rxCharacteristic).subscribe(notificationData => {
          this.blerxData = this.bytesToString(notificationData);
          let bleData = this.blerxData.split('/');
          this.freq = bleData[0];
          this.broadcast = (bleData[1] == '0') ? 'Mono' : 'Stereo';
          this.vol = bleData[2];
        });
      });
    })
  }

  // Disconnect from selected bluetooth.
  disconnect() {
    this.BLE.stopNotification(this.ble.id, this.hm10.serviceUUID, this.hm10.rxCharacteristic);
    this.BLE.disconnect(this.ble.id);
    this.navCtrl.pop();
  }

  // Convert array buffer to string.
  bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }

  // Convert string to array buffer.
  stringToBytes(string) {
    let array = new Uint8Array(string.length);
    for (let i = 0, l = string.length; i < l; i++) {
      array[i] = string.charCodeAt(i);
    }
    return array.buffer;
  }

  // Display status
  segmentStatus() {
    this.section = 'status';
    console.log('status');
  }

  // Display radio.
  segmenRadio() {
    this.section = 'radio';
  }

  sendData(cmd) {
    this.BLE.writeWithoutResponse(this.ble.id, this.hm10.serviceUUID, this.hm10.txCharacteristic, this.stringToBytes(cmd));
  }
}
