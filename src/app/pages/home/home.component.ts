import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {ChartType} from "../../core/enums/chart-types.enum";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  chartType = ChartType.Pie
  series = [{
    name: 'Chrome',
    y: 70.67,
  }, {
    name: 'Edge',
    y: 14.77
  },  {
    name: 'Firefox',
    y: 4.86
  }, {
    name: 'Safari',
    y: 2.63
  }, {
    name: 'Internet Explorer',
    y: 1.53
  },  {
    name: 'Opera',
    y: 1.40
  }, {
    name: 'Sogou Explorer',
    y: 0.84
  }, {
    name: 'QQ',
    y: 0.51
  }, {
    name: 'Other',
    y: 2.6
  }]

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
  }
}
