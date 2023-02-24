import { Episode } from './episode';

export interface EpisodesResponseBody {
  info: { count: number; next: string; pages: number; prev: string };
  results: Episode[];
}
