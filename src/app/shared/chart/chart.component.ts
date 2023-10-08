import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {Chart, Options} from "highcharts"
import {ChartType} from "../../core/enums/chart-types.enum";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {
  chart: Chart | undefined;
  @Input() type!: ChartType;
  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;
  @Input() options: Options | undefined;
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
        },
      },
      title: {
        text: ""
      },
      ...this.options
    }
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.el.nativeElement, this.chartOptions)
  }

  ngOnDestroy(): void {
  }

}
