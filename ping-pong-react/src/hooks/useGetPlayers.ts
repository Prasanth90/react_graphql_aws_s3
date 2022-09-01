import axios from 'axios';
import * as React from 'react';

export interface IPlayer {
  firstName: string;
  lastName: string;
  playerId: string;
  wins: number;
  losses: number;
}

export const useGetPlayers = () => {
  const [data, setData] = React.useState<IPlayer[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<any>();

  const getPlayers = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: 'https://serverless.staara.ca/graphql',
        method: 'post',
        data: {
          query: `
                  query GetPlayers {
                      players {
                          firstName
                          lastName
                          playerId
                      }
                  }
                  `,
        },
      });

      console.log(response, 'Hello');
      setData(response.data.data.players);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  }, []);
  return { getPlayers, data, loading, error };
};
