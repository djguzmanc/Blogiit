import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SubscribeService {

    private dataSub = new Subject<any>( );

    dataObs$ = this.dataSub.asObservable( );

    constructor() { }

    updateData( data ) {
        this.dataSub.next( data );
    }

}
