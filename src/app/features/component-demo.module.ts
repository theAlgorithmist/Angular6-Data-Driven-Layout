/**
 * Copyright 2018 Jim Armstrong (www.algorithmist.net)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Feature module for the dynamic layout/component demo
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseComponentComponent } from '../components/base-component/base-component.component';
import { Component1Component    } from '../components/component1/component1.component';
import { Component2Component    } from '../components/component2/component2.component';
import { Component3Component    } from '../components/component3/component3.component';

export const DEMO_COMPONENTS: Array<any> = [
  BaseComponentComponent, Component1Component, Component2Component, Component3Component
];

@NgModule({
  imports: [CommonModule],

  declarations: DEMO_COMPONENTS,

  // since we expect these to be created dynamically ...
  entryComponents: [BaseComponentComponent, Component1Component, Component2Component, Component3Component],

  exports: DEMO_COMPONENTS,
})
export class ComponentDemoModule { }
