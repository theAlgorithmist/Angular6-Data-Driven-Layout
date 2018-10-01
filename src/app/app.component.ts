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
 * Main App component for dynamic component/layout demo
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';

import { DataService } from './services/data-service';

import { DynamicItemDirective } from './directives/dynamic-item.directive';

import { ComponentItem        } from './libs/ComponentItem';
import { ComponentItemFactory } from './libs/ComponentItemFactory';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit
{
  // reference to dynamic item directive instances and associated array
  @ViewChildren(DynamicItemDirective)
  protected _dynamicItems: QueryList<DynamicItemDirective>;

  protected _dynamicItemsArr: Array<DynamicItemDirective>;

  // Collection of Component and data with an iterable for binding
  public componentItems: Record<string, ComponentItem> = {};
  public items: Array<string>;

  /**
   * Construct a new AppComponent
   *
   * @param {DataService} _dataService Injected reference to the data service
   *
   * @param {ComponentFactoryResolver} _componentFactoryResolver Injected reference to the component factory resolver
   *
   * @param {ChangeDetectorRef} _changeDetectorRef Injected reference to change detector
   */
  constructor( protected _dataService: DataService,
               protected _componentFactoryResolver: ComponentFactoryResolver,
               protected _changeDetectorRef: ChangeDetectorRef)
  {
    // empty
  }

  /**
   * Angular lifecycle (on init)
   *
   * @returns {nothing}
   */
  public ngOnInit(): void
  {
    this._dataService.getData('/assets/layout-model.json').subscribe(
      (data: Object) => this.__onModel(data),
      (error: any) => {console.log( "Data loading error: ", error) }, // add more error handling here
      () => { this._dynamicItems.changes.subscribe( () => this.__onSetupComplete()) }  // anything you want to do post-service completion
    );
  }

  /**
   * Angular lifecycle (after view init)
   *
   * @returns {nothing}
   */
  public ngAfterViewInit(): void
  {
    // reserved for future use
  }

  /**
   * Execute when layout setup is complete
   *
   * @returns {nothing}
   * @private
   */
  protected __onSetupComplete(): void
  {
    this._dynamicItemsArr = this._dynamicItems.toArray();

    const n: number = this._dynamicItemsArr.length;

    let i: number;
    let dynamicItem: DynamicItemDirective;
    let item: ComponentItem;
    let componentRef: ComponentRef<any>;
    let factory: ComponentFactory<any>;

    // this is where the fun is ...
    for (i = 0; i < n; ++i)
    {
      // this is the dynamic layout item or template
      dynamicItem = this._dynamicItemsArr[i];

      // this is the component that gets rendered into it
      item = this.componentItems[this.items[i]];

      // if there is another item to render ...
      if (item)
      {
        // add the component to the dynamic view and assign its data
        factory      = this._componentFactoryResolver.resolveComponentFactory(item.component);
        componentRef = dynamicItem.addComponent(factory);

        componentRef.instance.data = item.data;
      }
    }

    // this handler runs after view init
    this._changeDetectorRef.detectChanges();
  }

  /**
   * Execute when the model data loads
   *
   * @param {Object} data JSON data that describes layout and component data
   *
   * @returns {nothing}
   * @private
   */
  protected __onModel(data: Object): void
  {
    const layout: Array<Object> = data['layout'];

    // can reference component items from factory by component name at any time
    layout.forEach( (item: Object) => {this.componentItems[item['component']] = ComponentItemFactory.create(item['component'], item['data'])});

    // this will cause the components to be laid out in lexicographical order, which is okay for this demo
    this.items = Object.keys(this.componentItems);
  }
}
