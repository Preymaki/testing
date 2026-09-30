export type NavTarget = 'home' | 'projects' | 'about' | 'contact';

export interface NavItem {
  id: NavTarget;
  label: string;
  targetId: string;
  tag: string;
}

export interface CursorState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  isTouch: boolean;
}

export interface ZoneConfig {
  id: 'header' | 'body' | 'footer';
  title: string;
  ready: boolean;
}
