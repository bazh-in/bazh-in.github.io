<template>
  <StockProviders
    :providers="providers"
    @getProviders="getProviders"
  />
</template>

<script>
  import CounterpartyApi from '~/api/counterparty';
  import StockProviders from '~/components/stock/StockProviders';

  export default {
    async asyncData () {
      const providersData = await CounterpartyApi.getProviders();
      const providers = providersData.data;

      return { providers };
    },
    components: {
      StockProviders
    },
    methods: {
      getProviders () {
        CounterpartyApi.get()
          .then(({ data }) => this.providers = data)
          .catch(error => console.log(error));
      }
    }
  }
</script>
