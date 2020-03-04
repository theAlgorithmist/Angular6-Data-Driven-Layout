# Angular 6 With Data-Driven Layout and Component Generation

Although I do a lot of work with low-level libraries in various languages, high-level architecture is one of my favorite topics.  After all, if the architecture is bad, then all the libraries in the world won't hold the application together :)  Metadata-driven architectures (that encompass plugins) are an accepted way to architect and build a very large, highly scalable, and extensible product.  Defining layout and components via data requires the ability to decouple data definition and components from rendering.  Angular provides the _ComponentFactoryResolver_ as a means to dynamically instantiate components.  This factory resolver is used in a demo where components are laid out and internally defined based on external data.

Author:  Jim Armstrong - [The Algorithmist](https://www.linkedin.com/in/jimarmstrong)

@algorithmist

theAlgorithmist [at] gmail [dot] com

Angular: 6.1.0

Typescript: 2.9.2

Angular CLI: 6.2.3

Demo Version: 1.0

## Overview

I have used dynamic component generation/rendering in both Flex and Angular for a wide variety of clients.  Use cases cover the entire gamut from conditional component display based on user roles and application progress to runtime-driven (variable) layout of a fixed component set.  This particular demo could have been implemented with _*ngIf_ directives and _boolean_ flags computed from external data.  Such an approach is, however, more difficult to scale and requires template modification as the number of variable components increases.  

In contrast, the layout for this demo is particularly simple,

```
<div>Dynamic Component Layout</div>

<ng-container *ngFor="let item of items">
  <ng-template dynamic-item></ng-template>
</ng-container>
```  
 
An arbitrary number of components (provided they are compiled into the application) can be rendered, one of top of another, with this simplistic layout.

The data file that drives the display is _/assets/layout-model.json_,

```
{
  "layout": [
    {
      "component": "component2",
      "data": {
        "id": 2,
        "title": "Dynamic Component #2"
      }
    },
    {
      "component": "component3",
      "data": {
        "id": 3,
        "title": "Dynamic Component #3"
      }
    },
    {
      "component": "component1",
      "data": {
        "id": 1,
        "title": "Dynamic Component #1"
      }
    }
  ]
}
```

This currently renders the components in the order 2, 3, 1, however, the order can be changed **without** rebuilding the application simply by changing the data.  

The demo is fully documented, so deconstruct at your convenience and I hope you find many useful applications of the basic techniques in this code base.  


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
