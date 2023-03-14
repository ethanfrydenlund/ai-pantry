import styles from '@/styles/Home.module.css'
import React from 'react';
import ReactDOM from 'react-dom';
import Ingredient_item from './ingredient_item';
import Meal_item from './meal_item';
import { useState } from "react";

export default function Home() {
  var ingredient_list = [];
  var result_list = [];
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
        body: JSON.stringify({ingredients: ingredient_list}),
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
    result_list.push(result);
    ReactDOM.render(
      <>
        {result_list.map((value) => (<Meal_item value = {result}/>))}
      </>, 
      document.getElementById("response")
      );
  }
  return (
    <>
      <header>
        <h1 className = {styles.headerTxt}>AI Weight</h1>
        <img src="aiweight\public\AI Weight Logo.png"></img>
      </header>
      <div className = {styles.wrapper}>
        <div className = {styles.pantry} id = "pantry">
          <div id = "pantryEntries"></div>
          <div className = {styles.ingredient_entry}>
            <input type="text" id = "ingredient" placeholder="add ingredients here"></input>
            <button className = {styles.normal_button} onClick = {handleIngredient}>+</button>
          </div>
        </div>
        <div className = {styles.meal_section} id = "mealselection">
          <div id = "response"></div>
          <div className = {styles.button_container}>
            <button className = {styles.normal_button2} onClick = {requestChatGPT}> Generate Meal Ideas</button>
          </div>
        </div>
      </div>
    </>
  )
}