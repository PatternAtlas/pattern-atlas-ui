import { Injectable } from '@angular/core';
import RenderingComponent from '../model/rendering-component';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for registering and retreiving rendering components of patterns languages and patterns.
 */
export class ComponentRegistryService {

  // dictionary mapping IRI to list of renderer components
  private dictionary = new Map<string, Array<RenderingComponent>>();

  constructor() {
  }

  /**
   * Returns the rendering component at the given index.
   *
   * @param id the uri of the registered renderer components
   * @param index (optional) the index of the renderer within the list
   * @returns the rendering component at the given index or null, if there is no registered component
   */
  getPLRenderingComponents(id: string, index: number = 0): RenderingComponent {
    const componentList = this.dictionary.get(id.toLowerCase());
    return componentList ? componentList[index] : null;
  }

  /**
   * Returns all rendering components that have been registered to the given uri.
   *
   * @param id the uri of the registered renderer components
   * @returns a list containing all rendering components or null, if there are no registered renderer
   */
  getRenderingComponents(id: string): Array<RenderingComponent> {
    return this.dictionary.get(id.toLowerCase());
  }

  /**
   * Registers the given components for the given uri.
   *
   * @param id the uri which the components will be registered for
   * @param component the components to be registered (higher priority first!)
   */
  registerComponent(id: string, component: RenderingComponent): void {
    const componentList = this.dictionary.get(id);
    if (!componentList) {
      this.dictionary.set(id.toLowerCase(), [component]);
    } else {
      componentList.push(component);
      // sort list DESCENDING according to priority (higher prio first)
      componentList.sort((a, b) => b.priority - a.priority);
    }
  }
}
