import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { FeedService } from './services/feed.service';

import { AppComponent } from './app.component';
import { FiltersComponent } from './components/filters/filters.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { FeedComponent } from './pages/feed/feed.component';
import { PostComponent } from './pages/post/post.component';
import { Error404Component } from './pages/error404/error404.component';

import { HoverCardDirective } from './directives/hover-card.directive';
@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    PaginationComponent,
    SearchbarComponent,
    FeedComponent,
    HoverCardDirective,
    PostComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [FeedService],
  bootstrap: [AppComponent]
})
export class AppModule { }