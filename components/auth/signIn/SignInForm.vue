<template>
  <v-layout row wrap align-center class="sign-in-form">
    <v-flex xs6 offset-xs3>
      <div class="headline grey--text text-xs-center mb-4">Авторизация</div>
      <v-text-field
        type="email"
        color="green"
        label="Email"
        v-model="user.email"
        @input="$v.user.email.$touch()"
      ></v-text-field>
      <v-text-field
        type="password"
        color="green"
        label="Пароль"
        v-model="user.password"
        @input="$v.user.password.$touch()"
      ></v-text-field>
      <div class="caption grey--text text-xs-right">
        <nuxt-link to="/about">Забыли пароль?</nuxt-link>
      </div>
      <v-layout justify-center mt-4 mb-5>
        <v-btn class="green" dark>Вход</v-btn>
      </v-layout>
      <div class="grey--text">У вас еще нет подписки? <nuxt-link to="/auth/signUp">Зарегистрироваться</nuxt-link></div>
    </v-flex>
  </v-layout>
    
</template>

<script>
  import FormHelper from '~/mixins/form';
  import { email, minLength, required } from 'vuelidate/lib/validators';

  export default {
    mixins: [ FormHelper ],
    data () {
      return {
        user: {
          email: '',
          password: ''
        }
      };
    },
    validations: {
      user: {
        email: {
          email,
          required
        },
        password: {
          minLength: minLength(6),
          required
        }
      }
    },
    computed: {
      isValidEmail () {
        return this.$v.user.email.$dirty && this.$v.user.email.$invalid;
      },
      isValidPassword () {
        return this.$v.user.password.$dirty && this.$v.user.password.$invalid;
      }
    },
    methods: {
      signIn () {
        this.validateModel('user');

        if (!this.$v.$invalid) {

        }
      }
    }
  }
</script>

<style lang="scss">
  .sign-in-form {
    height: calc(100% - 42px);
  }
</style>
