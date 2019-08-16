<template>
  <StockMaterials
    :materials="materials"
    @getMaterials="getMaterials"
  />
</template>

<script>
  import MaterialApi from '~/api/material';
  import StockMaterials from '~/components/stock/StockMaterials';

  export default {
    async asyncData () {
      const materialsData = await MaterialApi.get();
      const materials = materialsData.data;

      return { materials };
    },
    components: {
      StockMaterials
    },
    methods: {
      getMaterials () {
        MaterialApi.get()
          .then(({ data }) => this.materials = data)
          .catch(error => console.log(error));
      }
    }
  }
</script>
