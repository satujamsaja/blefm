import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BleListPage } from './ble-list-page';

@NgModule({
  declarations: [
    BleListPage,
  ],
  imports: [
    IonicPageModule.forChild(BleListPage),
  ],
  exports: [
    BleListPage
  ]
})
export class BleListPageModule {}
