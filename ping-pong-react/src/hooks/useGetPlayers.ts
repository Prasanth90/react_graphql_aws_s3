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

  const getPlayers = async () => {
    try {
      setLoading(true);
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

      console.log(response);
      setData(response.data.data.playersWithRank);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };
  return { getPlayers, data, loading, error };
};
