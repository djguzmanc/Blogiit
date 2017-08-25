import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SubscribeService } from '../subscribe.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    topics = [
        {
            name: 'Programación',
            tag: 'Prog',
            id: 0
        },
        {
            name: 'Salud y Belleza',
            tag: 'HealBea',
            id: 1
        },
        {
            name: 'Tecnología',
            tag: 'Tech',
            id: 2
        },
        {
            name: 'Música',
            tag: 'Music',
            id: 3
        },
        {
            name: 'Alimentación',
            tag: 'Feed',
            id: 4
        },
    ]

    constructor( private subService : SubscribeService ) {
    }

    fireEvent( e ) {
        this.subService.updateData( e )
    }

    ngOnInit() {
    }

}
