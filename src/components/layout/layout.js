import React from'react';
import Auxi from '../../hoc/auxi';
import styles from './layout.module.css'

const layout = (props) =>
(
    <Auxi>
    <div>
        Toolbar,Sidedrawer, Backdrop
    </div>
    <main className = {styles.Content}>
        {props.children}
    </main>
    </Auxi>
);

export default layout