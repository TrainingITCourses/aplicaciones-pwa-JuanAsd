import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApiService } from 'src/app/core/store/api.service';
import { map, mergeMap } from 'rxjs/operators';
import { StatusActionTypes, StatusesLoaded } from './status.actions';

@Injectable()
export class StatusEffects {
  @Effect()
  public load$ = this.actions$
    .pipe(ofType(StatusActionTypes.LoadStatuses),
      mergeMap(() =>
        this.api
          .getStatusTypes$()
          .pipe(map(statuses => new StatusesLoaded(statuses)))
      )
    );

  constructor(private actions$: Actions, private api: ApiService) {}
}
