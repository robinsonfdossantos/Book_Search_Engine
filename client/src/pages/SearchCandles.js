import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

import Auth from "../utils/auth";
import { searchGoogleCandles } from "../utils/API";
import { saveCandleIds, getSavedCandleIds } from "../utils/localStorage";
import { useMutation } from "@apollo/client";
import { SAVE_CANDLE } from "../utils/mutations";

const SearchCandles = () => {
  // create state for holding returned google api data
  const [searchedCandles, setSearchedCandles] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create state to hold saved candleId values
  const [savedCandleIds, setSavedCandleIds] = useState(getSavedCandleIds());

  const [saveCandle] = useMutation(SAVE_CANDLE);

  // set up useEffect hook to save `savedCandleIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveCandleIds(savedCandleIds);
  });

  // create method to search for candles and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleCandles(searchInput);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { items } = await response.json();

      const candleData = items.map((candle) => ({
        candleId: candle.id,
        authors: candle.volumeInfo.authors || ["No author to display"],
        title: candle.volumeInfo.title,
        description: candle.volumeInfo.description,
        image: candle.volumeInfo.imageLinks?.thumbnail || "",
      }));

      setSearchedCandles(candleDataData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a candle to our database
  const handleSaveCandle = async (candleId) => {
    // find the candle in `searchCandles` state by the matching id
    const candleToSave = searchedCandles.find((candle) => candle.candleId === candleId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveCandle({
        variables: {
          candleId: candleIdToSave,
        },
      });

      // if candle successfully saves to user's account, save candle id to state
      setSavedCandleIds([...savedCandleIds, candleIdToSave.candleId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Candles!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a candle"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className="pt-5">
          {searchedCandles.length
            ? `Viewing ${searchedCandles.length} results:`
            : "Search for a candle to begin"}
        </h2>
        <Row>
          {searchedCandles.map((candle) => {
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
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedCandleIds?.some(
                          (savedCandleId) => savedCandleId === candle.candleId
                        )}
                        className="btn-block btn-info"
                        onClick={() => handleSaveCandle(candle.candleId)}
                      >
                        {savedCandleIds?.some(
                          (savedCandleId) => savedCandleId === candle.candleId
                        )
                          ? "This candle has already been saved!"
                          : "Save this Candle!"}
                      </Button>
                    )}
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

export default SearchCandles;
