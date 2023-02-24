import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { PaginationData } from '../shared/models/pagination-data';
import { EpisodeComponent } from './components/dialog/dialog.component';
import { Episode } from './models/episode';
import { FilterParams } from '../shared/models/filter-params';
import { Filters } from './models/filters';
import { EpisodesService } from './services/episodes.service';
@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss'],
})
export class EpisodesComponent implements OnInit {
  public episodes: Episode[] = [];
  public totalItems!: number;
  public page!: number;
  public paginationData!: PaginationData;
  private filters: Filters = {
    name: '',
    episode: '',
  };
  private unsubscribe$ = new Subject<void>();

  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    episode: new FormControl(''),
  });

  constructor(
    public dialog: MatDialog,
    public episodesService: EpisodesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params) => {
        this.formGroup.patchValue({
          name: params['name'] ?? '',
          episode: params['episode'] ?? '',
        });

        const filtersParams = Object.entries(params)
          .filter((item) => item[0] !== 'page')
          .map(([type, value]) => ({ type, value }));

        this.getData({
          page: params['page'],
          filters: filtersParams,
        });
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public update(): void {
    this.filters = this.formGroup.value;

    this.episodesService
      .getFilteredEpisodes(this.filters)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((responseData) => (this.episodes = responseData));

    this.router.navigate(['/episodes'], {
      queryParams: {
        page: 1,
        name: this.filters.name ?? '',
        episode: this.filters.episode ?? '',
      },
    });
  }

  private getData(params: FilterParams) {
    this.episodesService
      .getEpisodes(params)
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError(() =>
          of({ info: { count: 0, pages: 0, next: '', prev: '' }, results: [] })
        )
      )
      .subscribe((responseData) => {
        this.episodes = responseData.results;
        this.paginationData = responseData.info;
        this.totalItems = responseData.info.count;
      });
  }

  public handlePageEvent(event: PageEvent) {
    const currentPage = event.pageIndex + 1;

    this.router.navigate(['/episodes'], {
      queryParams: {
        page: currentPage ?? 1,
        name: this.filters.name ?? '',
        episode: this.filters.episode ?? '',
      },
    });
  }

  public openEpisodeDialog(episode: Episode) {
    const dialogRef = this.dialog.open(EpisodeComponent, {
      width: 'fit-content',
      data: episode,
    });
  }

  public navigateToEpisodes() {
    this.router.navigateByUrl('/episodes');
  }
}
