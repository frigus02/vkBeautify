# vkBeautify

> Stripped down and modernized version of the original [vkBeautify](https://github.com/vkiryukhin/vkBeautify) library.

The original vkBeautify library is great. However I does not fit exactly my
needs. So I make the following adjustments:

*   Make it work in Web Workers.
*   Remove minification functions.
*   Remove CSS and SQL support.

This results in a small library, which can **pretty-print** text in **JSON** and **XML**.

## Install

```
$ bower install --save frigus02/vkBeautify
$ npm install frigus02-vkbeautify
$ yarn add frigus02-vkbeautify
```

## Usage

```javascript
/**
 * @param {string} text - Text to beautify.
 * @param {(number|string)} [step=\t] - Number of white spaces or string to visualize indentation (can also be a set of white spaces).
 * @returns {string} - The beautified text.
 */
vkbeautify.json(text, step);
vkbeautify.xml(text, step);
```

## License

Original vkBeautify: [MIT © Vadim Kiryukhin.](ORIGINAL-LICENSE)

This version: [MIT © Jan Kühle.](LICENSE)
