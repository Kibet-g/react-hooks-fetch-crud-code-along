import React, { useState } from "react";

function Item({ item, onToggleInCart, onDelete }) {
  return (
    <li>
      <span>{item.name}</span> - <span>{item.category}</span>
      <button onClick={onToggleInCart}>
        {item.isInCart ? "Remove from Cart" : "Add to Cart"}
      </button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}

export default Item;
