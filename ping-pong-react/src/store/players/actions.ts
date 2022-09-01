import axios from 'axios';
import { Action } from 'redux';
import { IAppThunkAction } from '..';
import { IPlayer } from '../../hooks/useGetPlayers';

export interface IActionPlayersFetch extends Action {
  type: 'PLAYERS_FETCH';
}

export interface IActionPlayersFetchSuccess extends Action {
  type: 'PLAYERS_FETCH_SUCCESS';
  players: IPlayer[];
}

export interface IActionPLayersFetchError extends Action {
  type: 'PLAYERS_FETCH_ERROR';
  errorMessage?: string;
  errorCode?: number;
  isRequestFailed?: boolean;
}

export type AppAction = IActionPlayersFetch | IActionPlayersFetchSuccess | IActionPLayersFetchError;

export interface IActionCreators {
  getAllPlayers: () => IAppThunkAction<AppAction>;
}

export const actionCreators: IActionCreators = {
  getAllPlayers: (): IAppThunkAction<AppAction> => async (dispatch, getState) => {
    dispatch({
      type: 'PLAYERS_FETCH',
    });

    try {
      const response = await axios({
        url: 'https:serverless.staara.ca/graphql',
        method: 'post',
        data: {
          query: `
                    query GetPlayersWithRank {
                        playersWithRank {
                            firstName
                            lastName
                            playerId
                            wins
                            losses
                        }
                    }
                    `,
        },
      });
      dispatch({
        type: 'PLAYERS_FETCH_SUCCESS',
        players: response.data.data.playersWithRank,
      });
    } catch (e: any) {
      dispatch({
        type: 'PLAYERS_FETCH_ERROR',
        errorMessage: e.message,
        errorCode: e.code,
        isRequestFailed: true,
      });
    }
  },
};
