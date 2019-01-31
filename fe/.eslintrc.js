module.exports = {
    "root": true,
    "env": {
        "node": true
    },
    "extends": [
        "airbnb-base",
        "plugin:vue/recommended"
    ],
    "globals": {
        "$": true,
    },
    "rules": {
        "semi": ["error", "never"],
        "prefer-destructuring": 0
    },
    "parserOptions": {
        "parser": "babel-eslint"
    }
}