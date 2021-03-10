import React from 'react';
import Auxi from '../../hoc/auxi';
import styles from './layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'

const layout = (props) =>
(
    <Auxi>
        <Toolbar />
        <main className={styles.Content}>
            {props.children}
        </main>
    </Auxi>
);

export default layout