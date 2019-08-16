<template>
  <div>
    <v-subheader>Buttons</v-subheader>
    <v-btn class="green" dark>Button</v-btn>
    <v-btn class="green green--text" dark outline>Button</v-btn>
    <v-btn class="green" dark fab>+</v-btn>

    <v-subheader>Text fields</v-subheader>
    <v-layout>
      <v-text-field
        color="green"
        label="Regular"
      ></v-text-field>
    </v-layout>
  </div>
    
</template>

<script>
  export default {
    layout: 'empty'
  }
</script>

<style type="scss">
  .v-btn {
    text-transform: none !important;
    border-radius: 100px;
    padding: 0 40px !important;
  }

  .v-btn--floating {
    padding: 0 !important;
  }

</style>
