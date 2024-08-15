import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit{
  news:any
  constructor(private newsService : NewsService) {}

  ngOnInit(): void {
    this.getAllNews();
  }

  getAllNews() {
    this.newsService.getAllNews().subscribe((res: any) => {
      this.news = res.results.map((newsItem: any) => {
        if (newsItem.description && newsItem.description.length > 500) {
          newsItem.description = newsItem.description.slice(0, 500) + '...';
        }
        return newsItem;
      });
      console.log(this.news);
    });
  }


}
