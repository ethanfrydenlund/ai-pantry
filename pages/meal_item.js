import React from 'react';
import styles from '@/styles/Home.module.css'

export default function meal_item(info){
    // parts[0] = name, parts[1] = desc, parts[2] = calories
    const string = info.value;
    var parts = [];
    if (string){
        parts = string.split(/(Description:|Calories:)/)
    } else {
        parts = ['did', 'not', 'work']
    }
    return (
        <>
            <div className = {styles.meal_container}>
                <p>{parts[0]}</p>
                <p>Description:{parts[2]}</p>
                <p>Calories:{parts[4]}</p>
            </div>
        </>

    )
}