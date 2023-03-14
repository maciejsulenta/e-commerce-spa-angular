import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LANDING_IMAGES } from './constants/landing-images.constant';
import { LandingImages } from './models/landing-images.interface';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  public readonly images: LandingImages = LANDING_IMAGES;
}
