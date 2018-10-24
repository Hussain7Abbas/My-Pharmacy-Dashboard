import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { UserDataModel, contactUs } from "../../models/model";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  userData:UserDataModel={
    uid: '',
    name: '',
    province: '',
    zone: '',
    userType: '',
    pharmacyReplyNo: '0',
    pharmacyAdress: ''
  }

  myMessage={
    title: ' ',
    message: ' '
  }

  myList = []
  isUser:boolean = true

  constructor(public db:AngularFireDatabase) { 
    
  }

  getData(){
    this.db.list('/contactUs').query.once('value', action=>{
      for (let key in action.val()) {
        let item = action.val()[key] as contactUs
        let message = String(item['message']).split('#b#')
        let info = String(item['info']).split('#b#')

        this.myList.push([
          key,
          message,
          info
        ])
      }
    })
    console.log(this.myList);
    
  }

  ngOnInit() {
    this.getData()
  }

  moreDetails(message, key){
    this.myMessage.title = message[0]
    this.myMessage.message = message[1]

    this.db.object('userData/' + key).snapshotChanges().subscribe(action=>{
      this.userData = action.payload.val() as UserDataModel
    })

    if (this.userData.userType == 'user'){
      this.isUser = true
    }else{
      this.isUser = false
    }

  }

}
