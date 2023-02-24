import { Component, OnInit } from '@angular/core';
import { NavLink } from '../../models/navbar-items';
import { NAVBAR_ITEMS } from '../../constants/navbar-items';
import { MOBILE_MENU_ITEMS } from '../../constants/mobile-menu-items';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  status: boolean = false;
  logo: string = 'assets/landing-title.png';
  navItems: NavLink[] = NAVBAR_ITEMS;
  mobileMenuItems: NavLink[] = MOBILE_MENU_ITEMS;
  
  constructor() {}

  ngOnInit(): void {}

  handleBurger() {
    this.status = !this.status;
  }
}
