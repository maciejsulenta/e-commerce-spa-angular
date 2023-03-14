import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MOBILE_MENU_ITEMS } from '../../constants/mobile-menu-items';
import { NAVBAR_ITEMS } from '../../constants/navbar-items';
import { NavLink } from '../../models/navbar-items';
import { LandingImage } from 'src/app/landing/models/landing-image.interface';
import { LANDING_IMAGES } from 'src/app/landing/constants/landing-images.constant';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  public status: boolean = false;
  public navItems: NavLink[] = NAVBAR_ITEMS;
  public mobileMenuItems: NavLink[] = MOBILE_MENU_ITEMS;
  public readonly logo: LandingImage = LANDING_IMAGES.title;

  public handleBurger(): void {
    this.status = !this.status;
    console.log(this.mobileMenuItems);
  }
}
