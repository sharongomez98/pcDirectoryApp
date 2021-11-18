<template>
  <v-app>
      <v-app-bar
        app
        color="grey darken-4"
        dark
        light
        elevation="6"
        elevate-on-scroll
        collapse="true"
      >
        <v-app-bar-nav-icon dark @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-checkbox
          v-model="expandSideBar"
          :on-icon="'mdi-pin'"
          :off-icon="'mdi-pin-off'"
          @change="repaint"
          color="white"
          hide-details
        ></v-checkbox>
      </v-app-bar>
      <v-navigation-drawer
        class="purple accent-4"
        dark
        v-model="drawer"
        app
        :expand-on-hover="!expandSideBar"
      >
        <v-toolbar color="purple accent-4" elevation="0">
          <v-icon color="white" large class="px-3">mdi-arrange-send-to-back</v-icon>
          <v-toolbar-title id="nav_toolbar">Arcadia</v-toolbar-title>
        </v-toolbar>
        <v-list dense nav>
          <v-list-item-group>
            <v-list-item class="pa-2" link to="/">
              <v-list-item-icon>
                <v-icon color="white">mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="userTitle">Regresar</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-list dense nav>
          <v-subheader class="navSubtitle">Menú</v-subheader>
          <v-list-item-group>
            <v-list-item
              class="pa-2"
              v-for="(item, index) in items"
              :key="index"
              :value="index"
              :to="item.to"
            >
              <v-list-item-icon>
                <v-icon color="white">{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="userTitle">{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-divider></v-divider>
      </v-navigation-drawer>
      <v-main>
        <div>
          <v-alert
            v-model="alert"
            :value="alert_active"
            :color="alert_color"
            :icon="alert_color == 'success' ? 'mdi-check-circle' : 'mdi-alert-circle'"
            dense
            text
            dismissible
            border="left"
            transition="scroll-y-transition"
          >
            {{ alert_message }}</v-alert
          >
        </div>
        <router-view @chanceAlert="changeAlert($event)"></router-view>
      </v-main>
  </v-app>
</template>

<script>
import store from "../../store/index";
export default {
  name: "Main",
  data: () => ({
    list: 0,
    expandSideBar: store.getters["expandSideBar"],
    username: store.getters["username"],
    drawer: true,
    alert: false,
    alert_active: false,
    alert_message: "",
    alert_color: "",
    items: [
      { title: "Componentes", icon: "mdi-puzzle", to: "/arcadia/components" },
      { title: "Categorías", icon: "mdi-tag", to: "/arcadia/categories" },
      { title: "Marcas", icon: "mdi-octagram", to: "/arcadia/brands" },
    ],
  }),
  computed: {
    sideBarIcon() {
      return this.expandSideBar === true ? "mdi-pin" : "mdi-pin-off";
    },
  },
  watch: {
    drawer: false,
  },

  mounted: function () {
    if (alert) {
      this.hideAlert();
    }
  },

  methods: {
    hideAlert() {
      window.setInterval(() => {
        this.alert = false;
      }, 10000);
    },
    repaint() {
      this.drawer = !this.drawer;
      this.drawer = !this.drawer;
      store.commit("setExpandSideBar", this.expandSideBar);
    },
    changeAlert(alert) {
      this.alert = alert.alert;
      this.alert_active = alert.alert_active;
      this.alert_color = alert.alert_color;
      this.alert_message = alert.alert_message;
    },
  },
};
</script>
<style>
#nav_toolbar {
  font-size: 36px !important;
  color: #ffffff !important;
  font-family: "Noto Serif" !important;
  font-weight: 700 !important;
}
.userTitle {
  font-family: "Montserrat" !important;
  font-size: 14px !important;
  font-weight: normal !important;
}
.navSubtitle {
  font-family: "Montserrat" !important;
  font-size: 20px !important;
  font-weight: 700 !important;
}
</style>
