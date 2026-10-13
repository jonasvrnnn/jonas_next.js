"use client";
import styles from "./shoppingList.module.css";
import React, { FormEvent, useState } from "react";
import { listItem } from "../types";

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState<listItem[]>([]);
  const [clicked, setClicked] = useState<boolean>(false);
  const [underZero, setUnderZero] = useState<boolean>(true);
  const addItem = (name: string, amount: number) => {
    setShoppingList([...shoppingList, { name, amount }]);
  };

  const removeItem = (name: string) => {
    let shoppingListCpy = shoppingList.filter((i) => i.name != name);
    setShoppingList(shoppingListCpy);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setClicked(true);
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name: string = String(formData.get("name"));
    const quantity: number = Number(formData.get("quantity"));
    if (quantity <= 0) {
      setUnderZero(true);
      console.log("");
    } else {
      setUnderZero(false);
      addItem(name, quantity);
      console.log("Name:", name);
      console.log("quantity:", quantity);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} action="">
      {clicked ? (
        underZero ? (
          <p className={styles.errorMessage}>Quantity must be greater than 0</p>
        ) : (
          <p className={styles.succesMessage}>Item added to list</p>
        )
      ) : (
        ""
      )}
      <div className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            placeholder="Name"
            className={styles.formInput}
            id="name"
            name="name"
            type="text"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            className={styles.formInput}
            id="quantity"
            name="quantity"
            defaultValue={0}
          />
        </div>
      </div>
      <button type="submit">Add</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {shoppingList.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.amount}</td>
              <td>
                <button type="button" onClick={() => removeItem(item.name)}>
                  remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default ShoppingList;
