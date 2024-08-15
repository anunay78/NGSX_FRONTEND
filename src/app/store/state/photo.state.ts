import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Photo } from "../../photoModel";
import { GetPhotos } from "../action/photos.action";
import { PhotoService } from "../../services/photo.service";
import { tap } from "rxjs";
import { Injectable } from "@angular/core";
export class PhotoStateModel {
  photos!:Photo[];
  photoLoded!:boolean;
}
@State <PhotoStateModel>({
  name: 'Photo',
  defaults:{
    photos:[],
    photoLoded:false
  }
})

@Injectable()

export class PhotoState{
  constructor (private photoService : PhotoService) {}

  @Selector()
  static getAllPhotos(state : PhotoStateModel){
    return state.photos
  }

  @Selector()
  static photoLoded(state : PhotoStateModel){
    return state.photoLoded
  }
  @Action(GetPhotos)
  getPhotos({getState,setState} : StateContext <PhotoStateModel>){
    return this.photoService.getPhotos().pipe(tap(((res:any)=>{
      const state = getState();
      setState({
        ...state,
        photos:res,
        photoLoded:true
      })
    })))
  }
}
