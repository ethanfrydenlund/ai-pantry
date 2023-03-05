import React from 'react';
import styles from '@/styles/Home.module.css'

export default function Ingredient_item(ingr){
    
    return (
        <>
            <div className={styles.ingredient_container}>
                <div style={{textAlign: 'center'}}>
                    <p>{ingr.name}</p>
                    <button className={styles.normal_button}>X</button>
                </div>
            </div>
        </>

    )
}