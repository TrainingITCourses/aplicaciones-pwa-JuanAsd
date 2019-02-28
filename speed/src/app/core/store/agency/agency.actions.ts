import { Action } from '@ngrx/store';

export enum AgencyActionTypes {
  LoadAgencys = '[Agency] Load Agencys',
  AgencysLoaded = '[Agency] Agencys Loaded'
}

export class LoadAgencys implements Action {
  readonly type = AgencyActionTypes.LoadAgencys;
}

export class AgencysLoaded implements Action {
  readonly type = AgencyActionTypes.AgencysLoaded;
  constructor(readonly payload: any[]) {}
}

export type AgencyActions = LoadAgencys | AgencysLoaded;
