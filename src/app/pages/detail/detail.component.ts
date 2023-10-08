import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OlympicService} from "../../core/services/olympic.service";
import {Olympic} from "../../core/models/Olympic";
import { Location } from '@angular/common';
import {StatContent} from "../../core/interfaces/stat-content";
import {catchError} from "rxjs/operators";
import {of, Subscription, throwError} from "rxjs";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  id: string | null = "";
  olympic: Olympic = {} as Olympic;
  sub: Subscription | undefined;
  title: string = "";
  stats: StatContent[] = [];
  loading: boolean = false;
  error: boolean = false;

  constructor(private route: ActivatedRoute, private olympicService: OlympicService, private location: Location, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.sub = this.olympicService.getOlympicById(parseInt(this.id))
        .pipe(
          catchError(error => {
            this.error = true;
            this.loading = false;
            return throwError(error);
          })
        )
        .subscribe(olympic => {
          if (olympic) {
            this.olympic = olympic;
            setTimeout(() => {
              this.loading = true
            }, 1500)
          }
      })
    }
  }

  goBack(): void {
    this.location.back();
    this.loading = false;
  }

  getStats(stats: StatContent[]){
    this.stats = stats;
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    if(this.sub){
      this.sub.unsubscribe()
    }
  }
}
