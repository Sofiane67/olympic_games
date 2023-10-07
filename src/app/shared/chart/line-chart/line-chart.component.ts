import {CommonChartAbstract} from "../common-chart.abstract";
import {Component, Input, OnInit} from "@angular/core";
import {Olympic} from "../../../core/models/Olympic";
import {Options, SeriesOptionsType} from "highcharts";
import {StatContent} from "../../../core/interfaces/stat-content";
import {ChartType} from "../../../core/enums/chart-types.enum";
import {buildSubtitle, countMedals} from "../../../core/utils/functions";

@Component({
  selector: "app-line-chart",
  templateUrl: "line-chart.component.html",
  styleUrls: ["line-chart.component.scss"]
})
export class LineChartComponent implements OnInit, CommonChartAbstract{

  @Input() data: Olympic | undefined;
  series: SeriesOptionsType = {} as SeriesOptionsType;
  subtitle: string = "";
  title: string = "";
  type: ChartType = ChartType.Bar;
  options: Options = {} as Options
  categories: string[] = [];

  ngOnInit() {
    if(this.data){
      this.title = this.data.country;
      this.series = this.getSeries(this.data)
      this.subtitle = this.getSubtitles(this.getStats());
      this.options = this.getChartOptions();
      this.categories = this.data.participations.map(part => part.year.toString())
      console.log(this.data)
    }
  }


  getSeries(data: Olympic): SeriesOptionsType {
    const serie = data.participations.map(participation => participation.medalsCount)
    console.log(serie)
    return {
      type: this.type,
      data: serie,
    }
  }

  getStats(): StatContent[] {
    return [
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
  }

  getSubtitles(stats: StatContent[]): string {
    return buildSubtitle(stats);
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
            color: "red",
            fontSize: "1.6rem"
          }
        }
      },
      xAxis: {
        categories :["2012", "2016", "2020"],
        labels:{
          style:{
            color: "red",
            fontSize: "1.6rem"
          }
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false
          }
        }
      }
    }

    return options
  }

}
