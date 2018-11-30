import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolutionLanguageManagementComponent } from './solution-language-management/solution-language-management.component';

const routes: Routes = [
    {
        path: 'solutionlanguages',
        pathMatch: 'prefix',
        children: [
            {
                path: '',
                component: SolutionLanguageManagementComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SolutionLanguageManagementRoutingModule {
}
