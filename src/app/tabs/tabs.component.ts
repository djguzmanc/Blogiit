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
        {
            name: 'Programación',
            not_viewed: 0
        },
        {
            name: 'Salud y Belleza',
            not_viewed: 0
        },
        {
            name: 'Tecnología',
            not_viewed: 0
        },
        {
            name: 'Música',
            not_viewed: 0
        },
        {
            name: 'Alimentación',
            not_viewed: 0
        },
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
                this.contents[ data.id ].unshift( snapshot.val( ) )
                this.topics[ data.id ].not_viewed++
                console.log( 'An article from ' + data.tag + ' reference was received.' )
          	})
        }
    }

    clearNotReaded( event ) {
        this.topics[ event.index ].not_viewed = 0
    }

    isSubscribed( id ) {
        if ( this.indexPermited[ id ] == 1 )
            return true
        return false
    }

    hasAtLeastOneSubscribe( ) {
        for ( var i = 0; i < this.indexPermited.length; i++ )
            if ( this.indexPermited[ i ] == 1 )
                return true
        return false
    }
}
