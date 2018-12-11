// Entry point for the unpkg bundle containing custom model definitions.
//
// It differs from the notebook bundle in that it does not need to define a
// dynamic baseURL for the static assets and may load some css that would
// already be loaded by the notebook otherwise.

/// <reference path='./types/index.d.ts'/>

// Export widget models and views, and the npm package version number.
import './shared/style/beakerx.scss';
import './shared/style/tree.scss';
import './shared/style/spark.scss';
import './plot/bko-combinedplot.css';
import './plot/bko-plot.css';

export * from './BxHTML';
export * from './TableDisplay';
export * from './GridView';

export const version = require('../package.json').version;
