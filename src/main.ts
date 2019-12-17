import { enableProdMode, CompilerOptions, Injector, Type } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Foo } from './app/decoratorTest';
import 'reflect-metadata';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic([{ provide: "Foo", useClass: Foo, deps: [] }])
  .bootstrapModule(AppModule).catch(err => console.log(err));

