<template>
  <v-card class="user-container">
    <v-card-title>
      <v-toolbar-title>Пользователи</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="green" dark round class="mb-2" v-on="on">Добавить</v-btn>
        </template>
        <v-card>
          <v-card-title class="pb-0">
            <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
          </v-card-title>

          <v-card-text>
            <v-layout wrap>
              <v-flex xs12 sm6 md12>
                <v-text-field
                  type="text"
                  color="green"
                  v-model="editedItem.name"
                  label="ФИО"
                  @input="$v.editedItem.name.$touch()"
                ></v-text-field>
                <template v-if="isInvalidName">
                  <div class="caption invalid-message" v-if="!$v.editedItem.name.required">Введите данные</div>
                </template>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field
                  type="email"
                  color="green"
                  v-model="editedItem.email"
                  label="Email"
                  @input="$v.editedItem.email.$touch()"
                ></v-text-field>
                <template v-if="isInvalidEmail">
                  <div class="caption invalid-message" v-if="!$v.editedItem.email.required">Введите данные</div>
                  <div class="caption invalid-message" v-else>Введите корректный email</div>
                </template>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field
                  type="password"
                  color="green"
                  v-model="editedItem.password"
                  label="Email"
                  @input="$v.editedItem.password.$touch()"
                ></v-text-field>
                <template v-if="isInvalidPassword">
                  <div class="caption invalid-message" v-if="!$v.editedItem.password.required">Введите данные</div>
                  <div class="caption invalid-message" v-else>Пароль должен содержать более 6 символов</div>
                </template>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field
                  type="text"
                  color="green"
                  v-model="editedItem.phone"
                  label="Телефон"
                  @input="$v.editedItem.phone.$touch()"
                ></v-text-field>
                <template v-if="isInvalidPhone">
                  <div class="caption invalid-message" v-if="!$v.editedItem.phone.required">Введите данные</div>
                </template>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field
                  type="text"
                  color="green"
                  v-model="editedItem.role"
                  label="Роль"
                  @input="$v.editedItem.role.$touch()"
                ></v-text-field>
                <template v-if="isInvalidRole">
                  <div class="caption invalid-message" v-if="!$v.editedItem.role.required">Введите данные</div>
                </template>
              </v-flex>
            </v-layout>
          </v-card-text>

          <v-card-actions class="pb-3">
            <v-spacer></v-spacer>
            <v-btn color="green" round flat dark @click="close">Отмена</v-btn>
            <v-btn color="green" round dark @click="save">Сохранить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-title>
    <v-card-text></v-card-text>

    <v-data-table
      :headers="headers"
      :items="usersData"
      class="user-container__table"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.email }}</td>
        <td>{{ props.item.phone }}</td>
        <td>{{ props.item.role }}</td>
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
    </v-data-table>
  </v-card>
</template>

<script>
  import FormHelper from '~/mixins/form';
  import UserApi from '~/api/user';
  import { minLength, email, required } from 'vuelidate/lib/validators';
  import _ from 'lodash';

  export default {
    mixins: [ FormHelper ],
    props: {
      users: {
        type: Array
      }
    },
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'ФИО',
          value: 'name'
        },
        { text: 'Email', value: 'email' },
        { text: 'Телефон', value: 'phone' },
        { text: 'Роль', value: 'role' },
        { text: 'Действия', value: 'name', align: 'center', sortable: false }
      ],
      usersData: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        password: '',
        phone: '',
        role: ''
      },
      defaultItem: {
        name: '',
        email: '',
        password: '',
        phone: '',
        role: ''
      }
    }),
    validations: {
      editedItem: {
        name: {
          required
        },
        email: {
          email,
          required
        },
        password: {
          minLength: minLength(6),
          required
        },
        phone: {
          required
        },
        role: {
          required
        }
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Добавить пользователя' : 'Редактировать пользователя'
      },
      isInvalidName () {
        return this.$v.editedItem.name.$dirty && this.$v.editedItem.name.$invalid;
      },
      isInvalidEmail () {
        return this.$v.editedItem.email.$dirty && this.$v.editedItem.email.$invalid;
      },
      isInvalidPassword () {
        return this.$v.editedItem.password.$dirty && this.$v.editedItem.password.$invalid;
      },
      isInvalidPhone () {
        return this.$v.editedItem.phone.$dirty && this.$v.editedItem.phone.$invalid;
      },
      isInvalidRole () {
        return this.$v.editedItem.role.$dirty && this.$v.editedItem.role.$invalid;
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      users (val) {
        this.usersData = _.cloneDeep(val);
      }
    },
    created () {
      this.usersData = _.cloneDeep(this.users);
    },
    methods: {
      addRequest (user) {
        UserApi.add(user)
          .then((data) => this.$emit('getUsers'))
          .catch(error => console.log(error));
      },
      editRequest (user) {
        UserApi.edit(user)
          .then((data) => this.$emit('getUsers'))
          .catch(error => console.log(error));
      },
      deleteRequest (id) {
        UserApi.delete({ id: id })
          .then((data) => this.$emit('getUsers'))
          .catch(error => console.log(error));
      },
      editItem (item) {
        this.editedIndex = this.usersData.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },
      deleteItem (item) {
        confirm('Вы уверены, что хотите удалить этого пользователя?') && this.deleteRequest(item._id);
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
  .user-container {
    margin: 30px;
    border: none !important;
    box-shadow: 0 1px 5px 0 rgba(0,0,0,0.1) !important;

    &__table {
    }
  }
</style>
