import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {

  public base: any;
  public auth: any;
  public users: any;
  public uid: string;

  constructor() {}

  init(){
    const firebaseConfig = {
      apiKey: "AIzaSyDQuTZRC0CaIctwAyVlchP_J1shY-EN6jU",
      authDomain: "sofe-4870-project.firebaseapp.com",
      databaseURL: "https://sofe-4870-project.firebaseio.com",
      storageBucket: "sofe-4870-project.appspot.com",
      messagingSenderId: "114732260320"
    };

    firebase.initializeApp(firebaseConfig);

    this.base = firebase.database();
    this.auth = firebase.auth();
    this.users = this.base.ref('users');
  }

}
