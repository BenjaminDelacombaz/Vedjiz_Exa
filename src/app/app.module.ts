import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { DataProvider } from '../providers/data/data'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SyncroPage } from '../pages/syncro/syncro';
import { ProductPage } from '../pages/product/product';
import { SupplierPage } from '../pages/supplier/supplier'
import { SettingsPage } from '../pages/settings/settings';
import { OrderPage } from '../pages/order/order'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SyncroPage,
    ProductPage,
    SupplierPage,
    SettingsPage,
    OrderPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SyncroPage,
    ProductPage,
    SupplierPage,
    SettingsPage,
    OrderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
