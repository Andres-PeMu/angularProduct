import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './../material/material.module';
import { NavComponent } from './components/nav/nav.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormProductComponent } from './components/form-product/form-product.component';
import { TableComponent } from './components/table/table.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';

import { AngularFireStorageModule } from '@angular/fire/compat/storage';





@NgModule({
  declarations: [ProductFormComponent, NavComponent, DashboardComponent, FormProductComponent, TableComponent, ProductsListComponent,ProductEditComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    AngularFireStorageModule,
  ]
})
export class AdminModule { }
