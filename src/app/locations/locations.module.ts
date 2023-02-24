import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { LocationsDialogComponent } from './components/dialog/dialog.component';


@NgModule({
  declarations: [
    LocationsComponent,
    LocationsDialogComponent
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    MatDialogModule
  ]
})
export class LocationsModule { }
