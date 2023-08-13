export const getSavedCandleIds = () => {
  const savedCandleIds = localStorage.getItem('saved_candles')
    ? JSON.parse(localStorage.getItem('saved_candles'))
    : [];

  return savedCandleIds;
};

export const saveCandleIds = (candleIdArr) => {
  if (candleIdArrIdArr.length) {
    localStorage.setItem('saved_candles', JSON.stringify(candleIdArr));
  } else {
    localStorage.removeItem('saved_candles');
  }
};

export const removeCandleId = (candleId) => {
  const savedCandleIds = localStorage.getItem('saved_candles')
    ? JSON.parse(localStorage.getItem('saved_candles'))
    : null;

  if (!savedCandleIds) {
    return false;
  }

  const updatedSavedCandleIds = savedCandleIds?.filter((savedCandleId) => savedCandleId !== candleId);
  localStorage.setItem('saved_candles', JSON.stringify(updatedSavedCandleIds));

  return true;
};
