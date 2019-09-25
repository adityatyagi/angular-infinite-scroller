import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollService } from './services/scroll.service';
import { HttpClientModule } from '@angular/common/http';
import { HackerNewsService } from './services/hacker-news.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [ScrollService, HackerNewsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
