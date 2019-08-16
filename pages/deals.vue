<template>
  <DealContainer
    :deals="deals"
    @getDeals="getDeals"
  />
</template>

<script>
  import DealApi from '~/api/deal';
  import DealContainer from '~/components/deal/DealContainer';

  export default {
    async asyncData () {
      const dealsData = await DealApi.get();
      const deals = dealsData.data;

      return { deals };
    },
    components: {
      DealContainer
    },
    methods: {
      getDeals () {
        DealApi.get()
          .then(({ data }) => this.deals = data)
          .catch(error => console.log(error));
      }
    }
  }
</script>

