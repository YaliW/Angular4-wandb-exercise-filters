import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyInfoComponent } from './body-info/body-info.component';
import { AppService } from './app.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyInfoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
