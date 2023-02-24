import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WatchListEpisode } from './models/watch-list-episode';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss'],
})
export class WatchListComponent implements OnInit {
  public episodes: WatchListEpisode[] = [];
  public formGroup: FormGroup = new FormGroup({
    episode: new FormControl(''),
  });

  ngOnInit(): void {
    this.episodes = JSON.parse(localStorage['episodes']);
  }

  public addEpisode() {
    const episode: WatchListEpisode = {
      name: this.formGroup.value.episode,
      isChecked: false,
    };

    this.episodes.push(episode);
    localStorage.setItem('episodes', JSON.stringify(this.episodes));
    this.formGroup.reset();
  }

  public removeEpisode(episode: WatchListEpisode) {
    this.episodes.splice(this.episodes.indexOf(episode), 1);
    localStorage.setItem('episodes', JSON.stringify(this.episodes));
  }

  public checkEpisode(episode: WatchListEpisode) {
    episode.isChecked = !episode.isChecked;
    localStorage.setItem('episodes', JSON.stringify(this.episodes));
  }
}
