import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ComponentRegistryService {

    private dictionary = new Map<string, {plcomponent: any, pcomponent: any}>();

    constructor() {
    }

    getPLRenderingComponents(id: string): {plcomponent: any, pcomponent: any} {
        return this.dictionary.get(id);
    }

    registerComponent(id: string, components: {plcomponent: any, pcomponent: any}): void {
        this.dictionary.set(id, components);
    }
}
