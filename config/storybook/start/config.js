import { addParameters } from '@storybook/react';
import configureStorybook from '../configureStorybook';
import { screenshotWidths } from '../../../context';

import 'storybook-chromatic';

if (Array.isArray(screenshotWidths) && screenshotWidths.length > 0) {
  addParameters({
    chromatic: { viewports: screenshotWidths },
  });
}

configureStorybook();
