import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpisodesRoutingModule } from './episodes-routing.module';
import { EpisodesComponent } from './episodes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { EpisodeComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    EpisodesComponent,
    EpisodeComponent
  ],
  imports: [
    CommonModule,
    EpisodesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    MatDialogModule
  ]
})
export class EpisodesModule { }
