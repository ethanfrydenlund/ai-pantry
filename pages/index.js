import styles from '@/styles/Home.module.css'
import React from 'react';
import ReactDOM from 'react-dom';
import Ingredient_item from './ingredient_item';
import { useState } from "react";

export default function Home() {
  var ingredient_list = [];
  const [result, setResult] = useState();

  function handleIngredient(){
    var input = document.getElementById("ingredient");
    var inputVal = input.value;
    ingredient_list.push(inputVal);
    ReactDOM.render(
    <>
      {ingredient_list.map((value) => (
        < Ingredient_item name={value}/>
      ))}
    </>, 
    document.getElementById("pantryEntries")
    );
  }

  async function requestChatGPT(){
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: ingredient_list}),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
    ReactDOM.render(<p>{result}</p>, document.getElementById("response"));
  }
  return (
    <>
      <div className = {styles.wrapper}>
        <div className = {styles.pantry} id = "pantry">
          <div id = "pantryEntries"></div>
          <div className = {styles.ingredient_entry}>
            <input type="text" id = "ingredient"></input>
            <button className = {styles.normal_button} onClick = {handleIngredient}></button>
          </div>
        </div>
        <div className = {styles.personal_info}></div>
        <div className = {styles.summary}></div>
        <div className = {styles.meal_section}>
          <div id = "response"></div>
          <button className = {styles.normal_button} onClick = {requestChatGPT}></button>
        </div>
      </div>
    </>
  )
}