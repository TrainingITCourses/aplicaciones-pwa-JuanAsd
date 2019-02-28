import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/store/api.service';
import { Observable, from } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { LoadLaunches } from '../core/store/launch/launch.actions';
import { LoadAgencys } from '../core/store/agency/agency.actions';
import { LoadTypes } from '../core/store/type/type.actions';
import { GlobalState } from '../core/store';
import { LoadStatuses } from '../core/store/status/status.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private filteredCriteria: string;
  public filteredLaunches$: Observable<any[]>;
  public filteredLaunchesList$: Observable<any[]>;
  public agencies: any[];
  public status: any[];
  public type: any[];

  constructor(private api: ApiService, private global: Store<GlobalState>) { }

  ngOnInit() {

    from(this.api.getStatusTypes$()).subscribe(x => this.status = x);
    this.getData();

  }

  onSearch = (event: string) => {
    if (this.filteredCriteria === 'Estado') {
      const filteredLaunches = this.global.select('launch').pipe(
        map(j => j.launches.filter(l => l.status === this.status.find(s => s.name === event).id)
        ));
      this.filteredLaunches$ = filteredLaunches;
    } else if (this.filteredCriteria === 'Agencia') {
      const filteredLaunches = this.global.select('launch').pipe(
        map(j => j.launches.filter(l => (!isNullOrUndefined(l.rocket) && !isNullOrUndefined(l.rocket.agencies)
          && l.rocket.agencies.some(n => n.name === event) || l.missions.some(m => !isNullOrUndefined(m.agencies) &&
            m.agencies.some(a => a.name === event)) || l.location.pads.some(p => !isNullOrUndefined(p.agencies) &&
              p.agencies.some(a => a.name === event))))));
      this.filteredLaunches$ = filteredLaunches;
    } else if (this.filteredCriteria === 'Tipo') {
      const filteredLaunches = this.global.select('launch').pipe(
        map(j => j.launches.filter((l => l.missions.some(n => n.typeName === event)))
        ));
      this.filteredLaunches$ = filteredLaunches;

    }
  }

  public onSelectCriteria(event: string) {

    this.filteredCriteria = event;

    if ('Estado' === event) {
      this.filteredLaunchesList$ = this.global.select(j => j.status).pipe(map(j => j.statuses));
    } else if ('Agencia' === event) {
      this.filteredLaunchesList$ = this.global.select(j => j.agency).pipe(map(j => j.agencies));
    } else if ('Tipo' === event) {
      this.filteredLaunchesList$ = this.global.select(j => j.type).pipe(map(j => j.types));
    }
  }

  private getData() {

    this.global.dispatch(new LoadStatuses());
    this.global.dispatch(new LoadLaunches());
    this.global.dispatch(new LoadAgencys());
    this.global.dispatch(new LoadTypes());

  }

}
