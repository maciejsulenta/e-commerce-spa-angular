import { Character } from './character';

export interface CharactersResponseBody {
  info: { count: number; pages: number; next: string; prev: string };
  results: Character[];
}
