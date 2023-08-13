import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
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
