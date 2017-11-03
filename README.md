# ng-wp-feed-component
Simple Angular Wordpress Feed Component


# Usage

* Copy the wp-feed.component folder on your components folder
* Import the component in your app.module.ts



## Getting Started

* Clone this repository.
* Run npm install from the project root.
* Install the ng CLI (npm install -g @angular/cli)
* Run ng serve -o in a terminal from the project root.


## Using this component in your projects

* Copy and paste wp-feed component files from <a href='/src/components/'>components folder</a>.
* Import it and declare the 'WpFeedComponent'  component in the app.module.ts file:
```
...
import { WpFeedComponent } from "../components/wp-feed.component/wp-feed.component";

@NgModule({
  declarations: [
   WpFeedComponent
  ],
  imports: [
    ...
  ]
  ...
```
* Now you can use the component like this:
```
<wp-feed (postStatus)="onPostStatus($event)" [pageNumber]="1" (feedLoadStatus)="onFeedLoad($event)" [wpEndpoint]="'URL_WORDPRESS_SITE'"></wp-feed>


```
## Component Options
* [pageNumber] : The page number that begins the feed
* (postStatus): Event emmiter that emits the post when is selected
* (feedLoadStatus): When the innitial feed is loaded
* [wpEndpoint]: The Wordpress site url



## TO DO
- [ ] Still on development.

 