<template>
  <CounterpartyContainer
    :counterparties="counterparties"
    @getCounterparties="getCounterparties"
  />
</template>

<script>
  import CounterpartyApi from '~/api/counterparty';
  import CounterpartyContainer from '~/components/counterparty/CounterpartyContainer';

  export default {
    async asyncData () {
      const counterpartiesData = await CounterpartyApi.getProviders();
      const counterparties = counterpartiesData.data;

      return { counterparties };
    },
    components: {
      CounterpartyContainer
    },
    methods: {
      getCounterparties () {
        CounterpartyApi.get()
          .then(({ data }) => this.counterparties = data)
          .catch(error => console.log(error));
      }
    }
  }
</script>
