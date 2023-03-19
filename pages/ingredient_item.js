import React from 'react';
import styles from '@/styles/Home.module.css'


export default function Ingredient_item(props){

    return (
        <>
            <div className={styles.ingredient_container}>
                <div className = {styles.indiv_ingredients}>
                    <p>{props.name}</p>
                    <button className={styles.normal_button3}>X</button>
                </div>
            </div>
        </>

    )
}