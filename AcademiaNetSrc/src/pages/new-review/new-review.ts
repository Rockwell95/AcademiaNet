import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {DataService} from "../../providers/data-service";

/*
  Generated class for the NewReview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-new-review',
  templateUrl: 'new-review.html'
})
export class NewReviewPage {

  review: any = {
    rating: 0,
    title: "",
    body: ""
  };

  userName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataService, private viewCtrl: ViewController) {
    this._data.base.ref('users').orderByKey().equalTo(this._data.uid).on('child_added', snap => {
      console.log(snap.val());
      this.userName = snap.val().screenName;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewReviewPage');
  }

  dismiss(reviewInfo){
    if (reviewInfo !== null) {
      reviewInfo.userName = this.userName;
      reviewInfo.dateTime = Date.now();
    }
    this.viewCtrl.dismiss(reviewInfo);
  }
}
