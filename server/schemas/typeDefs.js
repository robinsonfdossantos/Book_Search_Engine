const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Candle {
    candleId: String!
    candleTitle: String!
    candleSize: String!
    candleColor: String!
    candleScent: String!
    candlePrice: String!
    candleDescription: String!
    candleImage: String!
  }

  type User {
    _id: ID
    username: String
    email: String
    savedCandles: [Candle]!
  }


  type Auth {
    token: ID!
    user: User
  }

  input CandleInput {
    candleId: String!
    candleTitle: String!
    candleSize: String!
    candleColor: String!
    candleScent: String!
    candlePrice: String!
    candleDescription: String!
    candleImage: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveCandle(candle: CandleInput): User
    removeCandle(candleId: String): User
  }
`;

module.exports = typeDefs;
