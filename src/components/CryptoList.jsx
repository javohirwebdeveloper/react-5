import React from "react";
import CryptoItem from "./CryptoItem";

function CryptoList({ cryptos }) {
  const sortedCryptos = [...cryptos].sort((a, b) => b.price - a.price);

  return (
    <ul>
      {sortedCryptos.map((crypto) => (
        <CryptoItem key={crypto.name} crypto={crypto} />
      ))}
    </ul>
  );
}

export default CryptoList;
