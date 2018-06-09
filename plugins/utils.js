import Vue from 'vue';

global.Utils = {};

Utils.extend = Vue.util.extend;

const isEqual = function (a, b) {
  if (a === void 0) a = {};
  if (b === void 0) b = {};

  // handle null value #1566
  if (!a || !b) {
    return a === b
  }
  let aKeys = Object.keys(a);
  let bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    let aVal = a[key];
    let bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
};

Utils.isEqual = isEqual;

const isEmpty = function (o) {
  if (Array.isArray(o) && o.length === 0) {
    return true
  }
  if (typeof o === 'object' && Object.keys(o).length === 0) {
    return true
  }
};

Utils.isEmpty = isEmpty;

Utils.isFalsy = function (o) {
  // Python like Falsy
  if (typeof o === 'object') {
    return isEmpty(o);
  }
  return !o;
};


Utils.clone = (o) => {
  if (Array.isArray(o)) {
    return o.slice(0)
  }
  if (typeof o === 'object') {
    return Vue.util.extend({}, o)
  }
};

Utils.isInteger = (num) => {
  return !isNaN(num) && Number.isInteger(parseFloat(num))
};

Utils.merge = (a, b) => {
  return Object.assign({}, a, b);
};

Utils.stringToArray = (o) => {
  return (typeof o === 'string') ? [o] : o;
};

Utils.englishList = (words) => {
  words = Utils.clone(Utils.stringToArray(words));
  if (words.length === 1) {
    return words[0];
  }
  const last_word = words.pop();
  let sans_last = (words.length === 1) ? words[0] : words.join(', ');
  return sans_last + ' and ' + last_word;
};

Utils.ascending = (a, b) => {
  return a.localeCompare(b);
};