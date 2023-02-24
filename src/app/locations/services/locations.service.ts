import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_URL } from '../constants/api-url';
import { FilterParams } from 'src/app/shared/models/filter-params';
import { Filters } from '../models/filters';
import { Location } from '../models/location';
import { LocationsResponseBody } from '../models/locations-response';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  constructor(private httpClient: HttpClient) {}

  getLocations(query: FilterParams): Observable<LocationsResponseBody> {
    let params = new HttpParams().set('page', query.page);

    query.filters.forEach((filter) => {
      params = params.set(filter.type, filter.value);
    });

    return this.httpClient.get<LocationsResponseBody>(API_URL, { params });
  }

  getFilteredLocations(filters: Filters): Observable<Location[]> {
    const params = new HttpParams()
      .set('name', filters.name)
      .set('type', filters.type)
      .set('dimension', filters.dimension);

    return this.httpClient
      .get<{ info: unknown; results: Location[] }>(API_URL, {
        params,
      })
      .pipe(
        map((data) => data.results)
      );
  }
}
