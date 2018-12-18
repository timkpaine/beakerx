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

import { DisposableDelegate } from '@phosphor/disposable';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { INotebookModel, NotebookPanel } from '@jupyterlab/notebook';
import { JupyterLab } from "@jupyterlab/application";

class BeakerxExtension implements DocumentRegistry.WidgetExtension {
  constructor(
    private app: JupyterLab,
  ) {}

  createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>) {

    let app = this.app;

    Promise.all([panel.session.ready, context.ready]).then(function() {
      const originalProcessFn = app.commands.processKeydownEvent;
      app.commands.processKeydownEvent = (event) => {
        if (window.beakerx.tableFocused) {
          return false;
        }

        return originalProcessFn.call(app.commands, event);
      };
    });

    return new DisposableDelegate(() => { });
  }
}

export default BeakerxExtension;
