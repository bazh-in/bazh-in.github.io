import axios from 'axios';
import Vue from 'vue';
import _ from 'lodash';
//import Cookies from 'js-cookie';

const INVALID_TOKEN_ERROR = 'token_invalid';
const BAD_REQUEST_CODE = 400;
const AUTHORIZE_CODE = 401;

class Api {
  constructor () {
    this.axios = axios.create({
      baseURL: process.env.API_URL,
      headers: {}
    });

    /*this.axios.interceptors.request.use(
      config => this.prepareConfigForRequest(config),
      error => Promise.reject(error)
    );*/

    this.axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        let { data, status: statusCode } = error.response;

        /*if (_.has(error, 'response.data.message')) {
          if (data.error !== 'invalid_credentials') {
            Vue.toasted.error(data.message);
          }
        }

        if (_.has(error, 'response.data.errors')) {
          Vue.toasted.error(data.errors.fatal);
        }*/

        return Promise.reject(error);
      }
    );

    //this.setToken(Cookies.get('userToken'));
    //this.setTokenForRegister(Cookies.get('tokenForRegister'));
  }

  setToken (token) {
    token
      ? this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      : delete this.axios.defaults.headers.common['Authorization'];
  }

  setTokenForRegister (token) {
    token
      ? this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      : delete this.axios.defaults.headers.common['Authorization'];
  }

  prepareConfigForRequest (config) {
    if (!(config.data instanceof FormData)) {
      config.data = this.convertObjectKeys(config.data, _.snakeCase);
      config.params = this.convertObjectKeys(config.params, _.snakeCase);
    }

    return config;
  }

  convertObjectKeys (object, func = _.camelCase) {
    if (!_.isObject(object)) {
      return object;
    }

    return _.mapValues(
      _.mapKeys(object, (value, key) => func(key)),
      value => {
        if (value instanceof Object) {
          return value instanceof Array
            ? _.map(value, valueItem => this.convertObjectKeys(valueItem, func))
            : this.convertObjectKeys(value, func);
        }

        return value;
      }
    );
  }
}

export default new Api();
