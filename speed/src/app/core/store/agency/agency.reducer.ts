import { AgencyActions, AgencyActionTypes } from './agency.actions';


export interface AgenciesState {
  agencies: any;
}

export const initialState: AgenciesState = {
  agencies: []
};

export function reducer(state = initialState, action: AgencyActions): AgenciesState {
  switch (action.type) {
    case AgencyActionTypes.LoadAgencys:
      return state;
    case AgencyActionTypes.AgencysLoaded:
      return { agencies: action.payload };
    default:
      return state;
  }
}
