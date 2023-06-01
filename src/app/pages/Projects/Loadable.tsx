/**
 * Asynchronously loads the component for HomePage
 */

// import { LoadingOverlay } from 'app/components/Popup/LoadingOverlay';
import React from 'react';
import { lazyLoad } from 'utils/loadable';

export const SimpleProject = lazyLoad(
  () => import('./SimpleProject'),
  module => module.SimpleProject,
  // { fallback: <LoadingOverlay /> },
);
