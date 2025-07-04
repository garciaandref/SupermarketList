// src/components/AddItemForm.tsx
"use client";

import React, { useState } from "react";
import styles from "./AddItemForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface AddItemFormProps {
  onAddItem: (name: string, quantity: number) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemName.trim() !== "") {
      onAddItem(itemName, itemQuantity);
      setItemName("");
      setItemQuantity(1);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Item name"
      />
      <input
        type="number"
        value={itemQuantity}
        onChange={(e) => setItemQuantity(Number(e.target.value))}
        min="1"
        placeholder="Quantity"
      />
      <button type="submit">
        <FontAwesomeIcon icon={faPlus} />
        Add
      </button>
    </form>
  );
};

export default AddItemForm;
