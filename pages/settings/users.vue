<template>
  <UserContainer
    :users="users"
    @getUsers="getUsers"
  />
</template>

<script>
  import UserApi from '~/api/user';
  import UserContainer from '~/components/user/UserContainer';

  export default {
    async asyncData () {
      const usersData = await UserApi.get();
      const users = usersData.data;

      return { users };
    },
    components: {
      UserContainer
    },
    methods: {
      getUsers () {
        UserApi.get()
          .then(({ data }) => this.users = data)
          .catch(error => console.log(error));
      }
    }
  }
</script>
