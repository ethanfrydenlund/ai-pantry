import React from 'react';
import { createUseStyles } from 'react-jss';

const styles = createUseStyles({
  container: {
    position: 'relative',
    display: 'inline-block',
    margin: '15px',
    backgroundColor: 'white',
    border: '2px solid #00C9A7',
    borderRadius: '10px',
    '&:hover': {
      '& p': {
        transition: 'opacity 0.25s',
        opacity: '0.3',
      },
      '& button': {
        transition: 'opacity 0.25s',
        opacity: '1',
      },
    },
  },
  indivdualIngredient: {
    textAlign: 'center',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingBottom: '5px',
    margin: '4px',
    marginBottom: '2px',
    fontSize: '20px',
    transition: 'opacity 0.25s',
    '& > *': {
      display: 'inline',
    },
  },
  deleteButton: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#5C9D8B',
    border: 'none',
    background: 'transparent',
    fontSize: '20px',
    fontWeight: 600,
    opacity: 0,
    transition: 'scale 1s, opacity 0.25s',
    '&:hover': {
      scale: 1.025,
      opacity: 1,
    },
  },
});

export default function Ingredient_item({ name, onDelete }) {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.indivdualIngredient}>
        <p style={{ transition: 'opacity 0.25s' }}>{name}</p>
        <button className={classes.deleteButton} onClick={onDelete}>X</button>
      </div>
    </div>
  )
}