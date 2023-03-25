import { NavLink } from '../models/navbar-items';
import { NAVBAR_ITEMS } from './navbar-items';

export const MOBILE_MENU_ITEMS: NavLink[] = [
  {
    label: 'Home',
    path: '',
  },
].concat(NAVBAR_ITEMS);
