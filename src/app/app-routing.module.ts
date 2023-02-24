import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'characters',
    loadChildren: () =>
      import('./characters/characters.module').then((m) => m.CharactersModule),
  },
  {
    path: 'episodes',
    loadChildren: () =>
      import('./episodes/episodes.module').then((m) => m.EpisodesModule),
  },
  {
    path: 'locations',
    loadChildren: () =>
      import('./locations/locations.module').then((m) => m.LocationsModule),
  },
  {
    path: 'watch-list',
    loadChildren: () =>
      import('./watch-list/watch-list.module').then((m) => m.WatchListModule),
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./not-found/not-found.module').then((m) => m.NotFoundModule),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
