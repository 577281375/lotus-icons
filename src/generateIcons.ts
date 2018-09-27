import fs = require('fs-extra');
import _ = require('lodash');
import parse5 = require('parse5');
import path = require('path');
import Prettier = require('prettier');
import { from, Observable, of, Subscription } from 'rxjs';
import SVGO = require('svgo');
import { concat, filter, map, mergeMap, reduce } from 'rxjs/operators';

export interface Environment {
  readonly paths: {
    SVG_DIR: string;
    ICON_TEMPLATE: string;
    INDEX_TEMPLATE: string;
    MANIFEST_TEMPLATE: string;
    ICON_OUTPUT_DIR: string;
    THEME_FILL_OUTPUT: string;
    THEME_OUTLINE_OUTPUT: string;
    THEME_TWO_TONE_OUTPUT: string;
    INDEX_OUTPUT: string;
    MANIFEST_OUTPUT: string;
    DIST_TEMPLATE: string;
    DIST_OUTPUT: string;
    TYPES_TEMPLATE: string;
    TYPES_OUTPUT: string;
  }
  readonly base: string;
  readonly options: {
    svgo: SVGO.Options;
    prettier: Prettier.Options;
  };
}

// svg folder names
export type ThemeType = 'fill' | 'outline' | 'twotone';

export async function build(env: Environment) {
  const svgo = new SVGO(env.options.svgo);
  const singleType: ThemeType[] = ['fill', 'outline'];
  const svgoForSingleIcon = new SVGO({
    ...env.options.svgo,
    plugins: [
      ...env.options.svgo.plugins!,
      // single color should remove the `fill` attribute.
      { removeAttrs: { attrs: ['fill'] } }
    ]
  });

}
