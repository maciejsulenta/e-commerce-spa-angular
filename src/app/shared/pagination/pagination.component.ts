import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() count!: number;
  @Input() index!: number;
  @Input() page!: number;
  @Output() returnPaginationData = new EventEmitter<any>();

  public length = this.count;
  public pageSize = 20;
  public pageIndex = this.page;
  public showFirstLastButtons = true;

  public onChange(event: PageEvent): void {
    this.returnPaginationData.emit(event);
  }
}
