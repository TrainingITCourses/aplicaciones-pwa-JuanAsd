import { routerReducer, RouterReducerState} from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromStatus from './status/status.reducer';
import * as fromAgency from './agency/agency.reducer';
import * as fromType from './type/type.reducer';
import * as fromLaunch from './launch/launch.reducer';

export interface GlobalState {
  router: RouterReducerState;
  status: fromStatus.StatusState;
  agency: fromAgency.AgenciesState;
  type: fromType.TypesState;
  launch: fromLaunch.LaunchesState;
}

export const reducers: ActionReducerMap<GlobalState> = {
  router: routerReducer,
  status: fromStatus.reducer,
  agency: fromAgency.reducer,
  type: fromType.reducer,
  launch: fromLaunch.reducer
};


export const metaReducers: MetaReducer<GlobalState>[] = !environment.production ? [] : [];
