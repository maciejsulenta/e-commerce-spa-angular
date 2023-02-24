import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Episode } from '../../models/episode';

@Component({
  selector: 'episode-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class EpisodeComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public episode: Episode) {}
}
