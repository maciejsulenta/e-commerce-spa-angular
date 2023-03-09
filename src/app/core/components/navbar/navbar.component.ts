import { Component } from '@angular/core';
import { NavLink } from '../../models/navbar-items';
import { NAVBAR_ITEMS } from '../../constants/navbar-items';
import { MOBILE_MENU_ITEMS } from '../../constants/mobile-menu-items';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  status: boolean = false;
  public logo: string = 'assets/landing-title.png';
  navItems: NavLink[] = NAVBAR_ITEMS;
  mobileMenuItems: NavLink[] = MOBILE_MENU_ITEMS;

  public handleBurger(): void {
    this.status = !this.status;
  }
}
