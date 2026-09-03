/**
 * Type definitions for Custom Clicks Cursor landing experience
 */

export type CursorCategory =
  | 'all'
  | 'navigation'
  | 'editing'
  | 'drag-drop'
  | 'resizing'
  | 'precision'
  | 'status';

export interface CursorItem {
  id: string;
  name: string;
  cssState: string;
  category: CursorCategory;
  hotspot: [number, number];
  description: string;
  theme?: 'dark' | 'light' | 'both';
  svgPath: string;
  viewBox?: string;
  isAnimated?: boolean;
}

export interface FeatureItem {
  number: string;
  title: string;
  description: string;
  tag?: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  detail: string;
}
