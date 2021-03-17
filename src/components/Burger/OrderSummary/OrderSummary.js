import React, { Component } from 'react';
import Auxi from '../../../hoc/Auxi/auxi';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //This could be a functiional Component,doesn't have to be a class
    componentDidUpdate() {
        console.log("Order Summary Update")
    }
    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(igkey => {
                return (<li key={igkey}>
                    <span style={{ textTransform: 'capitalize' }}> {igkey} </span> : {this.props.ingredients[igkey]}
                </li>)
            });
        return (
            <Auxi>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientsSummary}</ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button
                    btnType="Danger"
                    clicked={this.props.purchaseCanceled}
                >CANCEL</Button>
                <Button
                    btnType="Success"
                    clicked={this.props.purchaseContinued}
                >CONTINUE</Button>
            </Auxi>
        );
    }
};

export default OrderSummary;