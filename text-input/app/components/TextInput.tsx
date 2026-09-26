"use client";
import styles from "./textInput.module.css";
import { TextInputProps } from "../types";

const TextInput = ({ size }: TextInputProps) => {
  return (
    <div className={styles.squares}>
      {Array.from({ length: size }).map((_, index) => (
        <input
          onChange={(event) =>
            alert(
              `textbox ${index + 1} is veranderd naar ${event.target.value}`,
            )
          }
          className={styles.square}
          key={index}
        ></input>
      ))}
    </div>
  );
};

export default TextInput;
