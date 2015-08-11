# Collector

![Version](https://img.shields.io/npm/v/collectorjs.svg?style=flat-square) ![Compressed Size](https://img.shields.io/badge/Compressed%20Size-2.8kb-17a689.svg?style=flat-square) ![Uncompressed Size](https://img.shields.io/badge/Uncompressed%20Size-13kb-17a689.svg?style=flat-square)

Collector.js is a highly extendible *mostly* read-only Query Library similar to *jQuery* or *Zepto*, we ship with minimal functionality and allow users to extend quite a bit.

Please view [our speed tests on CodePen](http://codepen.io/tbremer/pen/QbVzoG), also checkout  [jQuery](http://codepen.io/tbremer/pen/KprWXK) and [Zepto](http://codepen.io/tbremer/pen/JdeWrJ) for speed comparison.

### What does *mostly* read-only mean…
We think there is a better way to handle DOM manipulation, maybe one day we can write a successfully efficient manipulation core, but until that day we'd suggest some sort of `diff`ing library like React or Ember. We say *mostly* because we do allow users to update class names and attributes.

We are planning to write a basic level DOM manipulation extension that would expose functionality more similar to jQuery and Zeptos `.html()`, `.text()`, `.remove()`, etc… after Version 1.1 is stabilized. Until then we think Apps should be moving a way where Class Names and attributes can handle most of your needs.
