"use client";

import React, { useState, useEffect } from "react";
import { Item } from "@/types/item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./list.module.css";
import { useRouter } from "next/navigation";
import DeleteItemButton from "@/components/DeleteItemButton";

export default function List() {
  const [items, setItems] = useState<Item[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Carrega os itens do localStorage
    const savedItems = localStorage.getItem("shoppingList");
    setItems(savedItems ? JSON.parse(savedItems) : []);
  }, []);

  const handleItemCheck = (id: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
    localStorage.setItem("shoppingList", JSON.stringify(updatedItems));
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("shoppingList", JSON.stringify(updatedItems));
  };

  const handleGoBack = () => {
    router.push("/register");
  };

  const activeItems = items.filter((item) => !item.checked);
  const inactiveItems = items.filter((item) => item.checked);

  return (
    <div className="container">
      <h1>Lista de Compras</h1>
      <button className={styles.backButton} onClick={handleGoBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
        Adicionar Mais Itens
      </button>
      <h2>Produtos</h2>
      <ul>
        {activeItems.map((item) => (
          <li key={item.id} className={styles.listItem}>
            <label>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleItemCheck(item.id)}
              />
              <span>
                {item.name} ({item.quantity})
              </span>
            </label>
            <DeleteItemButton onClick={() => handleDeleteItem(item.id)} />
          </li>
        ))}
      </ul>

      <h2>Produtos no Carrinho</h2>
      <ul>
        {inactiveItems.map((item) => (
          <li key={item.id} className={`${styles.listItem} ${styles.inactive}`}>
            <label>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleItemCheck(item.id)}
              />
              <span>
                {item.name} ({item.quantity})
              </span>
            </label>
            <DeleteItemButton onClick={() => handleDeleteItem(item.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
