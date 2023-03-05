import styles from '@/styles/Home.module.css'
import React from 'react';
import ReactDOM from 'react-dom';
import Ingredient_item from './ingredient_item';

export default function Home() {
  function handleIngredient(){
    var input = document.getElementById("ingredient");
    var inputVal = input.value;
    ReactDOM.render(< Ingredient_item name={inputVal}/>, document.getElementById("pantryEntries"));
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
        <div className = {styles.meal_section}></div>
      </div>
    </>
  )
}