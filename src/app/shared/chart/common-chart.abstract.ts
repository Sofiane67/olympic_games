import {Olympic} from "../../core/models/Olympic";
import {Options, SeriesOptionsType} from "highcharts";
import {StatContent} from "../../core/interfaces/stat-content";
import {ChartType} from "../../core/enums/chart-types.enum";
import {EventEmitter} from "@angular/core";

export abstract class CommonChartAbstract{
  abstract  data: Olympic[] | Olympic | undefined;
  abstract type: ChartType;
  abstract series: SeriesOptionsType;
  abstract title: string;
  abstract options: Options;
  abstract statsEventEmitter: EventEmitter<StatContent[]>;
  abstract getSeries(data: Olympic[] | Olympic): SeriesOptionsType;
  abstract getChartOptions(): Options;
}
