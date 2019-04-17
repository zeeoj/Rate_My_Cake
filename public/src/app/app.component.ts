import { Component, OnInit} from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Rate My Cake';
  allCakes;
  newCakes;
  newRating;
  currentCakeForNested;

  constructor(private _httpService: HttpService) {
  }


  ngOnInit() {
    this.allCakes = [];
    this.currentCakeForNested = {id: "", ratings: []};
    this.newCakes = {baker: "", url: ""};
    this.newRating = {stars: "", comment: "", id: ""};
    this.getAllCakes();
  }

  getAllCakes() {
    console.log("getting cakes")

    let observable = this._httpService.getAllCakes();
    observable.subscribe(data =>{
      console.log(this.allCakes)
      console.log(data['data'])
      this.allCakes = data['data']
    })


  }

  makeNewCake(){
    var self = this;
    let observable = this._httpService.makeNewCake(this.newCakes);
    observable.subscribe(data => {
      console.log("Got data from post back", data)
      this.allCakes.push(data['data']);
      console.log(this.allCakes)

    });
    this.newCakes = { baker: "", url: "" }

  }
  viewCake(id){
    for(var i = 0; i < this.allCakes.length; i++){
      if (this.allCakes[i]._id == id){
        this.currentCakeForNested = this.allCakes[i]
      }
    }
    console.log(this.currentCakeForNested)
  }


  addRating(id, thisstars, thiscomments){
    this.newRating.id= id;
    this.newRating.stars= thisstars.value;
    this.newRating.comment= thiscomments.value;
    // this.computeAverageratings(id, this.newRating.stars);
    console.log("my rATING", this.newRating)
    let myRating = this._httpService.makeNewRating(this.newRating, id);
    myRating.subscribe(function(data){

    });
    this.newRating ={stars: "", comments: ""}
  }



  // computeAverageratings(id, stars){
  //   for (var i = 0; i < this.allCakes.length; i++){
  //     if (this.allCakes[i]._id ==id){
  //       var sumStars = 0;
  //       for(var j = 0; j < this.allCakes[i].ratings.length; j++){
  //         sumStars += this.allCakes[i].ratings[j].stars
  //       }
  //         sumStars += parseInt(stars)
  //         console.log(sumStars)
  //         this.allCakes[i].avgStars = (sumStars / (this.allCakes[i].ratings.length +1))
  //         console.log(this.allCakes[i].avgStars );
  //
  //     }
  //   }
  // }
}

