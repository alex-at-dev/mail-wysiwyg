import { BlockType } from '../types/BlockType';

export const typeToIcon: { [type in BlockType]: string } = {
  root: 'fa-circle',
  row: 'fa-bars-staggered',
  headline: 'fa-heading',
  paragraph: 'fa-paragraph',
  cta: 'fa-link',
  image: 'fa-image',
};
