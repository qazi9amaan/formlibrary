export type ISideNavItem = {
  icon?: React.FC<{ className: string }>;
  title: string;
  href: string;
};

export type ISideNavMenu = {
  icon?: React.FC<{ className: string }>;
  title: string;
  children: ISideNavItem[];
  baseHref: string; // <- used for selecting the active nav item
};

export type ISideNavs = (ISideNavItem | ISideNavMenu)[];
