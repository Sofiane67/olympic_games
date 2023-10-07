import {Olympic} from "../../core/models/Olympic";
import {SeriesOptionsType} from "highcharts";
import {StatContent} from "../../core/interfaces/stat-content";

export abstract class CommonChartAbstract{
  abstract getSeries(data: Olympic[]): SeriesOptionsType;
  abstract getStats(): StatContent[];
  abstract getSubtitles(): string;
}
