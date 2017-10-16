import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';

import {FileUploadModule} from 'primeng/primeng';

import { AppComponent } from './app.component';
import { ImageFormComponent } from './image-form/image-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AppRoutingModule } from './app.routing';
import { BinningComponent } from './binning/binning.component';

import { DataService } from './data.service';

import {DragDropModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    ImageFormComponent,
    PageNotFoundComponent,
    BinningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    DataTableModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
