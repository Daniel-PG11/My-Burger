import React, { Component } from "react";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/Buildcontrols';
import Auxi from '../../hoc/Auxi/auxi';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from "../../axios-orders";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //         this.state= {
    //    {...}
    //         }
    //     }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    updatePurchasedState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 })
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = priceAddition + oldPrice;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchasedState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchasedState(updatedIngredients)
    }
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    purchaseContinueHandler = () => {
        // alert('You Continue ..!');
        this.setState({ loading:true});
        const order ={
            ingredients: this.state.ingredients,
            price:this.state.totalPrice,
            customer: {
                name:'Daniel',
                address: {
                    street: 'Teststreet',
                    Zipcode:'74627',
                    Country: 'India'
                },
                email:'test@test.com'
            },
            deliverymethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                // return console.log(response);
                this.setState({ loading: false , purchasing:false})
            })
            .catch(error =>{
                // return console.log(error);
                this.setState({ loading: false, purchasing:false})
            });
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        let orderSummary =  <OrderSummary ingredients={this.state.ingredients}
              purchaseCanceled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}
              price={this.state.totalPrice}
                 />
        if(this.state.loading){
            orderSummary = <Spinner />
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Auxi>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                   {orderSummary}
                </Modal>
                <div> <Burger ingredients={this.state.ingredients} /></div>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientremoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Auxi>
        );
    }

}

export default withErrorHandler(BurgerBuilder,axios);