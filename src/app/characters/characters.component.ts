import { Component, OnDestroy, OnInit } from '@angular/core';
import { Character } from './models/character';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { PaginationData } from '../shared/models/pagination-data';
import { FilterParams } from '../shared/models/filter-params';
import { Filters } from './models/filters';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { CharactersService } from './services/characters.service';
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit, OnDestroy {
  public characters: Character[] = [];
  public page!: number;
  public totalItems!: number;
  public paginationData!: PaginationData;
  private filters: Filters = {
    name: '',
    species: '',
    status: '',
    gender: '',
  };

  private unsubscribe$ = new Subject<void>();

  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    species: new FormControl(''),
    status: new FormControl(''),
    gender: new FormControl(''),
  });

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private charactersService: CharactersService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params) => {
        this.formGroup.patchValue({
          name: params['name'] ?? '',
          species: params['species'] ?? '',
          status: params['status'] ?? '',
          gender: params['gender'] ?? '',
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

  private getData(params: FilterParams) {
    this.charactersService
      .getCharacters(params)
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError(() =>
          of({ info: { count: 0, pages: 0, next: '', prev: '' }, results: [] })
        )
      )
      .subscribe((responseData) => {
        this.characters = responseData.results;
        this.paginationData = responseData.info;
        this.totalItems = responseData.info.count;
      });
  }

  public handlePageEvent(event: PageEvent) {
    const currentPage = event.pageIndex + 1;

    this.router.navigate(['/characters'], {
      queryParams: {
        page: currentPage ?? 1,
        name: this.filters.name ?? '',
        species: this.filters.species ?? '',
        status: this.filters.status ?? '',
        gender: this.filters.gender ?? '',
      },
    });
  }

  public update(): void {
    this.filters = this.formGroup.value;

    this.charactersService
      .getFilteredCharacters(this.filters)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((responseData) => (this.characters = responseData));

    this.router.navigate(['/characters'], {
      queryParams: {
        page: 1,
        name: this.filters.name ?? '',
        species: this.filters.species ?? '',
        status: this.filters.status ?? '',
        gender: this.filters.gender ?? '',
      },
    });
  }

  public openCharacterDialog(character: Character) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'fit-content',
      data: character,
    });
  }

  public navigateToCharacters() {
    this.router.navigateByUrl('/characters');
  }
}
