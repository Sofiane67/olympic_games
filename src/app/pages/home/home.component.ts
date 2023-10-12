import {Component, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {Observable, of, Subject, Subscription} from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {StatContent} from "../../core/interfaces/stat-content";
import {Olympic} from "../../core/models/Olympic";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic[] | null> = of(null);
  sub: Subscription | undefined;
  title: string = "";
  stats: StatContent[] = [];
  loading = false;

  constructor(private olympicService: OlympicService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.sub = this.olympics$.subscribe(data => {
      if(data){
        setTimeout(() => {
          this.loading = true
        }, 1500)
      }
    })
    this.title = "Medals per Country";
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
