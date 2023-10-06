import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {Chart, Options} from "highcharts"
import {ChartType} from "../../core/enums/chart-types.enum";
import {PieSerie} from "../../core/models/series/pie-serie";
import {LineSerie} from "../../core/models/series/line-serie";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {
  chart: Chart | undefined;
  @Input() type!: ChartType;
  @Input() series: PieSerie[] | LineSerie[] | undefined;
  chartOptions! : Highcharts.Options

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: this.type
      },
      series: [{
        type: this.type,
        data: this.series
      }]
    }
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.el.nativeElement, this.chartOptions)
  }

  ngOnDestroy(): void {
  }

}
