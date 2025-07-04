// src/components/ItemList.tsx
"use client";

import React from "react";
import { Item } from "../types/item";
import styles from "./ItemList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

interface ItemListProps {
  items: Item[];
  onItemCheck: (id: string) => void;
  onItemDelete: (id: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({
  items,
  onItemCheck,
  onItemDelete,
}) => {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <motion.li
          key={item.id}
          className={styles.listItem}
          layout
          transition={{ duration: 0.2 }}
        >
          <label>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => onItemCheck(item.id)}
            />
            <span>
              {item.name} ({item.quantity})
            </span>
          </label>
          <button
            className={styles.deleteButton}
            onClick={() => onItemDelete(item.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
            Delete
          </button>
        </motion.li>
      ))}
    </ul>
  );
};

export default ItemList;
