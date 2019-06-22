import { NgModule } from '@angular/core'
import { NgxWaterfallComponent } from './ngx-waterfall.component'
import { NgxWaterfallItemDirective } from './ngx-waterfall-item.directive'

@NgModule({
  declarations: [NgxWaterfallComponent, NgxWaterfallItemDirective],
  imports: [],
  exports: [NgxWaterfallComponent, NgxWaterfallItemDirective]
})
export class NgxWaterfallModule {}
