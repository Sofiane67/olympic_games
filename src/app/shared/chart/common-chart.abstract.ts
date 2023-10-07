import {Olympic} from "../../core/models/Olympic";
import {SeriesOptionsType} from "highcharts";
import {StatContent} from "../../core/interfaces/stat-content";
import {ChartType} from "../../core/enums/chart-types.enum";

export abstract class CommonChartAbstract{
  abstract  data: Olympic[] | undefined;
  abstract type: ChartType;
  abstract series: SeriesOptionsType;
  abstract title: string;
  abstract subtitle: string;
  abstract getSeries(data: Olympic[] | Olympic): SeriesOptionsType;
  abstract getSubtitles(stats: StatContent[]): string;
  abstract getStats(): StatContent[]
}
