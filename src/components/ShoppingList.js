import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function fetchItems() {
      const response = await fetch("/api/items");
      const data = await response.json();
      if (isMounted) setItems(data);
    }
    fetchItems();
    return () => {
      isMounted = false;
    };
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function addItem(name, category) {
    const newItem = { id: Date.now(), name, category, isInCart: false };
    setItems([...items, newItem]);
  }

  function deleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function toggleInCart(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isInCart: !item.isInCart } : item
      )
    );
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm addItem={addItem} />
      <Filter category={selectedCategory} onCategoryChange={handleCategoryChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onToggleInCart={() => toggleInCart(item.id)}
            onDelete={() => deleteItem(item.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
