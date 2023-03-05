import styles from '@/styles/Home.module.css'
export default function Home() {
  function handleIngredient(){
    var input = document.getElementById("ingredient");
    var inputVal = input.value;
    var pantry = document.getElementById("pantry");
    var text = document.createElement("p");
    text.textContent = inputVal;
    pantry.appendChild(text);
  }
  return (
    <>
      <div className = {styles.wrapper}>
        <div className = {styles.pantry} id = "pantry">
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