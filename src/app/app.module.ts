import { BrowserModule    } from '@angular/platform-browser';
import { NgModule         } from '@angular/core';

import { CoreModule          } from './core/core.module';
import { ComponentDemoModule } from './features/component-demo.module';
import { AppComponent        } from './app.component';
import { DynamicItemDirective } from './directives/dynamic-item.directive';

@NgModule({
  declarations: [
    AppComponent,
    DynamicItemDirective
  ],
  imports: [
    BrowserModule,
    CoreModule,
    ComponentDemoModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
