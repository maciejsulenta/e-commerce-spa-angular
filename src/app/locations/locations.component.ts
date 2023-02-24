import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { PaginationData } from '../shared/models/pagination-data';
import { LocationsDialogComponent } from './components/dialog/dialog.component';
import { FilterParams } from '../shared/models/filter-params';
import { Filters } from './models/filters';
import { Location } from './models/location';
import { LocationsService } from './services/locations.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent implements OnInit {
  public locations: any = [];
  public totalItems!: number;
  public page!: number;
  public paginationData!: PaginationData;
  private filters: Filters = {
    name: '',
    type: '',
    dimension: '',
  };
  private unsubscribe$ = new Subject<void>();

  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    dimension: new FormControl(''),
  });

  constructor(
    public dialog: MatDialog,
    public locationsService: LocationsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params) => {
        this.formGroup.patchValue({
          name: params['name'] ?? '',
          type: params['type'] ?? '',
          dimension: params['dimension'] ?? '',
        });

        const filtersParams = Object.entries(params)
          .filter((item) => item[0] !== 'page')
          .map(([type, value]) => ({ type: type, value: value }));

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

    this.locationsService
      .getFilteredLocations(this.filters)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((responseData) => (this.locations = responseData));

    this.router.navigate(['/locations'], {
      queryParams: {
        page: 1,
        name: this.filters.name ?? '',
        type: this.filters.type ?? '',
        dimension: this.filters.dimension ?? '',
      },
    });
  }

  private getData(params: FilterParams) {
    this.locationsService
      .getLocations(params)
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError(() =>
          of({ info: { count: 0, pages: 0, next: '', prev: '' }, results: [] })
        )
      )
      .subscribe((responseData) => {
        this.locations = responseData.results;
        this.paginationData = responseData.info;
        this.totalItems = responseData.info.count;
      });
  }

  public handlePageEvent(event: PageEvent) {
    const currentPage = event.pageIndex + 1;

    this.router.navigate(['/locations'], {
      queryParams: {
        page: currentPage ?? 1,
        name: this.filters.name ?? '',
        type: this.filters.type ?? '',
        dimension: this.filters.dimension ?? '',
      },
    });
  }

  public openLocationDialog(location: Location) {
    const dialogRef = this.dialog.open(LocationsDialogComponent, {
      width: 'fit-content',
      data: location,
    });
  }

  public navigateToLocations() {
    this.router.navigateByUrl('/locations');
  }
}
