import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Olympic} from "../../../core/models/Olympic";
import {ChartType} from "../../../core/enums/chart-types.enum";
import {PieSerie} from "../../../core/interfaces/series/pie-serie";
import {StatContent} from "../../../core/interfaces/stat-content";
import {Options, SeriesOptionsType} from "highcharts";
import {Router} from "@angular/router";
import {CommonChartAbstract} from "../common-chart.abstract";
import {buildSubtitle, countMedals, getIconPath} from "../../../core/utils/functions";

@Component({
  selector: "app-pie-chart",
  templateUrl: "pie-chart.component.html",
  styleUrls: ["pie-chart.component.scss"]
})
export class PieChartComponent implements OnInit, CommonChartAbstract{
  @Input() data: Olympic[] | undefined;
  type = ChartType.Pie;
  series: SeriesOptionsType = {} as SeriesOptionsType;
  title: string = "Medals per Country";
  options: Options = {} as Options
  numberOfJOs: number = 0;
  numberOfCountries: number = 0;
  @Output() statsEventEmitter = new EventEmitter<StatContent[]>();

  constructor(private router: Router) {
  }
  ngOnInit() {
    if(this.data){
      this.series = this.getSeries(this.data);
      this.options = this.getChartOptions();
      this.getStats();
    }
  }

  getSeries(data: Olympic[]): SeriesOptionsType{
    const dataSeries: PieSerie[] = [];
      data.forEach((data: Olympic) => {
        const medalsCount =  countMedals(data.participations);
        const serie: PieSerie = {
          id: data.id.toString(),
          name: data.country,
          y: medalsCount
        }
        dataSeries.push(serie)
      })

    const series: SeriesOptionsType= {
      type: this.type,
      data: dataSeries,
      events: {
        click: e => {
          const {id} = e.point.options;
          this.router.navigate(["/country", id])
        }
      },
      style:{
        cursor: "pointer"
      }
    }
    return  series
  }

  getStats(): void{
    this.numberOfJOs = this.getNumberOfJOs();
    this.numberOfCountries = this.data!.length;
    const stats = [
      {
        title: "Number of JOs",
        value: this.numberOfJOs
      },
      {
        title: "Number of countries",
        value: this.numberOfCountries
      },
    ]

    this.statsEventEmitter.emit(stats)
  }

  getSubtitles(stats: StatContent[]): string{
    return buildSubtitle(stats)
  }

  getNumberOfJOs(): number{
    if(this.data){
      const numberOfParticipationPerCountry: number[] = [];
      this.data.forEach(data => {
        numberOfParticipationPerCountry.push(data.participations.length);
      })
      return Math.max(...numberOfParticipationPerCountry);
    }else{
      return 0
    }
  }

  getChartOptions(): Options{
    const options : Options = {
      tooltip: {
        backgroundColor: "#04838F",
        useHTML: true,
        formatter: function (){
          const {name: country, y: totalMedals} = this.point.options;
          const medalIcon = getIconPath("medal-solid.svg");
          const markerIcon = getIconPath("arrow-solid.svg");
          return `<div class="pie-tooltip__box">
            <div class="pie-tooltip__title">${country}</div>
            <div class="pie-tooltip__body">
                <div class="pie-tooltip__icon">
                    <img src="${medalIcon}" />
                </div>
                <span class="pie-tooltip__countMedal">${totalMedals}</span>
            </div>
            <img src="${markerIcon}" class="pie-tooltip__marker"/>
        </div>`
        },
        shadow: false,
        borderColor: "none",
        borderRadius: 10,
        style:{
          color: "#FFFFFF",
        },
        className: "pie-tooltip"
      },
      plotOptions: {
        pie:{
          dataLabels: {
            style: {
              fontSize: "1.3rem"
            }
          }
        },
        series: {
          cursor: "pointer"
        }
      },
      series: [this.series]

    }
    return options
  }


}
