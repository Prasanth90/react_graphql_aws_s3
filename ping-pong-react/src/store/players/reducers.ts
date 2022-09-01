import { IPlayersState } from '../index';
import { AppAction } from './actions';

export function reducer(currentState: IPlayersState, action: AppAction): IPlayersState {
  if (action.type === 'PLAYERS_FETCH') {
    return {
      ...currentState,
      isLoading: true,
      isRequestFailed: false,
    };
  }

  if (action.type === 'PLAYERS_FETCH_SUCCESS') {
    return {
      ...currentState,
      errorMessage: '',
      errorCode: undefined,
      isLoading: false,
      isRequestFailed: false,
      players: action.players,
    };
  }

  if (action.type === 'PLAYERS_FETCH_ERROR') {
    return {
      ...currentState,
      isLoading: false,
      errorMessage: action.errorMessage,
      errorCode: action.errorCode,
      isRequestFailed: action.isRequestFailed,
    };
  }

  return currentState;
}
