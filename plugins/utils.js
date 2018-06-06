import Vue from 'vue';

global.Utils = {};

Utils.extend = Vue.util.extend;

Utils.clone = (obj) => {
  return Vue.util.extend({}, obj)
};

Utils.isInteger = (num) => {
  return !isNaN(num) && Number.isInteger(parseFloat(num))
};