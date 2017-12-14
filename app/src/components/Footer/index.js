import React from 'react';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';

const Footer = () => (
  <footer styleName="footer">
    <h2>Footer</h2>
  </footer>
);

export default cssModules(Footer, styles, {allowMultiple: true});

