var path = require('path');

module.exports = {
  "extends": "eslint-config-airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "webpack.config.js"
      }
    }
  },
  "rules": {
    "no-shadow": 0,
    "max-len": 0,
    "semi": 0,
    "no-param-reassign": 0,
    "import/prefer-default-export": 0,
    "react/jsx-space-before-closing": 0,
    "react/jsx-tag-spacing": 0,
    "object-curly-spacing": 0,
    "class-methods-use-this": 0,
    "comma-dangle": 0,
    "func-names": 0,
    "padded-blocks": 0,
    "no-script-url": 0,
    "eol-last": 0,
    "react/prefer-stateless-function": 1,
    "react/no-array-index-key": 0,
    "no-plusplus": 0,
    "radix": 0,
    "arrow-body-style": 0,
    "arrow-parens": 0,
    "consistent-return": 0,
    "react/no-did-mount-set-state": 0,

    "no-case-declarations": 0,
    "space-in-parens": 0,
    "no-trailing-spaces": 0,
    "prefer-template": 0,
    "jsx-a11y/img-has-alt": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react/jsx-closing-bracket-location": 0,
    "react/sort-comp": 0,
    "react/jsx-boolean-value": 0,
    "react/require-default-props": 0,
    "react/prop-types": 0,
    "react/forbid-prop-types": 0,
    "react/no-string-refs": 0,
    "react/no-unused-prop-types": 0,
    "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
    "react/jsx-no-bind": [2, {
      "ignoreRefs": false,
      "allowArrowFunctions": true,
      "allowBind": true
    }],


  },
  "plugins": [
    "import",
    "react",
    "jsx-a11y"
  ]
};
