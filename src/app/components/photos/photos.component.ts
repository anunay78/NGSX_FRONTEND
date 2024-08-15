import { Component, OnDestroy, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { Select, Store } from '@ngxs/store';
import { GetPhotos } from '../../store/action/photos.action';
import { PhotoState } from '../../store/state/photo.state';
import { Observable, Subscription } from 'rxjs';
import { Photo } from '../../photoModel';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css'
})
export class PhotosComponent implements OnInit, OnDestroy{
  @Select(PhotoState.getAllPhotos) photos$ !: Observable <Photo[]>
  @Select(PhotoState.photoLoded) photoLoded$ !: Observable <boolean>
  photoLodedSub !: Subscription;
  totalLength!: number;
  constructor(private photoService: PhotoService, private store: Store) { }

  ngOnInit(): void {

    this.getAllPhotos();
  }

  getAllPhotos() {

    this.photoLodedSub = this.photoLoded$.subscribe((loadedPhoto:any)=>{
      if(!loadedPhoto){
        this.store.dispatch(new GetPhotos())
      }
    })
  }

  ngOnDestroy(): void {
  this.photoLodedSub.unsubscribe();
  }
}
