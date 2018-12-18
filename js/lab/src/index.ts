/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { IJupyterWidgetRegistry } from '@jupyter-widgets/base';
import { IPlugin } from '@phosphor/application';
import { JupyterLab, JupyterLabPlugin } from '@jupyterlab/application';
import { ISettingRegistry } from "@jupyterlab/coreutils";
import RequirejsLoader from "./plugin/requirejs";
import beakerx from "./beakerx";

export const beakerx_ext: JupyterLabPlugin<void>|IPlugin<JupyterLab, void> = {
  id: 'beakerx_table',
  requires: [IJupyterWidgetRegistry, ISettingRegistry],
  activate: (app: JupyterLab, widgets: IJupyterWidgetRegistry, settings: ISettingRegistry): void => {
    widgets.registerWidget({
      name: 'beakerx_table',
      version: beakerx.version,
      exports: beakerx
    });
  },
  autoStart: true
};


export const requirejs_ext: JupyterLabPlugin<void> = {
  id: 'beakerx:requirejs',
  autoStart: true,
  requires: [],
  activate: (app: JupyterLab): Promise<void> => {
    return RequirejsLoader.load();
  }
};


export default [
  requirejs_ext,
  beakerx_ext,
];
