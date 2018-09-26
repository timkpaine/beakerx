# Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
#
# Licensed under the Apache License, Version 2.0 (the "License")
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#        http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from ipywidgets import Box, DOMWidget, CoreWidget, \
    Text, Label, Textarea, Password, \
    Button, Widget, \
    SelectMultiple, Select, Dropdown, Checkbox, HBox, \
    VBox, RadioButtons, register, Layout, widget_serialization, HTML
from ipywidgets.widgets.trait_types import InstanceDict
from traitlets import Int, Unicode, Dict, Bool, Union, List, Any, observe
from IPython.display import display
import types


class BeakerxLayout(Layout):
    _view_module = Unicode('@jupyter-widgets/base').tag(sync=True)
    _model_module = Unicode('@jupyter-widgets/base').tag(sync=True)
    _model_module_version = Unicode('*').tag(sync=True)
    _view_module_version = Unicode('*').tag(sync=True)

    def __init__(self, **kwargs):
        super(BeakerxLayout, self).__init__(**kwargs)


class BeakerxWidget(Widget):
    def __init__(self, **kwargs):
        super(BeakerxWidget, self).__init__(**kwargs)


class BeakerxDOMWidget(DOMWidget):
    _model_module_version = Unicode('*').tag(sync=True)
    _view_module_version = Unicode('*').tag(sync=True)
    _view_module = Unicode('@jupyter-widgets/controls').tag(sync=True)
    _model_module = Unicode('@jupyter-widgets/controls').tag(sync=True)

    def __init__(self, **kwargs):
        super(BeakerxDOMWidget, self).__init__(**kwargs)

    layout = InstanceDict(BeakerxLayout).tag(sync=True, **widget_serialization)

    def _ipython_display_(self, **kwargs):
        data = {
            'application/vnd.jupyter.widget-view+json': {
                'version_major': 2,
                'version_minor': 0,
                'model_id': self._model_id
            }
        }
        display(data, raw=True)

        self._handle_displayed(**kwargs)


class BeakerxBox(Box):
    def __init__(self, **kwargs):
        super(BeakerxBox, self).__init__(**kwargs)
        self.components = dict()

    _view_module = Unicode('@jupyter-widgets/controls').tag(sync=True)
    _model_module = Unicode('@jupyter-widgets/controls').tag(sync=True)
    _model_module_version = Unicode('*').tag(sync=True)
    _view_module_version = Unicode('*').tag(sync=True)

    layout = InstanceDict(BeakerxLayout).tag(sync=True, **widget_serialization)

    def _ipython_display_(self, **kwargs):
        data = {
            'application/vnd.jupyter.widget-view+json': {
                'version_major': 2,
                'version_minor': 0,
                'model_id': self._model_id
            },
            'method': 'display_data'
        }
        for component in self.components:
            self.components[component].fireInit()

        display(data, raw=True)

        self._handle_displayed(**kwargs)


class BeakerxHBox(HBox):
    def __init__(self, children=None, **kwargs):
        super(BeakerxHBox, self).__init__(**kwargs)
        if children is not None:
            self.children += tuple(children)

    _view_module = Unicode('@jupyter-widgets/controls').tag(sync=True)
    _model_module = Unicode('@jupyter-widgets/controls').tag(sync=True)
    _model_module_version = Unicode('*').tag(sync=True)
    _view_module_version = Unicode('*').tag(sync=True)

    layout = InstanceDict(BeakerxLayout).tag(sync=True, **widget_serialization)
    style = None


class BeakerxVBox(VBox):
    def __init__(self, **kwargs):
        super(BeakerxVBox, self).__init__(**kwargs)

    _view_module = Unicode('@jupyter-widgets/controls').tag(sync=True)
    _model_module = Unicode('@jupyter-widgets/controls').tag(sync=True)
    _model_module_version = Unicode('*').tag(sync=True)
    _view_module_version = Unicode('*').tag(sync=True)

    layout = InstanceDict(BeakerxLayout).tag(sync=True, **widget_serialization)
    style = None


class CyclingDisplayBox(BeakerxBox):
    _view_name = Unicode('CyclingDisplayBoxView').tag(sync=True)
    _model_name = Unicode('CyclingDisplayBoxModel').tag(sync=True)
    _view_module = Unicode('beakerx_table').tag(sync=True)
    _model_module = Unicode('beakerx_table').tag(sync=True)

    period = Int(5000).tag(sync=True)

    def __init__(self, children):
        super(CyclingDisplayBox, self).__init__()
        self.children += tuple(children)

    def setPeriod(self, period):
        self.period = period


class GridView(BeakerxVBox):
    _view_name = Unicode('GridView').tag(sync=True)
    _model_name = Unicode('GridViewModel').tag(sync=True)
    _view_module = Unicode('beakerx_table').tag(sync=True)
    _model_module = Unicode('beakerx_table').tag(sync=True)

    def __init__(self, rows):
        super(GridView, self).__init__()
        self.children += tuple(rows)


class SelectionContainer(BeakerxBox):
    _titles = Dict().tag(sync=True)

    def __init__(self, childrens, labels):
        super(SelectionContainer, self).__init__()
        labels_dict = dict()
        for x in labels:
            labels_dict[len(labels_dict)] = x
        self._titles = labels_dict
        self.children += tuple(childrens)


class Tab(SelectionContainer):
    _view_name = Unicode('TabView').tag(sync=True)
    _model_name = Unicode('TabModel').tag(sync=True)

    def __init__(self, childrens, labels):
        super(Tab, self).__init__(childrens, labels)
