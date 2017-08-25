import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ActivatedRoute, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import 'hammerjs';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TabsComponent } from './tabs/tabs.component';
import { NavComponent } from './nav/nav.component';
import { PostComponent } from './post/post.component';

import { SubscribeService } from './subscribe.service';

export const appRoutes: Routes = [
  {
      path: '',
      redirectTo: '/posts',
      pathMatch: 'full'
  },
  {
      path: 'posts',
      component: TabsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TabsComponent,
    NavComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    NoopAnimationsModule,
    RouterModule.forRoot( appRoutes )
  ],
  entryComponents: [
    PostComponent
  ],
  providers: [ SubscribeService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
