import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from '../../examples/angular-pwa/src/environments/environment.packaged';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


if (environment.production){
  enableProdMode(); //
}

//platformBrowserDynamic().bootstrapModule(AppModule)
//  .catch(err => console.error(err));
