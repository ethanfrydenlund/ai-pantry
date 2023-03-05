import React from 'react';
import styles from '@/styles/Home.module.css'

export default function Ingredient_item(ingr){
    // <button className={styles.normal_button}>X</button>
    return (
        <>
            <div className={styles.ingredient_container}>
                <div className = {styles.indiv_ingredients}>
                    <p>{ingr.name}</p>
                </div>
            </div>
        </>

    )
}