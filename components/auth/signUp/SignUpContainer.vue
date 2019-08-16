<template>
  <v-layout row wrap class="sign-up-container">
    <v-flex xs6 class="green sign-up-container__banner">
      <v-layout row wrap align-center justify-center class="sign-up-container__banner-text-wrapper">
        <div class="display-3 white--text text-xs-center">Автоматизируем<br> Ваш бизнес</div>
      </v-layout>
    </v-flex>
    <v-flex xs6 class="sign-up-container__form-wrapper">

      <SignUpForm/>

      <div class="caption grey--text text-xs-right sign-up-container__copyright">&copy; 2019 XuRMa</div>
    </v-flex>
  </v-layout>
</template>

<script>
  import SignUpForm from '~/components/auth/signUp/SignUpForm';

  export default {
    components: {
      SignUpForm
    }
  }
</script>

<style lang="scss">
  .sign-up-container {
    &__form-wrapper,
    &__banner {
      height: 100vh;
    }

    &__banner {
      background-image: url('/img/backgrounds/main-background.jpg');
      background-position: 53% 60%;
      background-size: cover;
      background-repeat: no-repeat;
    }

    &__banner-text-wrapper {
      height: 100%;
    }

    &__copyright {
      margin-bottom: 27px;
      margin-right: 27px;
    }
  }
</style>
