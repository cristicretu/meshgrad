<p align="center">
<img src="./website/public/static/og.png" />
</p>

# 🎨 Meshgrad ![meshgrad minzip package size](https://img.shields.io/bundlephobia/minzip/meshgrad) ![meshgrad package version](https://img.shields.io/npm/v/meshgrad.svg?colorB=blue)

Meshgrad is a tiny utility to generate native-CSS Mesh Gradients.

[Demo](https://meshgrad.cretu.dev/)

## Install

```bash
$ npm install meshgrad
```

## Use

```js
import generateMeshGradient from 'meshgrad'

// number of color stops
const ELEMENTS = 6

...
<div style={'...' && generateMeshGradient(ELEMENTS)} />
```
