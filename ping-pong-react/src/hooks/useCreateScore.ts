import axios from 'axios';
import * as React from 'react';
import { print } from 'graphql';
import gql from 'graphql-tag';

const CREATE_RESULT = gql`
  mutation AddMatchResult($playerOneId: String!, $playerTwoId: String!, $winnerId: String!) {
    addMatchResult(playerOneId: $playerOneId, playerTwoId: $playerTwoId, winnerId: $winnerId) {
      playerOneId
      playerTwoId
      winnerId
    }
  }
`;

export interface IResult {
  playerOneId: string;
  playerTwoId: string;
  winnerId: string;
}

export const useCreateScore = () => {
  const [data, setData] = React.useState<IResult>();
  const [loading, setLoading] = React.useState<boolean>();
  const [error, setError] = React.useState<any>();

  const create = async (playerOneId: string, playerTwoId: string, winnerId: string) => {
    try {
      setLoading(true);
      const response = await axios.post('https:serverless.staara.ca/graphql', {
        query: print(CREATE_RESULT),
        variables: {
          playerOneId: playerOneId,
          playerTwoId: playerTwoId,
          winnerId: winnerId,
        },
      });
      setData(response?.data?.data?.addMatchResult);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };
  return { create, data, loading, error };
};
