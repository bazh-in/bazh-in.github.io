<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="true"
        hide-overlay
        permanent
        floating
        mini-variant-width="100"
        class="drawer-menu"
      >
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile class="drawer-menu-avatar">
              <v-list-tile-avatar>
                XuRMa
              </v-list-tile-avatar>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-list>
          <v-divider></v-divider>

          <v-list-tile
            v-for="item in items"
            :key="item.title"
            class="mt-1 mb-1 drawer-menu-item-wrapper"
            :class="{'active': item.route === $route.name }"
            @click="changeRoute(item.route)"
          >
            <v-list-tile-action class="drawer-menu-item" :class="{'active': item.route === $route.name }">
              <v-icon class="pt-2 mb-2" :color="item.route === $route.name ? 'green' : ''">{{ item.icon }}</v-icon>
              <div class="caption">{{ item.title }}</div>
            </v-list-tile-action>

          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-navigation-drawer
        v-if="displaySubDrawer"
        v-model="subDrawer"
        hide-overlay
        permanent
        floating
        class="drawer-menu"
        width="170"
      >
        <v-list color="grey" dense>
          <v-list-tile
            v-for="item in activeSubItems"
            :key="item.title"
            @click="changeRoute(item.route)"
            class="drawer-submenu-item-wrapper"
            :class="{'active': item.route === $route.name }"
          >
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.title }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <div class="main-container" :class="{'--with-submenu': $route.name.indexOf('stock') + 1 }">
        <v-toolbar color="white" flat>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn flat>Link One</v-btn>
            <v-btn flat>Link Two</v-btn>
            <v-btn flat>Link Three</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <nuxt/>
      </div>
    </v-layout>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Главная', icon: 'dashboard', isActive: true, route: 'index' },
          /*{ title: 'Пользователи', icon: 'group', isActive: false, route: 'users' },*/
          { title: 'Задачи', icon: 'description', isActive: false, route: 'tasks' },
          { title: 'Сделки', icon: 'assignment', isActive: false, route: 'deals' },
          { title: 'Клиенты', icon: 'group', isActive: false, route: 'counterparties' },
          { title: 'Склад', icon: 'store', isActive: false, route: 'stock-products' },
          /*{ title: 'Реклама', icon: 'question_answer', isActive: false, route: 'marketing' },*/
          /*{ title: 'Документы', icon: 'question_answer', isActive: false, route: 'documents' },*/
          { title: 'Чат', icon: 'chat', isActive: false, route: 'chat' },
          { title: 'Настройки', icon: 'settings', isActive: false, route: 'settings-users' },
        ],
        mini: true,
        right: null,

        displaySubDrawer: false,
        subDrawer: true,
        activeSubItems: [],
        subItemsStock: [
          { title: 'Товары', route: 'stock-products' },
          { title: 'Материалы', route: 'stock-materials' },
          { title: 'Поставщики', route: 'stock-providers' }
        ],

        subItemsSettings: [
          { title: 'Пользователи', route: 'settings-users' },
          { title: 'Воронка продаж', route: 'settings-salesFunnel' }
        ],
      }
    },
    watch: {
      '$route.name' (val) {
        console.log(val);
        if (val.indexOf('stock') + 1) {
          this.activeSubItems = this.subItemsStock;
          this.displaySubDrawer = true;
        } else if (val.indexOf('settings') + 1) {
          this.activeSubItems = this.subItemsSettings;
          this.displaySubDrawer = true;
        } else {
          this.displaySubDrawer = false;
        }
        //$route.name.indexOf('stock') + 1

        /*switch (a) {
          case 3:
            alert( 'Маловато' );
            break;
          case 4:
            alert( 'В точку!' );
            break;
          case 5:
            alert( 'Перебор' );
            break;
          default:
            alert( 'Я таких значений не знаю' );
        }*/
      }
    },
    beforeMount () {
      if (this.$route.name.indexOf('stock') + 1) {
        this.activeSubItems = this.subItemsStock;
        this.displaySubDrawer = true;
      } else if (this.$route.name.indexOf('settings') + 1) {
        this.activeSubItems = this.subItemsSettings;
        this.displaySubDrawer = true;
      } else {
        this.displaySubDrawer = false;
      }
    },
    methods: {
      changeRoute (route) {
        this.$router.push({ name: route });
      }
    }
  }
</script>

<style lang="scss">
  .main-container {
    width: calc(100vw - 100px);
    background: linear-gradient(180deg, #ffffff, #fdfdfd);

    &.--with-submenu {
      width: calc(100vw - 270px);
    }
  }

  .drawer-menu {
    height: 100vh !important;
    box-shadow: 0 1px 8px 0 rgba(0,0,0,0.1) !important;
  }

  .drawer-menu-avatar .v-list__tile {
    justify-content: center;
  }

  .drawer-menu-item-wrapper {
    height: 70px !important;
    cursor: pointer;

    &.active {
      border-right: 2px solid #51bb4b;
    }

    & .v-list__tile--link {
      height: 100%;
    }
  }

  .drawer-menu-item {
    width: 100%;
    align-items: center !important;

    &.active {
      color: #51bb4b !important;
    }
  }

  .drawer-submenu-item-wrapper {
    &.active {
      color: #51bb4b !important;
    }

  }
</style>
