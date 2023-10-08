import {Component, Input, OnInit} from "@angular/core";
import {StatContent} from "../../../core/interfaces/stat-content";

@Component({
  selector: "app-statistic",
  templateUrl: "statistic.component.html",
  styleUrls: ["statistic.component.scss"]
})
export class StatisticComponent implements OnInit{
  @Input() stats: StatContent[] = [];

  constructor() {
  }

  ngOnInit() {
  }
}
