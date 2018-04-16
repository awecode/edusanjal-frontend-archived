import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL + '/',
  xsrfHeaderName: 'X-CSRFTOKEN',
  'xsrfCookieName': 'csrftoken'
});


global.api = api;

global.api_origin = axios.create({
  baseURL: ''
});