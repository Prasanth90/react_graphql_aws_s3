import { Action } from 'redux';
import { reducer as playersReducer } from './players/reducers';
import { IPlayer } from '../hooks/useGetPlayers';

export interface IApplicationState {
  playersState: IPlayersState;
}

export interface IPlayersState {
  isLoading: boolean;
  players: IPlayer[];
  errorMessage?: string;
  errorCode?: number;
  isRequestFailed?: boolean;
}

export const defaultPlayersState: IPlayersState = {
  isLoading: false,
  players: [],
  errorMessage: '',
};

export const defaultApplicationState: IApplicationState = {
  playersState: defaultPlayersState,
};

export function mainReducer(state: IApplicationState = defaultApplicationState, action: Action) {
  return {
    playersState: playersReducer(state.playersState, action),
  };
}

export interface IAppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => IApplicationState): void;
}
