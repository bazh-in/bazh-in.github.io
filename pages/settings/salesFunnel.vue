<template>
  <SalesFunnelContainer
    :salesFunnels="salesFunnels"
    @getSalesFunnels="getSalesFunnels"
  />
</template>

<script>
  import SalesFunnelApi from '~/api/salesFunnel';
  import SalesFunnelContainer from '~/components/salesFunnel/SalesFunnelContainer';

  export default {
    async asyncData () {
      const salesFunnelsData = await SalesFunnelApi.get();
      const salesFunnels = salesFunnelsData.data;

      return { salesFunnels };
    },
    components: {
      SalesFunnelContainer
    },
    methods: {
      getSalesFunnels () {
        SalesFunnelApi.get()
          .then(({ data }) => this.salesFunnels = data)
          .catch(error => console.log(error));
      }
    }
  }
</script>
