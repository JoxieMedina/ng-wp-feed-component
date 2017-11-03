import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiProvider } from './wp-feed.service';


@Component({
  selector: 'wp-feed',
  templateUrl: 'wp-feed.component.html',
  providers: [ApiProvider]
})


export class WpFeedComponent implements OnInit {
  pageNumber: Number;
  wpPosts: Array<any>;
  @Input() wpEndpoint;
  @Output() feedLoadStatus = new EventEmitter();
  constructor(private apiProvider: ApiProvider) {
    this.pageNumber = 0;
  }

  ngOnInit() {
    this.loadFeed(true);
  }




  private loadFeed(cache: boolean = false) {
    this.apiProvider
      .load(`${this.wpEndpoint}get_recent_posts/?count=10&order_by=date&page=${this.pageNumber}`, cache)
      .subscribe(data => {
        this.wpPosts = data[0].posts;
        this.feedLoadStatus.emit('LOADED');
        console.log('Posts: ', this.wpPosts)
      }, err => {
        console.log(err)
        this.feedLoadStatus.emit('ERROR');
      })
  }


  viewPost(_post) {
    console.log(_post);
  }



}
