import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApiService } from 'src/app/core/store/api.service';
import { TypeActionTypes, TypesLoaded } from './type.actions';
import { map, mergeMap } from 'rxjs/operators';


@Injectable()
export class TypeEffects {
  @Effect()
  public load$ = this.actions$
    .pipe(ofType(TypeActionTypes.LoadTypes),
      mergeMap(() =>
        this.api
          .getMissionTypes$()
          .pipe(map(types => new TypesLoaded(types)))
      )
    );

  constructor(private actions$: Actions, private api: ApiService) { }
}
