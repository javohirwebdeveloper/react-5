import React from "react";

function CryptoItem({ crypto }) {
  const { name, price, change } = crypto;

  const formattedPrice = price.toFixed(2);
  const formattedChange = change.toFixed(2);

  let color, arrow;
  if (change > 0) {
    color = "green";
    arrow = "↑";
  } else if (change < 0) {
    color = "red";
    arrow = "↓";
  } else {
    color = "black";
    arrow = "";
  }

  return (
    <li>
      <span>{name}</span>
      <span>${formattedPrice}</span>
      <span style={{ color: color }}>
        {arrow}
        {formattedChange}%
      </span>
    </li>
  );
}

export default CryptoItem;
