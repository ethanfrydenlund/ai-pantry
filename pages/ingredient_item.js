import React from 'react';
import styles from '@/styles/Home.module.css'


export default function Ingredient_item(ingr){

    return (
        <>
            <div className={styles.ingredient_container}>
                <div className = {styles.indiv_ingredients}>
                    <p>{ingr.name}</p>
                    <button className={styles.normal_button3} onClick = {ingr.delete(ingr.name)}>X</button>
                </div>
            </div>
        </>

    )
}