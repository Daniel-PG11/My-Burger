import React, { Component } from 'react';
import Auxi from '../../hoc/auxi';
import styles from './layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    
    state ={
        showSideDrawer:false
    }
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false})
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState)=>{
          return{ showSideDrawer:!prevState.showSideDrawer}
        })
    }
    render() {
        return (
            <Auxi>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer}
                 closed={this.sideDrawerClosedHandler} />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Auxi>
        )
    }
}

export default Layout;