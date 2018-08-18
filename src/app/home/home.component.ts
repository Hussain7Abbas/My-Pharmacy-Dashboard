import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { userDataModel } from "../../models/model";

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
    this.db.list('/userData').snapshotChanges().subscribe(action=>{
      for (let i = 0; i < action.length; i++) {
        this.myList.push([action[i].key ,action[i].payload.val()])
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
