import {Component, Input, OnInit} from "@angular/core";
import {Olympic} from "../../../core/models/Olympic";
import {ChartType} from "../../../core/enums/chart-types.enum";
import {PieSerie} from "../../../core/interfaces/series/pie-serie";
import {StatContent} from "../../../core/interfaces/stat-content";
import {SeriesOptionsType} from "highcharts";
import {Router} from "@angular/router";

@Component({
  selector: "app-pie-chart",
  templateUrl: "pie-chart.component.html",
  styleUrls: ["pie-chart.component.scss"]
})
export class PieChartComponent implements OnInit{
  @Input() data: Olympic[] | undefined;
  type = ChartType.Pie;
  series: SeriesOptionsType = {} as SeriesOptionsType;
  title: string = "Medals per Country";
  subtitle: string = "";
  numberOfJOs: number = 0;
  numberOfCountries: number = 0;
  stats: StatContent[] = [];
  a:  SeriesOptionsType[] = [];

  constructor(private router: Router) {
  }
  ngOnInit() {
    if(this.data){
      this.series = this.getSeries(this.data);
      this.subtitle = this.getSubtitles();
    }
  }

  getSeries(data: Olympic[]): SeriesOptionsType{
    const dataSeries: PieSerie[] = [];
      data.forEach((data: Olympic) => {
        const medalsCount = data.participations.reduce((acc, participation) => acc + participation.medalsCount,0)
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
    }
    return  series
  }

  getStats(): StatContent[]{
    this.numberOfJOs = this.getNumberOfJOs();
    this.numberOfCountries = this.data!.length;

    return  [
      {
        title: "Number of JOs",
        value: this.numberOfJOs
      },
      {
        title: "Number of countries",
        value: this.numberOfCountries
      },
    ]
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

  getSubtitles(){
    this.stats = this.getStats();
    let html = "";
    this.stats.forEach((stat: StatContent) => {
      html += `<div class="stat"> <span class="stat__title">${stat.title}</span> <span class="stat__value">${stat.value}</span></div>`
    })
    console.log(html)
    return html;
  }
}
