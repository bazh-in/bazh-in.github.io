<template>
  <TaskContainer
    :tasks="tasks"
    @getTasks="getTasks"
  />
</template>

<script>
  import TaskApi from '~/api/task';
  import TaskContainer from '~/components/task/TaskContainer';

  export default {
    async asyncData () {
      const tasksData = await TaskApi.get();
      const tasks = tasksData.data;

      return { tasks };
    },
    components: {
      TaskContainer
    },
    methods: {
      getTasks () {
        TaskApi.get()
          .then(({ data }) => this.tasks = data)
          .catch(error => console.log(error));
      }
    }
  }
</script>
