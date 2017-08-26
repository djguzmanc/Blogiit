import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

declare var firebase: any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

    topicSelected;
    text;

    constructor( public dialogRef: MdDialogRef<PostComponent>) {

    }

  ngOnInit() {
  }

  fool( c ) {
      this.topicSelected = c;
  }

  submitPost( title, description ) {
      //console.log( title, description, this.topicSelected )

      if ( title == "" || description == "" || this.topicSelected == undefined )
        return

      switch( this.topicSelected ) {
        case "1":
            firebase.database().ref('/Prog').push({ title: title, description: description});
            break
        case "2":
            firebase.database().ref('/HealBea').push({ title: title, description: description});
            break
        case "3":
            firebase.database().ref('/Tech').push({ title: title, description: description});
            break
        case "4":
            firebase.database().ref('/Feed').push({ title: title, description: description});
            break
        case "5":
            firebase.database().ref('/Music').push({ title: title, description: description});
            break
      }

      this.dialogRef.close();
  }
}
