<template>
  <v-layout row wrap class="sign-in-container">
    <v-flex xs6 class="green sign-in-container__banner">
      <v-layout row wrap align-center justify-center class="sign-in-container__banner-text-wrapper">
        <div class="display-3 white--text text-xs-center">Автоматизируем<br> Ваш бизнес</div>
      </v-layout>
    </v-flex>
    <v-flex xs6 class="sign-in-container__form-wrapper">

      <SignInForm/>

      <div class="caption grey--text text-xs-right sign-in-container__copyright">&copy; 2019 XuRMa</div>
    </v-flex>
  </v-layout>
</template>

<script>
  import SignInForm from '~/components/auth/signIn/SignInForm';

  export default {
    components: {
      SignInForm
    }
  }
</script>

<style lang="scss">
  .sign-in-container {
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
