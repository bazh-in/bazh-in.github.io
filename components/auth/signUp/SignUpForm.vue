<template>
  <v-layout row wrap align-center class="sign-up-form">
    <v-flex xs6 offset-xs3>
      <div class="headline grey--text text-xs-center mb-4">Регистрация</div>
      <v-text-field
        type="email"
        color="green"
        label="Email"
        v-model="user.email"
        @input="$v.user.email.$touch()"
      ></v-text-field>
      <v-text-field
        color="green"
        label="Имя"
        v-model="user.name"
        @input="$v.user.name.$touch()"
      ></v-text-field>
      <v-text-field
        color="green"
        label="Телефон"
        v-model="user.phone"
        @input="$v.user.phone.$touch()"
      ></v-text-field>
      <v-text-field
        color="green"
        label="Компания"
        v-model="user.company"
        @input="$v.user.company.$touch()"
      ></v-text-field>
      <v-layout justify-center mt-4 mb-5>
        <v-btn class="green" dark>Старт</v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
    
</template>

<script>
  import FormHelper from '~/mixins/form';
  import { email, required } from 'vuelidate/lib/validators';

  export default {
    mixins: [ FormHelper ],
    data () {
      return {
        user: {
          email: '',
          name: '',
          phone: '',
          company: ''
        }
      };
    },
    validations: {
      user: {
        email: {
          email,
          required
        },
        name: {
          required
        },
        phone: {
          required
        },
        company: {
          required
        },
      }
    },
    computed: {
      isValidEmail () {
        return this.$v.user.email.$dirty && this.$v.user.email.$invalid;
      },
      isValidName () {
        return this.$v.user.name.$dirty && this.$v.user.name.$invalid;
      },
      isValidPhone () {
        return this.$v.user.phone.$dirty && this.$v.user.phone.$invalid;
      },
      isValidCompany () {
        return this.$v.user.company.$dirty && this.$v.user.company.$invalid;
      }
    },
    methods: {
      signUp () {
        this.validateModel('user');

        if (!this.$v.$invalid) {

        }
      }
    }
  }
</script>

<style lang="scss">
  .sign-up-form {
    height: calc(100% - 42px);
  }
</style>
