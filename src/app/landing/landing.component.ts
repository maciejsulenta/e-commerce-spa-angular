import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  title: string = 'assets/landing-title.png';
  rick: string = 'assets/rick.png';
  morty: string = 'assets/morty.png';
}
