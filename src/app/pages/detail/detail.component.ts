import { Component, OnInit } from '@angular/core';
import {ChartType} from "../../core/enums/chart-types.enum";
import {SeriesOptionsType} from "highcharts";
import {ActivatedRoute} from "@angular/router";
import {OlympicService} from "../../core/services/olympic.service";
import {Olympic} from "../../core/models/Olympic";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  type = ChartType.Line;
  series: SeriesOptionsType = {} as SeriesOptionsType;
  title: string = "";
  subtitle: string = "";
  id: string | null = "";
  olympic: Olympic = {} as Olympic;

  constructor(private route: ActivatedRoute, private olympicService: OlympicService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.olympicService.getOlympicById(parseInt(this.id)).subscribe(olympic => this.olympic = olympic)
    }
  }

}
