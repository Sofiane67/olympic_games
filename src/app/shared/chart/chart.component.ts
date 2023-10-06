import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {Chart, Options} from "highcharts"
import {ChartType} from "../../core/enums/chart-types.enum";
import {PieSerie} from "../../core/interfaces/series/pie-serie";
import {LineSerie} from "../../core/interfaces/series/line-serie";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {
  chart: Chart | undefined;
  @Input() type!: ChartType;
  @Input() series: PieSerie[] | LineSerie[] | undefined;
  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;
  chartOptions! : Options

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.getChartOption();
  }

  getChartOption(){
    this.chartOptions = {
      chart: {
        type: this.type,
        style: {
          fontFamily: "Raleway, sans-serif;",
          width: 100
        }
      },
      title: {
        text: `<h1 class="title">${this.title}</h1>`,
        useHTML: true,
        style: {
          margin: 50
        }
      },
      subtitle: {
        text: `<div class="stats">${this.subtitle}</div>`,
        useHTML: true,
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
