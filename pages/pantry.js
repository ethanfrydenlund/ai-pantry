import React from 'react';
import Ingredient_item from '/components/ingredient_item';
import Meal_item from '../components/meal_item';
import { useState } from "react";
import Image from 'next/image';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Zoom from '@mui/material/Zoom';
import { TransitionGroup } from 'react-transition-group';
import { Ring } from '@uiball/loaders';
import { DotPulse } from '@uiball/loaders';
import { createUseStyles } from 'react-jss';

const styles = createUseStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  headerTxt: {
    fontSize: '60px',
    margin: '0px',
  },
  accountContainer: {
    display: 'flex',
    marginLeft: 'auto',
    alignItems: 'center',
    borderRadius: '4px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  button1: {
    backgroundColor: 'white',
    border: '4px solid #00C9A7',
    borderRadius: '4px',
    color: '#00C9A7',
    fontSize: '18px',
    fontWeight: '600',
    transform: 'scale(1)', // Note: 'scale' should be 'transform'
    transition: 'transform 0.2s',
    padding: '10px',
    marginLeft: '10px',
    '&:hover': {
      border: '4px solid #5C9D8B',
      scale: 1.025,
    },
  },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '140px 140px 140px',
    gap: '30px',
    width: '80%',
    margin: 'auto',
    marginTop: '25px',
  },
  pantry: {
    position: 'relative',
    gridColumn: '2',
    gridRow: '1 / 4',
    border: '4px solid #00C9A7',
    borderRadius: '10px',
    flex: '1',
    backgroundColor: '#E8F3F1',
    overflowY: 'auto',
  },
  mealSection: {
    position: 'relative',
    gridColumn: '1',
    gridRow: '1 / 4',
    border: '4px solid #00C9A7',
    borderRadius: '10px',
    flex: '1',
    backgroundColor: '#E8F3F1',
    overflowY: 'auto',
  },
  buttonContainer: {
    position: 'relative',
    margin: '0 auto',
    marginTop: '-15px',
    border: 'none',
  },
  button2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '200px',
    height: '35px',
    backgroundColor: '#00C9A7',
    border: '4px solid #00C9A7',
    borderRadius: '4px',
    color: 'white',
    fontSize: '18px',
    fontWeight: '600',
    transform: 'scale(1)', // Note: 'scale' should be 'transform'
    transition: 'transform 0.2s',
    '&:hover': {
      backgroundColor: '#5C9D8B',
      border: '4px solid #5C9D8B',
      scale: 1.025,
    },
  },
  ingredientEntry: {
    position: 'relative',
    margin: '0 auto',
    marginTop: '-15px',
    border: 'none',
  },
  inputField: {
    height: '30px',
    border: '3px solid #00C9A7',
    borderRadius: '4px',
    outline: 'none',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: '600',
    color: 'gray',
  },
  button3: {
    width: '35px',
    height: '35px',
    backgroundColor: '#00C9A7',
    border: '4px solid #00C9A7',
    borderRadius: '4px',
    color: 'white',
    marginLeft: '5px',
    fontSize: '18px',
    fontWeight: '600',
    transform: 'scale(1)', // Note: 'scale' should be 'transform'
    transition: 'transform 0.2s',
    '&:hover': {
      backgroundColor: '#5C9D8B',
      border: '4px solid #5C9D8B',
      scale: 1.025,
    },
  },
});

export default function Home() {
  const classes = styles();
  const { data: session, update: sessionUpdate } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);


  const [ingredientList, setIngredientList] = useState(session?.user.ingredients || []);
  const [resultList, setResultList] = useState(session?.user.recipes || []);
  const [ingredient, setIngredient] = useState("");
  const [mealButton, setMealButton] = useState(false);
  const [saveButton, setSaveButton] = useState(false);

  let ingredientID = 0;
  let mealID = 0;

  function handleIngredient() {
    let input = document.getElementById("ingredient");
    let inputVal = input.value;
    setIngredientList([...ingredientList, inputVal]);
    setIngredient("");
  }

  async function requestChatGPT() {
    // if there are less than 3 ingredients, open a modal that says you need more ingredients
    if (ingredientList.length < 3) {
      alert("You need at least 3 ingredients in your pantry to request a recipie");
      return;
    }
    setMealButton(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: ingredientList }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      setResultList([data.result, ...resultList]);
      setMealButton(false);
    } catch (error) {
      setMealButton(false);
      console.error(error);
      alert(error.message);
    }
  }

  async function updatePantry() {
    setSaveButton(true);
    sessionUpdate(
      {
        user: {
          ingredients: ingredientList,
          recipes: resultList,
        }
      });
    try {
      const response = await fetch("/api/updatePantry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: ingredientList, recipes: resultList, id: session?.user.id }),
      });
      const data = await response.json();
      setTimeout(function () {
        setSaveButton(false);
      }, 1000);
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      setSaveButton(false);
      console.error(error);
      alert(error.message);
    }
  }

  const handleDelete = (value) => {
    setIngredientList((ingredientList) => {
      let newItems = [...ingredientList];
      newItems = newItems.filter(name => name != value);
      return newItems;
    });
  };

  const handleDeleteMeal = (value) => {
    setResultList((resultList) => {
      let newItems = [...resultList];
      newItems = newItems.filter(name => name != value);
      return newItems;
    });
  };

  return (
    <>
      <header className={classes.header}>
        <h1 className={classes.headerTxt}>AI</h1>
        <Image src="/basketlogo.png" alt="logo" width="60" height="60" />
        <h1 className={classes.headerTxt}>Pantry</h1>
        <div className={classes.accountContainer}>
          <h1 style={{ marginRight: '10px' }}>{session?.user.username}</h1>
          <button className={classes.button1} onClick={updatePantry}>{saveButton ? <Ring color='#00C9A7' size={20} style={{ margin: '0 auto' }} /> : 'Save'}</button>
          <button className={classes.button1} onClick={() => signOut()}>Sign out</button>
        </div>
      </header>
      <div className={classes.wrapper}>
        <div className={classes.pantry} id="pantry">
          <div id="pantryEntries">
            <TransitionGroup>
              {ingredientList.map((value) => (
                <Zoom key={value} in={true} timeout={500}>
                  <div style={{ display: 'inline-block' }}>
                    <Ingredient_item name={value} key={ingredientID++} onDelete={() => handleDelete(value)} />
                  </div>
                </Zoom>
              ))}
            </TransitionGroup>
          </div>
        </div>
        <div className={classes.mealSection} id="mealselection">
          <div id="response">
            <TransitionGroup>
              {resultList.map((value) => (
                <Zoom key={value} in={true} timeout={500}>
                  <div>
                    <Meal_item value={value} key={mealID++} onDelete={() => handleDeleteMeal(value)} />
                  </div>
                </Zoom>
              ))}
            </TransitionGroup>
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <button className={classes.button2} onClick={requestChatGPT}> {mealButton ? <DotPulse color='white' style={{ margin: '0 auto' }} /> : 'Generate Meal Idea'}</button>
        </div>
        <div className={classes.ingredientEntry}>
          <input type="text" className={classes.inputField} id="ingredient" placeholder="add ingredients here" value={ingredient} onChange={(event) => setIngredient(event.target.value)}></input>
          <button className={classes.button3} onClick={handleIngredient}>+</button>
        </div>
      </div>
    </>
  )
}