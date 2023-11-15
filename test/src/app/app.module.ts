import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  exports: [HeaderComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
