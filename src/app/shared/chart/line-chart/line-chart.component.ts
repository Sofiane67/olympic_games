import {CommonChartAbstract} from "../common-chart.abstract";
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Olympic} from "../../../core/models/Olympic";
import {Options, SeriesOptionsType} from "highcharts";
import {StatContent} from "../../../core/interfaces/stat-content";
import {ChartType} from "../../../core/enums/chart-types.enum";
import {countMedals, getIconPath} from "../../../core/utils/functions";

@Component({
  selector: "app-line-chart",
  templateUrl: "line-chart.component.html",
  styleUrls: ["line-chart.component.scss"]
})
export class LineChartComponent implements OnInit, CommonChartAbstract{

  @Input() data: Olympic | undefined;
  series: SeriesOptionsType = {} as SeriesOptionsType;
  title: string = "";
  type: ChartType = ChartType.Bar;
  options: Options = {} as Options
  categories: string[] = [];
  @Output() statsEventEmitter = new EventEmitter<StatContent[]>()

  ngOnInit() {
    if(this.data){
      this.title = this.data.country;
      this.series = this.getSeries(this.data)
      this.options = this.getChartOptions();
      this.categories = this.data.participations.map(part => part.year.toString())
      this.getStats();
    }
  }

  getSeries(data: Olympic): SeriesOptionsType {
    const serie = data.participations.map(participation => participation.medalsCount)
    return {
      type: this.type,
      data: serie,
    }
  }

  getStats(): void{
    const stats =  [
      {
        title: "Number of entries",
        value: this.countEntries()
      },
      {
        title: "Total number medals",
        value: this.countMedals()
      },
      {
        title: "Total number of athletes",
        value: this.countTotalAthlete()
      }
    ];

    this.statsEventEmitter.emit(stats)
  }

  countEntries(){
    if(this.data){
      return this.data.participations.length;
    }
    return 0;
  }

  countTotalAthlete(){
    if(this.data){
      return this.data.participations.reduce((acc, participation) => acc + participation.athleteCount,0);
    }
    return 0;
  }

  countMedals(): number{
    if(this.data){
      return countMedals(this.data.participations)
    }
    return 0;
  }

  getChartOptions(): Options{
    const options : Options = {
      yAxis: {
        title: {
          text: "Number of medals",
        },
        labels:{
          style:{
            fontSize: "1.6rem"
          }
        }
      },
      xAxis: {
        categories :["2012", "2016", "2020"],
        labels:{
          style:{
            fontSize: "1.6rem"
          }
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        useHTML: true,
        formatter: function (){
          const {category, y: totalMedals} = this.point;
          return `<div>
                    <div>
                        <span>Year : </span><span style="font-weight: bold">${category}</span>
                    </div>
                    <div>
                        <span>Medals : </span><span style="font-weight: bold">${totalMedals}</span>
                    </div>
                </div>`
        },
        borderRadius: 10,
        style:{
          fontSize: "1.8rem",
        }
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false
          }
        }
      },
      series: [this.series]
    }

    return options
  }

}
