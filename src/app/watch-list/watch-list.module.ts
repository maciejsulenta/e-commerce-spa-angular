import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchListRoutingModule } from './watch-list-routing.module';
import { WatchListComponent } from './watch-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WatchListComponent
  ],
  imports: [
    CommonModule,
    WatchListRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class WatchListModule { }
