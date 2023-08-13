import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";

import Auth from "../utils/auth";
import { removeCandleId } from "../utils/localStorage";
import { GET_ME } from "../utils/queries";
import { REMOVE_CANDLE } from "../utils/mutations";

const SavedCandles = () => {
  const { data, loading, error } = useQuery(GET_ME, {
    onError: (err) => {
      console.log(err);
    },
  });

  const userData = data?.me;

  const [removeCandle] = useMutation(REMOVE_CANDLE);

  // create function that accepts the candle's mongo _id value as param and deletes the candle from the database
  const handleDeleteCandle = async (candleId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await removeCandle({
        variables: { candleId },
      });

      // upon success, remove candle's id from localStorage
      removeCandleId(candleId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userData || loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved candles!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedCandles.length
            ? `Viewing ${userData.savedCandles.length} saved ${
                userData.savedCandles.length === 1 ? "candle" : "candles"
              }:`
            : "You have no saved candles!"}
        </h2>
        <Row>
          {userData.savedCandles.map((candle) => {
            return (
              <Col md="4">
                <Card key={candle.candleId} border="dark">
                  {candle.image ? (
                    <Card.Img
                      src={candle.image}
                      alt={`The cover for ${candle.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{candle.title}</Card.Title>
                    <p className="small">Authors: {candle.authors}</p>
                    <Card.Text>{candle.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteCandle(candle.candleId)}
                    >
                      Delete this Candle!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedCandles;
