<template>
  <v-card class="material-container">
    <v-card-title>
      <v-toolbar-title>Материалы</v-toolbar-title>
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
                  label="Наименование"
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
                  v-model="editedItem.code"
                  label="Код товара"
                  @input="$v.editedItem.code.$touch()"
                ></v-text-field>
                <template v-if="isInvalidCode">
                  <div class="caption invalid-message" v-if="!$v.editedItem.code.required">Введите данные</div>
                </template>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field
                  type="text"
                  color="green"
                  v-model="editedItem.vendorCode"
                  label="Артикул"
                  @input="$v.editedItem.vendorCode.$touch()"
                ></v-text-field>
                <template v-if="isInvalidVendorCode">
                  <div class="caption invalid-message" v-if="!$v.editedItem.vendorCode.required">Введите данные</div>
                </template>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field
                  type="text"
                  color="green"
                  v-model="editedItem.photos"
                  label="Фото"
                  @input="$v.editedItem.photos.$touch()"
                ></v-text-field>
                <template v-if="isInvalidPhotos">
                  <div class="caption invalid-message" v-if="!$v.editedItem.photos.required">Введите данные</div>
                </template>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field
                  type="text"
                  color="green"
                  v-model="editedItem.unit"
                  label="Единица измерения"
                  @input="$v.editedItem.unit.$touch()"
                ></v-text-field>
                <template v-if="isInvalidUnit">
                  <div class="caption invalid-message" v-if="!$v.editedItem.unit.required">Введите данные</div>
                </template>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field
                  type="number"
                  color="green"
                  v-model="editedItem.weight"
                  label="Масса"
                  @input="$v.editedItem.weight.$touch()"
                ></v-text-field>
                <template v-if="isInvalidWeight">
                  <div class="caption invalid-message" v-if="!$v.editedItem.weight.required">Введите данные</div>
                </template>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field
                  type="number"
                  color="green"
                  v-model="editedItem.purchasePrice"
                  label="Закупочная цена"
                  @input="$v.editedItem.purchasePrice.$touch()"
                ></v-text-field>
                <template v-if="isInvalidPurchasePrice">
                  <div class="caption invalid-message" v-if="!$v.editedItem.purchasePrice.required">Введите данные</div>
                </template>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field
                  type="number"
                  color="green"
                  v-model="editedItem.minPrice"
                  label="Минимальная цена"
                  @input="$v.editedItem.minPrice.$touch()"
                ></v-text-field>
                <template v-if="isInvalidMinPrice">
                  <div class="caption invalid-message" v-if="!$v.editedItem.minPrice.required">Введите данные</div>
                </template>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field
                  type="number"
                  color="green"
                  v-model="editedItem.sellingPrice"
                  label="Цена продажи"
                  @input="$v.editedItem.sellingPrice.$touch()"
                ></v-text-field>
                <template v-if="isInvalidSellingPrice">
                  <div class="caption invalid-message" v-if="!$v.editedItem.sellingPrice.required">Введите данные</div>
                </template>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field
                  type="number"
                  color="green"
                  v-model="editedItem.NDS"
                  label="НДС"
                  @input="$v.editedItem.NDS.$touch()"
                ></v-text-field>
                <template v-if="isInvalidNDS">
                  <div class="caption invalid-message" v-if="!$v.editedItem.NDS.required">Введите данные</div>
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
                  v-model="editedItem.groupId"
                  label="Группа"
                  @input="$v.editedItem.groupId.$touch()"
                ></v-text-field>
                <template v-if="isInvalidGroupId">
                  <div class="caption invalid-message" v-if="!$v.editedItem.groupId.required">Введите данные</div>
                </template>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field
                  type="text"
                  color="green"
                  v-model="editedItem.providerId"
                  label="Поставщик"
                  @input="$v.editedItem.providerId.$touch()"
                ></v-text-field>
                <template v-if="isInvalidProviderId">
                  <div class="caption invalid-message" v-if="!$v.editedItem.providerId.required">Введите данные</div>
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
      :items="materialsData"
      class="user-container__table"
    >
      <template v-slot:items="props">
        <td>{{ props.item.photos }}</td>
        <td>{{ props.item.code }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.vendorCode }}</td>
        <td>{{ props.item.unit }}</td>
        <td>{{ props.item.weight }}</td>
        <td>{{ props.item.purchasePrice }}</td>
        <td>{{ props.item.minPrice }}</td>
        <td>{{ props.item.sellingPrice }}</td>
        <td>{{ props.item.NDS }}</td>
        <td>{{ props.item.groupId }}</td>
        <td>{{ props.item.providerId }}</td>
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
  import MaterialApi from '~/api/material';
  import { minLength, email, required } from 'vuelidate/lib/validators';
  import _ from 'lodash';

  export default {
    mixins: [ FormHelper ],
    props: {
      materials: {
        type: Array
      }
    },
    data: () => ({
      dialog: false,
      headers: [
        { text: 'Фото', value: 'photos' },
        { text: 'Код товара', value: 'code' },
        { text: 'Наименование', value: 'name' },
        { text: 'Артикул', value: 'vendorCode' },
        { text: 'Единица измерения', value: 'unit' },
        { text: 'Масса', value: 'weight' },
        { text: 'Закупочная цена', value: 'purchasePrice' },
        { text: 'Минимальная цена', value: 'minPrice' },
        { text: 'Цена продажи', value: 'sellingPrice' },
        { text: 'НДС', value: 'NDS' },
        { text: 'Группа', value: 'groupId' },
        { text: 'Поставщик', value: 'providerId' },
        { text: 'Действия', value: 'name', align: 'center', sortable: false }
      ],
      materialsData: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        code: '',
        vendorCode: '',
        photos: '',
        unit: '',
        weight: '',
        purchasePrice: '',
        minPrice: '',
        sellingPrice: '',
        NDS: '',
        description: '',
        groupId: '',
        providerId: ''
      },
      defaultItem: {
        name: '',
        code: '',
        vendorCode: '',
        photos: '',
        unit: '',
        weight: '',
        purchasePrice: '',
        minPrice: '',
        sellingPrice: '',
        NDS: '',
        description: '',
        groupId: '',
        providerId: ''
      }
    }),
    validations: {
      editedItem: {
        name: {
          required
        },
        code: {
          required
        },
        vendorCode: {
          required
        },
        photos: {
          required
        },
        unit: {
          required
        },
        weight: {
          required
        },
        purchasePrice: {
          required
        },
        minPrice: {
          required
        },
        sellingPrice: {
          required
        },
        NDS: {
          required
        },
        description: {
          required
        },
        groupId: {
          required
        },
        providerId: {
          required
        }
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Добавить материал' : 'Редактировать материал'
      },
      isInvalidName () {
        return this.$v.editedItem.name.$dirty && this.$v.editedItem.name.$invalid;
      },
      isInvalidCode () {
        return this.$v.editedItem.code.$dirty && this.$v.editedItem.code.$invalid;
      },
      isInvalidVendorCode () {
        return this.$v.editedItem.vendorCode.$dirty && this.$v.editedItem.vendorCode.$invalid;
      },
      isInvalidPhotos () {
        return this.$v.editedItem.photos.$dirty && this.$v.editedItem.photos.$invalid;
      },
      isInvalidUnit () {
        return this.$v.editedItem.unit.$dirty && this.$v.editedItem.unit.$invalid;
      },
      isInvalidWeight () {
        return this.$v.editedItem.weight.$dirty && this.$v.editedItem.weight.$invalid;
      },
      isInvalidPurchasePrice () {
        return this.$v.editedItem.purchasePrice.$dirty && this.$v.editedItem.purchasePrice.$invalid;
      },
      isInvalidMinPrice () {
        return this.$v.editedItem.minPrice.$dirty && this.$v.editedItem.minPrice.$invalid;
      },
      isInvalidSellingPrice () {
        return this.$v.editedItem.sellingPrice.$dirty && this.$v.editedItem.sellingPrice.$invalid;
      },
      isInvalidNDS () {
        return this.$v.editedItem.NDS.$dirty && this.$v.editedItem.NDS.$invalid;
      },
      isInvalidDescription () {
        return this.$v.editedItem.description.$dirty && this.$v.editedItem.description.$invalid;
      },
      isInvalidGroupId () {
        return this.$v.editedItem.groupId.$dirty && this.$v.editedItem.groupId.$invalid;
      },
      isInvalidProviderId () {
        return this.$v.editedItem.providerId.$dirty && this.$v.editedItem.providerId.$invalid;
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      products (val) {
        this.materialsData = _.cloneDeep(val);
      }
    },
    created () {
      this.materialsData = _.cloneDeep(this.materials);
    },
    methods: {
      addRequest (product) {
        MaterialApi.add(product)
          .then((data) => this.$emit('getMaterials'))
          .catch(error => console.log(error));
      },
      editRequest (product) {
        MaterialApi.edit(product)
          .then((data) => this.$emit('getMaterials'))
          .catch(error => console.log(error));
      },
      deleteRequest (id) {
        MaterialApi.delete({ id: id })
          .then((data) => this.$emit('getMaterials'))
          .catch(error => console.log(error));
      },
      editItem (item) {
        this.editedIndex = this.materialsData.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },
      deleteItem (item) {
        confirm('Вы уверены, что хотите удалить этот материал?') && this.deleteRequest(item._id);
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
  .material-container {
    margin: 30px;
    border: none !important;
    box-shadow: 0 1px 5px 0 rgba(0,0,0,0.1) !important;

    &__table {
    }
  }

</style>
