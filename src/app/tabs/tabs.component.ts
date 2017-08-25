import { Component, OnInit } from '@angular/core';
import { SubscribeService } from '../subscribe.service';
import { style, state, animate, transition, trigger } from '@angular/core';

declare var firebase: any;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  animations: [
      trigger('fadeInOut', [
        transition(':enter', [
          style({opacity:0}),
          animate(200, style({opacity:1}))
        ]),
        transition(':leave', [
          animate(200, style({opacity:0}))
        ])
    ])
  ]
})

export class TabsComponent implements OnInit {

    contents = [ [], [], [], [], [] ]
    indexPermited = [ 0, 0, 0, 0, 0 ]

    topics = [
        'Programación',
        'Salud y Belleza',
        'Tecnología',
        'Música',
        'Alimentación'
    ]

    constructor( private subService : SubscribeService ) {
        this.subService.dataObs$.subscribe(
            res => {
                this.subscribeToTopic( res )
             }
        )
    }

    ngOnInit( ) {
    }

    subscribeToTopic( data ) {
        if ( this.isSubscribed( data.id ) ) {
            this.indexPermited[ data.id ] = 0
            this.contents[ data.id ] = []
            firebase.database( ).ref( '/' + data.tag ).off( )
        } else {
            this.indexPermited[ data.id ] = 1
            firebase.database( ).ref( '/' + data.tag ).on( 'child_added', ( snapshot ) => {
                this.contents[ data.id ].push( snapshot.val( ) )
          	})
        }
    }

    isSubscribed( id ) {
        if ( this.indexPermited[ id ] == 1 )
            return true
        return false
    }
}
