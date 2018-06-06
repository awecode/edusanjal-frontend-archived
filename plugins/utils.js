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
    return True
  }
};

Utils.isEmpty = isEmpty;

Utils.isFalsy = function (o) {
  // Python like Falsy
  if (typeof o == 'object') {
    return isEmpty(o);
  }
  return !o;
};


Utils.clone = (obj) => {
  return Vue.util.extend({}, obj)
};

Utils.isInteger = (num) => {
  return !isNaN(num) && Number.isInteger(parseFloat(num))
};

Utils.merge = (a, b) => {
  return Object.assign({}, a, b);
};