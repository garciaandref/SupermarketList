"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Item } from "@/types/item";
import { useRouter } from "next/navigation";
import styles from "./register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DeleteItemButton from "@/components/DeleteItemButton";

export default function Register() {
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const router = useRouter();
  const [previewItems, setPreviewItems] = useState<Item[]>([]);

  const handleAddItem = () => {
    if (itemName.trim() !== "") {
      const newItem: Item = {
        id: uuidv4(),
        name: itemName,
        quantity: itemQuantity,
        checked: false,
      };
      setPreviewItems([...previewItems, newItem]);
      setItemName("");
      setItemQuantity(1);
    }
  };

  const handleItemDelete = (id: string) => {
    const updatedItems = previewItems.filter((item) => item.id !== id);
    setPreviewItems(updatedItems);
  };

  const handleDone = () => {
    localStorage.setItem("shoppingList", JSON.stringify(previewItems));
    router.push("/list");
  };

  return (
    <div className="container">
      <h1>Adicione os Produtos</h1>
      <div className={styles.form}>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Produto"
        />
        <input
          type="number"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(Number(e.target.value))}
          min="1"
          placeholder="Quantidade"
        />
        <button onClick={handleAddItem}>
          <FontAwesomeIcon icon={faPlus} />
          Adicionar Produto
        </button>
      </div>

      <h2>Lista de Itens</h2>
      <ul className={styles.previewList}>
        {previewItems.map((item) => (
          <li key={item.id} className={styles.previewItem}>
            <span>
              {item.name} ({item.quantity})
            </span>
            <DeleteItemButton onClick={() => handleItemDelete(item.id)} />
          </li>
        ))}
      </ul>

      <button className={styles.doneButton} onClick={handleDone}>
        Concluir Lista
      </button>
    </div>
  );
}
