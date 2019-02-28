import { TypeActionTypes, TypeActions } from './type.actions';


export interface TypesState {
  types: any;
}

export const initialState: TypesState = {
  types: []
};

export function reducer(state = initialState, action: TypeActions): TypesState {
  switch (action.type) {
    case TypeActionTypes.LoadTypes:
      return state;
    case TypeActionTypes.TypesLoaded:
      return { types: action.payload };
    default:
      return state;
  }
}
