/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const ChoosePolicy = lazyLoad(
  () => import('./Choose'),
  module => module.Choose,
);

export const Policy = lazyLoad(
  () => import('./Policy'),
  module => module.default,
);

export const Terms = lazyLoad(
  () => import('./Terms'),
  module => module.default,
);
