import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScrollService } from './services/scroll.service';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HackerNewsService } from './services/hacker-news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-infinite-scroller';
  private ngUnsubscribe = new Subject();
  itemCount = 25;

  currentPage: number = 1;
  news: Array<any> = [];
  scrollCallback;

  constructor(
    private scrollService: ScrollService,
    private hackerNewsService: HackerNewsService
  ) {
    this.scrollCallback = this.getStories.bind(this);
  }

  // DONOT DELETE THIS COMMENTED CODE
  ngOnInit() {
    // Handle scroll event on containing dialog so we can load more results if necessary
    // this.scrollService.onScrolledDown$
    //   .pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe(() => this.fetchMoreItems());
  }

  // private fetchMoreItems() {
  //   // add more items
  //   this.itemCount += 10;
  // }

  getStories() {
    return this.hackerNewsService.getLatestStories(this.currentPage).pipe(
      tap({
        next: val => {
          this.processData(val);
        }
      })
    );
  }

  private processData = news => {
    this.currentPage++;
    this.news = this.news.concat(news);
  };

  public ngOnDestroy() {
    // Remove event handlers
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
