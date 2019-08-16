<template>
  <v-card class="deal-container" flat>
    <v-card-text>
      <v-flex xs3 sm3 md3 v-for="deal in dealsData" :key="deal._id">
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
            <div>{{ deal.name }}</div>
            <div class="grey--text">{{ deal.description }}</div>
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

    </v-card-text>

    <!--<v-data-table
      :headers="headers"
      :items="dealsData"
      class="deal-container__table"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.budget }}</td>
        <td>{{ props.item.responsibleMan }}</td>
        <td>{{ props.item.counterpartyId }}</td>
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
                type="email"
                color="green"
                v-model="editedItem.budget"
                label="Бюджет"
                @input="$v.editedItem.budget.$touch()"
              ></v-text-field>
              <template v-if="isInvalidBudget">
                <div class="caption invalid-message" v-if="!$v.editedItem.budget.required">Введите данные</div>
              </template>
            </v-flex>
            <v-flex xs12 sm6 md12>
              <v-text-field
                type="text"
                color="green"
                v-model="editedItem.responsibleMan"
                label="Ответственный"
                @input="$v.editedItem.responsibleMan.$touch()"
              ></v-text-field>
              <template v-if="isInvalidResponsibleMan">
                <div class="caption invalid-message" v-if="!$v.editedItem.responsibleMan.required">Введите данные</div>
              </template>
            </v-flex>
            <v-flex xs12 sm6 md12>
              <v-text-field
                type="text"
                color="green"
                v-model="editedItem.counterpartyId"
                label="Клиент"
                @input="$v.editedItem.counterpartyId.$touch()"
              ></v-text-field>
              <template v-if="isInvalidCounterpartyId">
                <div class="caption invalid-message" v-if="!$v.editedItem.counterpartyId.required">Введите данные</div>
              </template>
            </v-flex>
            <v-flex xs12 sm6 md12>
              <v-text-field
                type="text"
                color="green"
                v-model="editedItem.products"
                label="Товары"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md12>
              <v-text-field
                type="text"
                color="green"
                v-model="editedItem.note"
                label="Примечание"
              ></v-text-field>
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
  import DealApi from '~/api/deal';
  import { required } from 'vuelidate/lib/validators';
  import _ from 'lodash';

  export default {
    mixins: [ FormHelper ],
    props: {
      deals: {
        type: Array
      }
    },
    data: () => ({
      dialog: false,
      headers: [
        { text: 'Название', value: 'name' },
        { text: 'Бюджет', value: 'budget' },
        { text: 'Ответственный', value: 'responsibleMan' },
        { text: 'Клиент', value: 'counterpartyId' },
        { text: 'Действия', value: 'name', align: 'center', sortable: false }
      ],
      dealsData: [],
      editedIndex: -1,
      editedItem: {
        type: 'order',
        name: '',
        budget: '',
        responsibleMan: '',
        counterpartyId: '',
        products: '',
        note: ''
      },
      defaultItem: {
        type: 'order',
        name: '',
        budget: '',
        responsibleMan: '',
        counterpartyId: '',
        products: '',
        note: ''
      }
    }),
    validations: {
      editedItem: {
        name: {
          required
        },
        budget: {
          required
        },
        responsibleMan: {
          required
        },
        counterpartyId: {
          required
        }
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Добавить сделку' : 'Редактировать сделку'
      },
      isInvalidName () {
        return this.$v.editedItem.name.$dirty && this.$v.editedItem.name.$invalid;
      },
      isInvalidBudget () {
        return this.$v.editedItem.budget.$dirty && this.$v.editedItem.budget.$invalid;
      },
      isInvalidResponsibleMan () {
        return this.$v.editedItem.responsibleMan.$dirty && this.$v.editedItem.responsibleMan.$invalid;
      },
      isInvalidCounterpartyId () {
        return this.$v.editedItem.counterpartyId.$dirty && this.$v.editedItem.counterpartyId.$invalid;
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      deals (val) {
        this.dealsData = _.cloneDeep(val);
      }
    },
    created () {
      this.dealsData = _.cloneDeep(this.deals);
    },
    methods: {
      addRequest (deal) {
        DealApi.add(deal)
          .then((data) => this.$emit('getDeals'))
          .catch(error => console.log(error));
      },
      editRequest (deal) {
        DealApi.edit(deal)
          .then((data) => this.$emit('getDeals'))
          .catch(error => console.log(error));
      },
      deleteRequest (id) {
        DealApi.delete({ id: id })
          .then((data) => this.$emit('getDeals'))
          .catch(error => console.log(error));
      },
      editItem (item) {
        this.editedIndex = this.dealsData.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },
      deleteItem (item) {
        confirm('Вы уверены, что хотите удалить эту сделку?') && this.deleteRequest(item._id);
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
  .deal-container {
    margin: 30px;
  }
</style>
