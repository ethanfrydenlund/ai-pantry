import styles from '@/styles/Home.module.css'
import React from 'react';
import ReactDOM from 'react-dom';
import Ingredient_item from './ingredient_item';
import Meal_item from './meal_item';
import { useState } from "react";
import Image from 'next/image';

export default function Home() {
  const [ingredientList, setIngredientList] = useState([]);
  const [resultList, setResultList] = useState([]);

  function handleIngredient(){
    var input = document.getElementById("ingredient");
    var inputVal = input.value;
    setIngredientList([...ingredientList, inputVal]);
  }

  async function requestChatGPT(){
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ingredients: ingredientList}),
      });
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      setResultList([...resultList, data.result]);
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  /*function deleteIngredient(ingredient){
    setIngredientList(ingredient);
  }*/

  return (
    <>
      <header>
        <h1 className = {styles.headerTxt}>AI</h1>
        <Image src="/basketlogo.png" alt = "logo" width="60" height="60"/>
        <h1 className = {styles.headerTxt}>Pantry</h1>
      </header>
      <div className = {styles.wrapper}>
        <div className = {styles.pantry} id = "pantry">
          <div id = "pantryEntries">
            {ingredientList.map((value) => (
              < Ingredient_item name={value} key ={value}/>
            ))}
          </div>
          <div className = {styles.ingredient_entry}>
            <input type="text" className = {styles.inputField} id = "ingredient" placeholder="add ingredients here"></input>
            <button className = {styles.normal_button} onClick = {handleIngredient}>+</button>
          </div>
        </div>
        <div className = {styles.meal_section} id = "mealselection">
          <div id = "response">
            {resultList.map((value) => (
              < Meal_item value={value}/>
            ))}
          </div>
          <div className = {styles.button_container}>
            <button className = {styles.normal_button2} onClick = {requestChatGPT}> Generate Meal Ideas</button>
          </div>
        </div>
      </div>
    </>
  )
}