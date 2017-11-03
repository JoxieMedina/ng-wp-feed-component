import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { ApiProvider } from './wp-feed.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'wp-feed',
  templateUrl: 'wp-feed.component.html',
  styleUrls: ['./wp-feed.component.css'],
  providers: [ApiProvider]
})


export class WpFeedComponent implements OnInit {
  @Input() pageNumber: number = 1;
  maxPageNumber: number;
  wpPosts: Array<any>;
  loading: boolean;
  @Input() wpEndpoint;
  @Output() feedLoadStatus = new EventEmitter();
  @Output() postStatus = new EventEmitter();
  constructor(private apiProvider: ApiProvider, public sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.loadFeed(true);
  }

  private loadFeed(cache: boolean = false, loadMore: boolean = false) {
    this.loading = true;
    this.apiProvider
      .load(`${this.wpEndpoint}get_recent_posts/?count=10&order_by=date&page=${this.pageNumber}`, cache)
      .subscribe(data => {
        loadMore ? this.wpPosts = [...this.wpPosts, ...data[0].posts] :
          this.wpPosts = data[0].posts;
        this.maxPageNumber = data[0].pages;
        this.feedLoadStatus.emit('LOADED');
        this.loading = false;
      }, err => {
        console.log(err)
        this.feedLoadStatus.emit('ERROR');
      })
  }

  onListChange(event) {
    console.log('change: ', event)
  }

  sanitizeContent(content) {
    return this
      .sanitizer
      .bypassSecurityTrustHtml(content)
  }

  fetchMore() {
    (this.loading && this.pageNumber >= this.maxPageNumber) ? null
      : (this.pageNumber++ , this.loadFeed(false, true))
  }

  viewPost(_post) {
    _post.added ? _post.added = !_post.added : _post.added = true;
    this.postStatus.emit(_post);
  }
  togglePost(_post) {
    _post.showContent ? _post.showContent = !_post.showContent : _post.showContent = true;
  }


}
