# Escaping

[![NPM version](http://img.shields.io/npm/v/escaping.svg?style=flat)](https://www.npmjs.org/package/escaping)
[![Build Status](https://img.shields.io/travis/paulzi/escaping/master.svg)](https://travis-ci.org/paulzi/escaping)
[![Downloads](https://img.shields.io/npm/dt/escaping.svg)](https://www.npmjs.org/package/escaping)
![License](https://img.shields.io/npm/l/escaping.svg)

Функции для экранирования символов и снятия экранирования.

[English readme](https://github.com/paulzi/escaping/)

## Установка

```sh
npm install escaping
```

## Использование

### escape()

```javascript
import { escape } from 'escaping';

let result = escape('1.2.3', '.', '\\'); // '1\\.2\\.3'
```

### unescape()

```javascript
import { unescape } from 'escaping';

let result = unescape('1\\.2\\.3', '.', '\\'); // '1.2.3'
```

### split()

```javascript
import { split } from 'escaping';

let result = split('1.2.3', '.', '\\'); // ['1', '2', '3']
```

## Тестирование

Для запуска тестов используйте:

```sh
npm test
```
