import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApiService } from 'src/app/core/store/api.service';
import { AgencyActionTypes, AgencysLoaded } from './agency.actions';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class AgencyEffects {
  @Effect()
  public load$ = this.actions$
    .pipe(ofType(AgencyActionTypes.LoadAgencys),
      mergeMap(() =>
        this.api
          .getAgencies$()
          .pipe(map(agencies => new AgencysLoaded(agencies)))
      )
    );

  constructor(private actions$: Actions, private api: ApiService) {}
}
