import React from 'react';
import Auxi from '../../../hoc/auxi';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igkey => {
            return (<li key={igkey}>
                <span style={{ textTransform: 'capitalize' }}> {igkey} </span> : {props.ingredients[igkey]}
            </li>)
        });
    return (
        <Auxi>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            {ingredientsSummary}
            <Button
            btnType = "Danger"
            clicked= {props.purchaseCanceled}
            >CANCEL</Button>
            <Button
            btnType = "Success"
            clicked = {props.purchaseContinued}
            >CONTINUE</Button>
        </Auxi>
    )
};

export default orderSummary;