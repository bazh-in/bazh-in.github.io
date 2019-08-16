<template>
  <v-card class="task-container" flat>
    <v-layout>
      <v-flex xs3 sm3 md3 v-for="task in tasksData" :key="task._id">
        <v-card class="task-container__card">
          <v-card-title class="pb-0">
            <v-chip color="green" text-color="white" small>
              <v-avatar :size="12">
                <v-icon>account_circle</v-icon>
              </v-avatar>
              Ranee
            </v-chip>
          </v-card-title>
          <v-card-text>
            <div>{{ task.name }}</div>
            <div class="grey--text">{{ task.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-layout justify-end class="mr-2">
              <v-avatar
                :size="24"
                color="grey lighten-4"
              >
                <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
              </v-avatar>
            </v-layout>

          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <!--<v-data-table
      :headers="headers"
      :items="tasksData"
      class="task-container__table"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.deadline }}</td>
        <td>{{ props.item.priority }}</td>
        <td>{{ props.item.userId }}</td>
        <td>{{ props.item.dealId }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>-->

    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn class="mb-4 mr-4" fab dark fixed bottom right color="green" v-on="on">
          <v-icon dark>add</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-layout wrap>
            <v-flex xs12 sm6 md12>
              <v-text-field
                type="text"
                color="green"
                v-model="editedItem.name"
                label="Название"
                @input="$v.editedItem.name.$touch()"
              ></v-text-field>
              <template v-if="isInvalidName">
                <div class="caption invalid-message" v-if="!$v.editedItem.name.required">Введите данные</div>
              </template>
            </v-flex>
            <v-flex xs12 sm6 md12>
              <v-text-field
                type="text"
                color="green"
                v-model="editedItem.description"
                label="Описание"
                @input="$v.editedItem.description.$touch()"
              ></v-text-field>
              <template v-if="isInvalidDescription">
                <div class="caption invalid-message" v-if="!$v.editedItem.description.required">Введите данные</div>
              </template>
            </v-flex>
            <v-flex xs12 sm6 md12>
              <v-text-field
                type="text"
                color="green"
                v-model="editedItem.deadline"
                label="Срок"
                @input="$v.editedItem.deadline.$touch()"
              ></v-text-field>
              <template v-if="isInvalidDeadline">
                <div class="caption invalid-message" v-if="!$v.editedItem.deadline.required">Введите данные</div>
              </template>
            </v-flex>
            <v-flex xs12 sm6 md12>
              <v-text-field
                type="text"
                color="green"
                v-model="editedItem.priority"
                label="Приоритет"
                @input="$v.editedItem.priority.$touch()"
              ></v-text-field>
              <template v-if="isInvalidPriority">
                <div class="caption invalid-message" v-if="!$v.editedItem.priority.required">Введите данные</div>
              </template>
            </v-flex>
            <v-flex xs12 sm6 md12>
              <v-text-field
                type="text"
                color="green"
                v-model="editedItem.userId"
                label="Пользователь"
                @input="$v.editedItem.userId.$touch()"
              ></v-text-field>
              <template v-if="isInvalidUserId">
                <div class="caption invalid-message" v-if="!$v.editedItem.userId.required">Введите данные</div>
              </template>
            </v-flex>
            <v-flex xs12 sm6 md12>
              <v-text-field
                type="text"
                color="green"
                v-model="editedItem.dealId"
                label="Сделка"
                @input="$v.editedItem.dealId.$touch()"
              ></v-text-field>
              <template v-if="isInvalidDealId">
                <div class="caption invalid-message" v-if="!$v.editedItem.dealId.required">Введите данные</div>
              </template>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-card-actions class="pb-3">
          <v-spacer></v-spacer>
          <v-btn color="green" flat dark @click="close">Отмена</v-btn>
          <v-btn color="green" dark @click="save">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
  import FormHelper from '~/mixins/form';
  import TaskApi from '~/api/task';
  import { minLength, email, required } from 'vuelidate/lib/validators';
  import _ from 'lodash';

  export default {
    mixins: [ FormHelper ],
    props: {
      tasks: {
        type: Array
      }
    },
    data: () => ({
      dialog: false,
      headers: [
        { text: 'Название', value: 'name' },
        { text: 'Срок', value: 'deadline' },
        { text: 'Приоритет', value: 'priority' },
        { text: 'Пользователь', value: 'userId' },
        { text: 'Сделка', value: 'dealId' },
        { text: 'Действия', value: 'name', align: 'center', sortable: false }
      ],
      tasksData: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        description: '',
        deadline: '',
        priority: '',
        userId: '',
        dealId: ''
      },
      defaultItem: {
        name: '',
        description: '',
        deadline: '',
        priority: '',
        userId: '',
        dealId: ''
      }
    }),
    validations: {
      editedItem: {
        name: {
          required
        },
        description: {
          required
        },
        deadline: {
          required
        },
        priority: {
          required
        },
        userId: {
          required
        },
        dealId: {
          required
        }
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Добавить задачу' : 'Редактировать задачу'
      },
      isInvalidName () {
        return this.$v.editedItem.name.$dirty && this.$v.editedItem.name.$invalid;
      },
      isInvalidDescription () {
        return this.$v.editedItem.description.$dirty && this.$v.editedItem.description.$invalid;
      },
      isInvalidDeadline () {
        return this.$v.editedItem.deadline.$dirty && this.$v.editedItem.deadline.$invalid;
      },
      isInvalidPriority () {
        return this.$v.editedItem.priority.$dirty && this.$v.editedItem.priority.$invalid;
      },
      isInvalidUserId () {
        return this.$v.editedItem.userId.$dirty && this.$v.editedItem.userId.$invalid;
      },
      isInvalidDealId () {
        return this.$v.editedItem.dealId.$dirty && this.$v.editedItem.dealId.$invalid;
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      tasksData (val) {
        this.tasksData = _.cloneDeep(val);
      }
    },
    created () {
      this.tasksData = _.cloneDeep(this.tasks);
    },
    methods: {
      addRequest (task) {
        TaskApi.add(task)
          .then((data) => this.$emit('getTasks'))
          .catch(error => console.log(error));
      },
      editRequest (task) {
        TaskApi.edit(task)
          .then((data) => this.$emit('getTasks'))
          .catch(error => console.log(error));
      },
      deleteRequest (id) {
        TaskApi.delete({ id: id })
          .then((data) => this.$emit('getTasks'))
          .catch(error => console.log(error));
      },
      editItem (item) {
        this.editedIndex = this.tasksData.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.tasksData.indexOf(item);
        confirm('Вы уверены, что хотите удалить эту задачу?') && this.deleteRequest(item._id);
      },
      close () {
        this.dialog = false;
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1
        }, 300)
      },
      save () {
        this.validateModel('editedItem');

        if (!this.$v.$invalid) {
          if (this.editedIndex > -1) {
            this.editRequest(this.editedItem);
          } else {
            this.addRequest(this.editedItem);
          }
          this.close();
        }
      }
    }
  }
</script>

<style lang="scss">
  .task-container {
    margin: 30px;

    &__card {
      border-left: 2.5px solid red !important;
    }
  }
</style>
