import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodComponent } from './food/food.component';

import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { OptionsComponent } from './options/options.component';
import { EditComponent } from './edit/edit.component';

import { FormsModule } from '@angular/forms';
import { NewComponent } from './new/new.component';

const routes:Routes = [
    { path: '', redirectTo: '/options', pathMatch: 'full' },
    { path: 'list', component: ListComponent },
    { path: 'options', component: OptionsComponent },
    { path: 'edit/:id', component: EditComponent },
    { path: 'new', component: NewComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    FoodComponent,
    ListComponent,
    OptionsComponent,
    EditComponent,
    NewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
