import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [PaginationComponent],
  imports: [CommonModule, MatPaginatorModule],
  exports: [PaginationComponent],
})
export class SharedModule {}
