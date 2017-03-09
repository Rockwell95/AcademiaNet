import { Component } from '@angular/core';
import {NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import {DataService} from "../../providers/data-service";
import {SignUpPage} from "../sign-up/sign-up";

// Some elements of this page (largely aesthtetic elements) were borrowed from
// https://devdactic.com/login-ionic-2/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  registerCredentials: any;
  loginError: boolean;
  errorMessage: string;

  readonly GUEST_EMAIL = 'dominick.james7@gmail.com';
  readonly GUEST_PASSWORD = 'guestpass';


  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataService, private viewCtrl: ViewController, private modalCtrl: ModalController) {
    this.registerCredentials = {};
    this.loginError = false;
    // LoginPage.facebookButton(document, 'script', 'facebook-jssdk')
  }

  createAccount(){
    console.log("Create account");
    let registerModal = this.modalCtrl.create(SignUpPage);

    registerModal.onDidDismiss((data)=>{
      console.log(data);
      if (data !== null) {
        this.dismiss(data);
      }
    });

    registerModal.present();
  }

  login(){
    this._data.auth.signInWithEmailAndPassword(this.registerCredentials.email, this.registerCredentials.password).then((info) => {
      console.log("LOGGED IN!");
      this.dismiss(info.uid);
      this._data.uid = info.uid;
    }, (error) => {
      // Handle Errors here.
      this.errorMessage = error.message;
      console.error("ERR:", this.errorMessage);
      this.loginError = true;
      // ...
    });
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

  signInAsGuest(){
    console.log("Logging in as Guest");
    this._data.auth.signInWithEmailAndPassword(this.GUEST_EMAIL, this.GUEST_PASSWORD).then((inf) => {
      this.dismiss(inf.uid);
      this._data.uid = inf.uid;
    }, error => {
      console.error("GUEST ERROR:", error.message);
      this.loginError = true;
    })

  }

  static facebookButton(d, s, id) {
    let js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.8";
    fjs.parentNode.insertBefore(js, fjs);
  }

}
