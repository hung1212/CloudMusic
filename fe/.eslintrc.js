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
        "semi": ["error", "never"]
    },
    "parserOptions": {
        "parser": "babel-eslint"
    }
}