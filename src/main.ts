import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode(); //判断是否要关闭angular的开发者模式
}

platformBrowserDynamic().bootstrapModule(AppModule);
