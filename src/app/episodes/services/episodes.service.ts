import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_URL } from '../constants/api-url';
import { Episode } from '../models/episode';
import { EpisodesResponseBody } from '../models/episodes-response';
import { FilterParams } from 'src/app/shared/models/filter-params';
import { Filters } from '../models/filters';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  constructor(private httpClient: HttpClient) {}

  getEpisodes(query: FilterParams): Observable<EpisodesResponseBody> {
    let params = new HttpParams().set('page', query.page);

    query.filters.forEach((filter) => {
      params = params.set(filter.type, filter.value);
    });

    return this.httpClient.get<EpisodesResponseBody>(API_URL, { params });
  }

  getFilteredEpisodes(filters: Filters): Observable<Episode[]> {
    const params = new HttpParams()
      .set('name', filters.name)
      .set('episode', filters.episode);

    return this.httpClient
      .get<{ info: unknown; results: Episode[] }>(API_URL, {
        params,
      })
      .pipe(
        map((data) => data.results)
      );
  }
}
