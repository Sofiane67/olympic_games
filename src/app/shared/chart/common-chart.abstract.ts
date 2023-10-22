import {Olympic} from "../../core/models/Olympic";
import {Options, SeriesOptionsType} from "highcharts";
import {StatContent} from "../../core/interfaces/stat-content";
import {ChartType} from "../../core/enums/chart-types.enum";
import {EventEmitter} from "@angular/core";

/**
 * Abstract class representing a common graph model
 * Derived classes must implement properties and methods to customize the behavior of the chart
 * @abstract
 */
export abstract class CommonChartAbstract{

  /**
   * Olympic data used to generate the chart
   * May contain an Olympic object array, an Olympic object, or be undefined
   * @abstract
   */
  abstract  data: Olympic[] | Olympic | undefined;

  /**
   * Type of chart to display ('bar', 'line', 'pie', etc.)
   * @abstract
   */
  abstract type: ChartType;

  /**
   * Serial options used to customize the appearance of the chart
   * @abstract
   */
  abstract series: SeriesOptionsType;

  /**
   * Chart title displayed above the chart
   * @abstract
   */
  abstract title: string;

  /**
   * Additional chart configuration options
   * @abstract
   */
  abstract options: Options;

  /**
   * Event emitter used to pass statistical data to other components
   * @abstract
   */
  abstract statsEventEmitter: EventEmitter<StatContent[]>;

  /**
   * Generates series options for displaying Olympic data
   *
   * @param {Olympic[] | Olympic} data - Olympic data to use to generate the series
   * @returns {SeriesOptionsType} The serial options used for displaying Olympic data
   * @abstract
   */
  abstract getSeries(data: Olympic[] | Olympic): SeriesOptionsType;

  /**
   * Retrieves configuration options for the chart used to display Olympic data
   *
   * This abstract method must be implemented by child classes to define specific options
   * of the chart, such as colors, legends, scales, etc.
   *
   * @returns {Options} Chart configuration options for displaying Olympic data
   * @abstract
   */
  abstract getChartOptions(): Options;
}
