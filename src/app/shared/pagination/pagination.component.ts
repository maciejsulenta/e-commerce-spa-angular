import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() count!: number;
  @Input() index!: number;
  @Input() page!: number;
  @Output() returnPaginationData = new EventEmitter<any>();

  length = this.count;
  pageSize = 20;
  pageIndex = this.page;
  showFirstLastButtons = true;

  constructor() {}

  ngOnInit(): void {}

  onChange(event: PageEvent) {
    this.returnPaginationData.emit(event);
  }
}
