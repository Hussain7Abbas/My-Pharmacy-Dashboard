import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { UserDataModel } from "../../models/model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userData={
    img:'https://www.google.com/logos/doodles/2018/ibn-sinas-1038th-birthday-5768556863029248.2-l.png',
    name: '',
    province: '',
    zone: '',
    userType: '',
    pharmacyReplyNo: '0',
    pharmacyAdress: ' '
  }

  myList = []

  constructor(public db:AngularFireDatabase) { 
    
  }

  getData(){
    this.db.list('/userData').query.orderByChild('userType').equalTo('pharmacy').once('value', action=>{
      for (let key in action.val()) {
        this.myList.push([
          key,
          action.val()[key] as UserDataModel
        ])
      }
    })
  }

  ngOnInit() {
    this.getData()
  }

  moreDetails(data){
    this.userData.name = data.name
    this.userData.province = data.province
    this.userData.zone = data.zone
  }

}
