import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {Chart, Options, SeriesOptionsType} from "highcharts"
import {ChartType} from "../../core/enums/chart-types.enum";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {
  chart: Chart | undefined;
  @Input() type!: ChartType;
  @Input() series: SeriesOptionsType = {} as SeriesOptionsType;
  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;
  @Input() options?: Options;
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
      series: [this.series]
    }

    if(this.options){
      this.chartOptions = {...this.chartOptions, ...this.options};
    }
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.el.nativeElement, this.chartOptions)
  }

  ngOnDestroy(): void {
  }

}
