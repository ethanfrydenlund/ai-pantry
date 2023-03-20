import React from 'react';
import styles from '@/styles/Home.module.css'

export default function meal_item({value, onDelete}){
    // parts[0] = name, parts[1] = desc, parts[2] = calories
    const string = value;
    var parts = [];
    if (string){
        parts = string.split(/(Description:|Calories:)/)
    } else {
        parts = ['did', 'not', 'work']
    }
    parts[0] = parts[0].substring(6);
    if (parts[4]){
        parts[4] = parts[4].replace(/[^0-9-]/g, '') || '';
    }
    return (
        <>
            <div className = {styles.meal_container}>
                <div className = {styles.meal_container_header}>
                    <p style={{float: "left"}}><b>{parts[0]}</b></p> 
                    <p style={{float: "right"}}>Calories: {parts[4]}</p>
                    <button className = {styles.normal_button4} onClick = {onDelete}>X</button>
                </div>
                <p style={{clear: "both"}}>Description:{parts[2]}</p>
            </div>
        </>

    )
}