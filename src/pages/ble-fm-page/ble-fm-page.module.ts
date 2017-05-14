import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BleFmPage } from './ble-fm-page';

@NgModule({
  declarations: [
    BleFmPage,
  ],
  imports: [
    IonicPageModule.forChild(BleFmPage),
  ],
  exports: [
    BleFmPage
  ]
})
export class BleFmPageModule {}
