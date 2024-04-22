import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
    // {
  //   key: "account",
  //   title: "Account",
  //   href: paths.dashboard.overview,
  //   icon: "user",
  // },
  // {
  //   key: "likes",
  //   title: "Likes",
  //   href: paths.dashboard.settings,
  //   icon: "hand-heart",
  // },
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
  { key: 'gossips', title: 'Gossips', href: paths.dashboard.gossips, icon: 'star-four' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
