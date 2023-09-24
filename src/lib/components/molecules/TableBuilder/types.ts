export type ICellType =
  | 'string' //<- normal text
  | 'currency' //<- $100.00
  | 'date' //<- date {format: 'DD/MM/YYYY'}
  | 'timeAgo' //<- time ago
  | 'image' //<- image {width: 100, height: 100}
  | 'boolean' //<- boolean chechmark tick icon
  | 'badge' //<- text in bg color
  | 'actions' //<- actions
  | 'link' //<- link
  | 'button'; //<- button

export type IBadgeColors = {
  green?: string | number | boolean;
  red?: string | number | boolean;
  yellow?: string | number | boolean;
  blue?: string | number | boolean;
  black?: string | number | boolean;
  grey?: string | number | boolean;
};

export type IAction<V = unknown> = string | { whenRowHas: (row: V) => string };

export type ITableCellHeader<V = unknown> = {
  type?: ICellType;
  label: string;
  sortable?: boolean;
  extract?: (row: V) => string | number | boolean;
  hidden?: boolean;
} & (
  | { type: 'actions'; key?: string; actions: IAction<V>[] }
  | { type: 'badge'; key: string; badges: IBadgeColors }
  | { type: Exclude<ICellType, 'actions' | 'badge'>; key: string }
);

export type ITableHeader<V = unknown> = ITableCellHeader<V>[];
