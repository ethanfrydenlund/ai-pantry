import React from 'react';
import { createUseStyles } from 'react-jss';

const styles = createUseStyles({
  container: {
    position: 'relative',
    color: 'black',
    fontSize: '16px',
    background: 'white',
    margin: '15px',
    padding: '10px',
    '&:hover button': {
      opacity: 1,
    },
  },
  header: {
    display: 'inline',
    width: '80%',
  },
  button: {
    position: 'absolute',
    color: '#00C9A7',
    border: '2px solid #00C9A7',
    borderRadius: '20px',
    right: '4%',
    top: '4%',
    backgroundColor: 'white',
    fontSize: '20px',
    transition: 'scale 0.2s, opacity 0.25s', // Combining transitions
    opacity: 0,
    '&:hover': {
      color: '#5C9D8B',
      transform: 'scale(1.025)',
    },
  },
});

export default function meal_item({ value, onDelete }) {
  const classes = styles();

  const string = value;
  let parts = [];
  if (string) {
    parts = string.split(/(Description:|Calories:)/)
  } else {
    parts = ['did', 'not', 'work']
  }
  parts[0] = parts[0].substring(6);
  if (parts[4]) {
    parts[4] = parts[4].replace(/[^0-9-]/g, '') || '';
  }
  if (parts[2]) {
    parts[2] = parts[2].split('- ');
    parts[2].splice(0, 1);
  }
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h3 style={{ display: 'inline-block', color: '#5C9D8B', fontFamily: 'Acme, sans-serif', marginBottom: '0px', marginTop: '10px', marginLeft: '20px' }}>{parts[0]}</h3>
        <p style={{ marginLeft: '20px' }}>Calories: {parts[4]}</p>
        <button className={classes.button} onClick={onDelete}>X</button>
      </div>
      <ul style={{ clear: "both" }}>
        {parts[2].map((value) => (
          <li>{value}</li>
        ))}
      </ul>
    </div>
  )
}