import React , {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from "../../../axios-orders";
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
                name:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: ''
                },
                street: {
                    
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Street'
                        },
                        value: ''
                    
                },
                Zipcode: {
                   
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'ZIP Code'
                        },
                        value: ''
                   
                },
                Country: {
                  
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Country'
                        },
                        value: ''
                  
                },              
                email:{
                    
                        elementType: 'input',
                        elementConfig: {
                            type: 'email',
                            placeholder: 'Your E-Mail'
                        },
                        value: ''
                    
                },           
                deliverymethod:  {
                   
                        elementType: 'select',
                        elementConfig: {
                           options: [
                               {value: 'fastest',displayvalue: 'Fastest'},
                               {value: 'cheapest',displayvalue: 'Cheapest'}
                            ]
                        },
                        value: ''
                    
                },
        },
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault();
      //  alert('You Continue ..!');
        this.setState({ loading:true});
        const order ={
            ingredients: this.props.ingredients,
            price:this.props.price,
           
        }
        axios.post('/orders.json', order)
            .then(response => {
                // return console.log(response);
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error =>{
                // return console.log(error);
                this.setState({ loading: false})
            });
    }

    inputChangedHandler = (event, inputIdentifier) =>{
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({ orderForm : updatedOrderForm});
    }

    render() {
        const formElementsArray = [];
        for( let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
         //  console.log(formElementsArray.id,"formelement")
        }
        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input                    
                    key={formElement.id}
                     elementType={formElement.config.elementType}
                     elementConfig={formElement.config.elementConfig}
                     value= {formElement.config.value} 
                     changed={(event)=> this.inputChangedHandler(event,formElement.id) } />
                     
            ))}
                <Button btnType="Success" clicked={this.orderHandler} >ORDER</Button>
            </form>

        );
        if(this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                    {form}
               
            </div>
        );
    }
}

export default ContactData;