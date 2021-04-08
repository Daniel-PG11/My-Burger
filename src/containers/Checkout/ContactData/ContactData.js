import React , {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from "../../../axios-orders";

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault();
        alert('You Continue ..!');
        this.setState({ loading:true});
        const order ={
            ingredients: this.props.ingredients,
            price:this.props.price,
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
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error =>{
                // return console.log(error);
                this.setState({ loading: false})
            });
    }
    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name ="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name ="email" placeholder="Mail" />
                <input className={classes.Input} type="text" name ="street" placeholder="Street" />
                <input className={classes.Input} type="text" name ="postal" placeholder="Postal Code" />
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