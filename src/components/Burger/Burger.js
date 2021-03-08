import React from 'react';
import classes from './Burger.module.css';

import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const Burger = (props) => {
    let transformedIngerdients = Object.keys(props.ingredients)
        .map(igkey => {
            return [...Array(props.ingredients[igkey])].map((_, i) => {
                return <BurgerIngredient key={igkey + i} type={igkey} />;
            });
        })

        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    console.log(transformedIngerdients);
    if (transformedIngerdients.length === 0) {
        transformedIngerdients = <p>Please start adding ingredients! </p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngerdients}
            <BurgerIngredient type="bread-bottom" />

        </div>
    );
};

export default Burger;