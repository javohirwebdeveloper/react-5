import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CryptoList from "./components/CryptoList";

const API_URL = "https://min-api.cryptocompare.com/data/price?fsym=";
const API_KEY = "1752b797be94b3be8feb88147accd92f05335bf0d2c69cbab21c175cc96c9a26";

function App() {
  const [cryptos, setCryptos] = useState([
    { name: "BTC", price: 0, change: 0 },
    { name: "ETH", price: 0, change: 0 },
    { name: "LTC", price: 0, change: 0 },
    { name: "DOGE", price: 0, change: 0 },
  ]);

  const fetchData = async (name) => {
    try {
      const response = await fetch(
        `${API_URL}${name}&tsyms=USD&api_key=${API_KEY}`
      );
      const data = await response.json();
      if (data.Response === "Error") {
        alert(data.Message);
      } else {
        setCryptos((prevCryptos) => {
          const index = prevCryptos.findIndex((c) => c.name === name);
          if (index !== -1) {
            const newCryptos = [...prevCryptos];
            const oldPrice = newCryptos[index].price;
            const newPrice = data.USD;
            const change = ((newPrice - oldPrice) / oldPrice) * 100;
            newCryptos[index] = { name, price: newPrice, change };
            return newCryptos;
          } else {
            const newCrypto = { name, price: data.USD, change: 0 };
            return [...prevCryptos, newCrypto];
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (input) => {
    if (input.trim() === "") {
      return;
    } else {
      fetchData(input.toUpperCase());
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      cryptos.forEach((crypto) => {
        fetchData(crypto.name);
      });
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [cryptos]);

  return (
    <div className="App">
      <h1>Crypto Watcher</h1>
      <SearchBar onSearch={handleSearch} />
      <CryptoList cryptos={cryptos} />
    </div>
  );
}

export default App;
