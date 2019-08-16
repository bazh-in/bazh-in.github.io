<template>
  <StockProducts
    :products="products"
    @getProducts="getProducts"
  />
</template>

<script>
  import ProductApi from '~/api/product';
  import StockProducts from '~/components/stock/StockProducts';

  export default {
    async asyncData () {
      const productsData = await ProductApi.get();
      const products = productsData.data;

      return { products };
    },
    components: {
      StockProducts
    },
    methods: {
      getProducts () {
        ProductApi.get()
          .then(({ data }) => this.products = data)
          .catch(error => console.log(error));
      }
    }
  }
</script>
