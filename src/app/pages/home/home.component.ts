import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {StatContent} from "../../core/interfaces/stat-content";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  title: string = "";
  stats: StatContent[] = [];

  constructor(private olympicService: OlympicService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.title = "Medals per Country";
  }

  getStats(stats: StatContent[]){
    this.stats = stats;
    this.cdr.detectChanges();
  }
}
