import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable} from 'rxjs';
import { API_URL } from '../constants/api-url';
import { Character } from '../models/character';
import { CharactersResponseBody } from '../models/characters-response';
import { FilterParams } from 'src/app/shared/models/filter-params';
import { Filters } from '../models/filters';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(private httpClient: HttpClient) {}

  getCharacters(query: FilterParams): Observable<CharactersResponseBody> {
    let params = new HttpParams().set('page', query.page);

    query.filters.forEach((filter) => {
      params = params.set(filter.type, filter.value);
    });

    return this.httpClient.get<CharactersResponseBody>(API_URL, {
      params,
    });
  }

  getFilteredCharacters(filters: Filters): Observable<Character[]> {
    const params = new HttpParams()
      .set('name', filters.name)
      .set('species', filters.species)
      .set('status', filters.status)
      .set('gender', filters.gender);

    return this.httpClient
      .get<{ info: unknown; results: Character[] }>(API_URL, {
        params,
      })
      .pipe(map((data) => data.results));
  }
}
