import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientesRoutingModule,
    NgxPaginationModule,
    NgSelectModule,
    FormsModule

],
declarations: [
    LayoutComponent,
    ListComponent,
    AddEditComponent
]
})
export class ClientesModule { }
