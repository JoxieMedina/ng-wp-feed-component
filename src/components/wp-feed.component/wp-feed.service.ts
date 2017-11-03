import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class ApiProvider {

  private data : any = null;
  timeout: number = 30000;

  constructor(public http: Http) {
  }
  load(endpoint, cache : boolean = false) {
    if (cache) {
      return this.loadWithCache(endpoint)
    }
    else {
      return this.loadFresh(endpoint)
    }
  }

  loadFresh(endpoint) {
    return Observable.forkJoin(
      this.http.get(endpoint).map(res => res.json())
      .timeout(this.timeout)
    );
  }


  loadWithCache(endpoint) {
    if (!this.data) {
      this.data = Observable.forkJoin(this.http.get(endpoint)
          .timeout(this.timeout)
          .map(res => res.json())
          .publishReplay(1)
          .refCount()
        )
      return this.data;
    }
    else {
      return this.data;
    }
  }

  loadPostById(path){
    return this.http.get(path).map(res => res.json());
  }

}

