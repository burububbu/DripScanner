import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drips-list',
  templateUrl: './drips-list.component.html',
  styleUrls: ['./drips-list.component.scss']
})
export class DripsListComponent implements OnInit {
  @Input() list: string[];
  @Output() shareClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() openClick: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}
}
