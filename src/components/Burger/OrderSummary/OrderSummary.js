import React from 'react';
import Auxi from '../../../hoc/auxi';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igkey =>{
            return ( <li key ={igkey}> 
                 <span style ={{textTransform:'capitalize'}}> {igkey} </span> : {props.ingredients[igkey]}
                  </li>)
        });    
    return (
            <Auxi>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                    {ingredientsSummary}
            </Auxi>
        )
};

export default orderSummary;