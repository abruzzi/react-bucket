import React from 'react';

import cssModules from 'react-css-modules';
import styles from './index.module.scss';


const Section = (props) => (
  <div className={styles.section}>
    {props.title && <h2>{props.title}</h2>}
    {props.title && <hr styleName={props.hideCrossLine ? 'hide' : ''}/>}
    <div>{props.children}</div>
  </div>
)

export default cssModules(Section, styles);
