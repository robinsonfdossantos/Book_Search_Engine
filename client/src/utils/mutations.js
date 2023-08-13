import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_CANDLE = gql`
  mutation saveCandle($candle: CandleInput) {
    saveCandle(candle: $candle) {
      _id
      username
      email
      savedCandles {
        candleId
        candleTitle
        candleSize
        candleColor
        candleScent
        candlePrice
        candleDescription
        candleImage
      }
    }
  }
`;

export const REMOVE_CANDLE = gql`
  mutation RemoveCandle($candleId: String) {
    removeCandle(candleId: $candleId) {
      _id
      username
      email
      savedCandles {
        candleId
        candleTitle
        candleSize
        candleColor
        candleScent
        candlePrice
        candleDescription
        candleImage
      }
    }
  }
`;
