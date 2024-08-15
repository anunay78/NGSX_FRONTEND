import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http : HttpClient) { }

  getAllNews(){
   return this.http.get('https://newsdata.io/api/1/news?apikey=pub_50935dcced741b2bf2c8a495c7f4af4288758&q=delhi&country=in')
  }
}
