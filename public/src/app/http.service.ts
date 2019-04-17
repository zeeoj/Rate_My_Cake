import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {

  }
  getAllCakes(){
    return this._http.get('/allCakes');
  }
  makeNewCake(newcake) {
    return this._http.post('/newCake', newcake);
  }
  makeNewRating(newrate, id){
    console.log(newrate)
    return this._http.post(`/newRating/${id}`, newrate);

  }

}
