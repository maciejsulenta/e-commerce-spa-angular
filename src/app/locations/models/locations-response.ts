import { Location } from './location';

export interface LocationsResponseBody {
  info: { count: number; next: string; pages: number; prev: string };
  results: Location[];
}
