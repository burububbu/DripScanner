import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { DripDeclaration } from "src/app/providers/owners/owners.service";

@Component({
  selector: "app-drips-list",
  templateUrl: "./drips-list.component.html",
  styleUrls: ["./drips-list.component.scss"]
})
export class DripsListComponent implements OnInit {
  @Input() list: DripDeclaration[];
  @Output() shareClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() openClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() trashClick: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}
}
