import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OlympicService} from "../../core/services/olympic.service";
import {Olympic} from "../../core/models/Olympic";
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  id: string | null = "";
  olympic: Olympic = {} as Olympic;

  constructor(private route: ActivatedRoute, private olympicService: OlympicService, private location: Location) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.olympicService.getOlympicById(parseInt(this.id)).subscribe(olympic => this.olympic = olympic)
    }
  }

  goBack(): void {
    this.location.back();
  }
}
