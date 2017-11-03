import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  onFeedLoad(e) {
    console.log(e)
  }

  onPostStatus(post) {
    console.log('Post ID: ', post.id)
    console.log('Post Status: ', post.added)
  }

}
