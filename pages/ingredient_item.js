import React from 'react';
import styles from '@/styles/Home.module.css'


export default function Ingredient_item({name, onDelete}){

    return (
        <>
            <div className={styles.ingredient_container}>
                <div className = {styles.indiv_ingredients}>
                    <p>{name}</p>
                    <button className={styles.normal_button3} onClick = {onDelete}>X</button>
                </div>
            </div>
        </>

    )
}