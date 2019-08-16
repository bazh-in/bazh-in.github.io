<template>
  <div class="stock-container">
    <StockMaterials v-if="$route.name === 'stock-materials'" :products="products"/>
    <StockProducts v-if="$route.name === 'stock-products'" :products="products"/>
    <StockProviders v-if="$route.name === 'stock-providers'" :providers="providers"/>
  </div>
</template>

<script>
  import StockMaterials from './StockMaterials';
  import StockProducts from './StockProducts';
  import StockProviders from './StockProviders';

  export default {
    components: {
      StockMaterials,
      StockProducts,
      StockProviders
    },
    props: {
      products: {
        type: Array
      },
      providers: {
        type: Array
      }
    },
    mounted () {
      console.log(this.$route);
    }
  }
</script>

<style lang="scss">
  .stock-container {

  }
</style>
