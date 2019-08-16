<template>
  <v-card class="counterparty-container">
    <v-card-title>
      <v-toolbar-title>Поставщики</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="green" dark class="mb-2" v-on="on">Добавить</v-btn>
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
                  v-model="editedItem.post"
                  label="Должность"
                  @input="$v.editedItem.post.$touch()"
                ></v-text-field>
                <template v-if="isInvalidPost">
                  <div class="caption invalid-message" v-if="!$v.editedItem.post.required">Введите данные</div>
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
    </v-card-title>
    <v-card-text></v-card-text>

    <v-data-table
      :headers="headers"
      :items="providersData"
      class="counterparty-container__table"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.email }}</td>
        <td>{{ props.item.phone }}</td>
        <td>{{ props.item.post }}</td>
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
  import CounterpartyApi from '~/api/counterparty';
  import { email, required } from 'vuelidate/lib/validators';
  import _ from 'lodash';

  export default {
    mixins: [ FormHelper ],
    props: {
      providers: {
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
        { text: 'Должность', value: 'post' },
        { text: 'Действия', value: 'name', align: 'center', sortable: false }
      ],
      providersData: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        phone: '',
        post: ''
      },
      defaultItem: {
        name: '',
        email: '',
        phone: '',
        post: ''
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
        phone: {
          required
        },
        post: {
          required
        }
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Добавить контрагента' : 'Редактировать контрагента'
      },
      isInvalidName () {
        return this.$v.editedItem.name.$dirty && this.$v.editedItem.name.$invalid;
      },
      isInvalidEmail () {
        return this.$v.editedItem.email.$dirty && this.$v.editedItem.email.$invalid;
      },
      isInvalidPhone () {
        return this.$v.editedItem.phone.$dirty && this.$v.editedItem.phone.$invalid;
      },
      isInvalidPost () {
        return this.$v.editedItem.post.$dirty && this.$v.editedItem.post.$invalid;
      }
    },
    watch: {
      dialog (val) {
        val || this.close();
      },
      providers (val) {
        this.providersData = _.cloneDeep(val);
      }
    },
    created () {
      this.providersData = _.cloneDeep(this.providers);
    },
    methods: {
      addRequest (counterparty) {
        CounterpartyApi.add(counterparty)
          .then((data) => this.$emit('getCounterparties'))
          .catch(error => console.log(error));
      },
      editRequest (counterparty) {
        CounterpartyApi.edit(counterparty)
          .then((data) => this.$emit('getCounterparties'))
          .catch(error => console.log(error));
      },
      deleteRequest (id) {
        CounterpartyApi.delete({ id: id })
          .then((data) => this.$emit('getCounterparties'))
          .catch(error => console.log(error));
      },
      editItem (item) {
        this.editedIndex = this.counterpartiesData.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },
      deleteItem (item) {
        confirm('Вы уверены, что хотите удалить этого контрагента?') && this.deleteRequest(item._id);
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
          this.close()
        }
      }
    }
  }
</script>

<style lang="scss">
  .counterparty-container {
    margin: 30px;
    border: none !important;
    box-shadow: 0 1px 5px 0 rgba(0,0,0,0.1) !important;

    &__table {
    }
  }

</style>
