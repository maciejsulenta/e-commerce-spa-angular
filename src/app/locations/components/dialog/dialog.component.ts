import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location } from '../../models/location';

@Component({
  selector: 'locations-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class LocationsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public location: Location) {}
}
