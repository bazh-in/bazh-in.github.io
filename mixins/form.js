import _ from 'lodash';

export default {
  methods: {
    // todo : https://vuejs.org/v2/style-guide/#Private-property-names-essential
    validateModel (model = 'model') {
      _.keys(this[model]).forEach((modelKey) => {
        if (this.$v[model][modelKey]) {
          this.$v[model][modelKey].$touch();
        }
      });
    },

    handleErrorResponse (error) {
      if (_.get(error, 'error.response.data.errors')) {
        _.forOwn(error.response.data.errors, errors => {
          if (errors instanceof Array) {
            errors.forEach(error => {
              console.error(error);
            });
          } else {
            console.error(errors);
          }
        });
      }
    }
  }
};
