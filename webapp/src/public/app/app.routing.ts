import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageFormComponent } from './image-form/image-form.component';
import { BinningComponent } from './binning/binning.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    {
        path: 'image-upload',
        component: ImageFormComponent
    },
    {
        path: 'binning',
        component: BinningComponent
    },
    {
        path: '',
        redirectTo: '/image-upload',
        pathMatch: 'full'
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(
        appRoutes,
        // { enableTracing: true }
    )],
    exports: [RouterModule]
})
export class AppRoutingModule { }
