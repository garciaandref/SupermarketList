import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./DeleteItemButton.module.css";

interface DeleteItemButtonProps {
  onClick: () => void;
}

const DeleteItemButton: React.FC<DeleteItemButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.deleteButton} onClick={onClick}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
};

export default DeleteItemButton;
