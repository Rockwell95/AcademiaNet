import { Component } from '@angular/core';
import {NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import {DataService} from "../../providers/data-service";

/*
  Generated class for the SignUp page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {

  registerError: boolean;
  unMatchedPasswords: boolean;
  newCredentials: any;
  errorMessage: string;

  ngDoCheck(): void {
    this.unMatchedPasswords = (this.newCredentials.password !== this.newCredentials.confirmPassword)
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataService, private viewCtrl: ViewController, private alertCtrl: AlertController) {
    this.registerError = false;
    this.newCredentials = {}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    this._data.auth.createUserWithEmailAndPassword(this.newCredentials.email, this.newCredentials.confirmPassword)
      .then((info) => {
        console.log("Registered:", info);
        this.createNewUserEntry(info.uid);
        this.dismiss(info.uid);
        this.showRegisteredMessage();
        this._data.uid = info.uid;
      }, (error) => {
        // Handle Errors here.
        this.errorMessage = error.message;
        console.log("ERR:", this.errorMessage);
        this.registerError = true;
        // ...
      });
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

  private showRegisteredMessage() {
    let alert = this.alertCtrl.create({
      title: 'Successfully Registered!',
      subTitle: 'You have successfully been registered and logged in!',
      buttons: ['Let\'s Go!']
    });
    alert.present();
  }

  private createNewUserEntry(uid: string) {
    this._data.base.ref('users/' + uid).set({
      name: this.newCredentials.name,
      screenName: this.newCredentials.screenName,
      isGuest: false
    });
  }
}
