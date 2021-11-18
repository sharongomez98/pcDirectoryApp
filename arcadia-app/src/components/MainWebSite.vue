<template>
  <v-app>
    <v-app-bar app color="purple accent-4" light elevation="6" elevate-on-scroll>
    <v-icon color="white" large class="pl-6">mdi-arrange-send-to-back</v-icon>
    <v-toolbar-title class="px-6">Arcadia</v-toolbar-title>
    <v-spacer />
    <v-list class="d-flex align-center" dense dark color="purple accent-4">
      <v-list-item link v-for="(menu, index) in menus" :key="index" :to="menu.route">
        <v-list-item-title id="item_title">{{ menu.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <template v-slot:extension>
      <v-tabs
        dark
        color="white"
        fixed-tabs
        background-color="#0B0A0A"
        show-arrows
        v-model="route"
        @change="$vuetify.goTo(target, options)"
        
      >
        <v-tabs-slider color="purple accent-4" ></v-tabs-slider>
        <v-tab v-for="(section, index) in sections" :key="index" >
          {{ section.title }}
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
    <v-main>
      <div ref="hero"><Hero /></div>
      <div ref="aboutUs"><AboutUs /></div>
      <div ref="actions"><Actions /></div>
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "MainWebSite",

  components: {
    Hero: () => import("./WebPage/Hero.vue"),
    AboutUs: () => import("./WebPage/AboutUs.vue"),
    Actions: () => import("./WebPage/Actions.vue"),
    Footer: () => import("./WebPage/Footer.vue"),
  },

  data: () => ({
    type: "element",
    selected: "",
    duration: 1000,
    offset: 0,
    easing: "easeInOutCubic",
    route: 0,
      menus: [
        { title: "Ingresar", route: "/arcadia/components" },
      ],
      sections: [
        { title: "Inicio" },
        { title: "Arcadía lo hace por ti" },
        { title: "Acciones" },
      ],
  }),
  computed: {
    target() {
      return this[this.type];
    },
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing,
      };
    },
    element() {
      if (this.route == 0) return this.$refs.hero;
      if (this.route == 1) return this.$refs.aboutUs;
      if (this.route == 2) return this.$refs.actions;
      else return null;
    },
  },
};
</script>
<style>

.v-toolbar__title {
  font-size: 36px !important;
  color: #ffffff !important;
  font-family: "Noto Serif" !important;
  font-weight: 700 !important;
}
#item_title {
  font-size: 16px !important;
  color: #ffffff !important;
  font-family: "Montserrat" !important;
  font-weight: 500 !important;
}
.v-tabs {
  height: 4rem !important;
  margin: -120px !important;
}
.v-tab {
  font-size: 16px !important;
  text-transform: none !important;
  font-family: "Montserrat" !important;
  font-weight: 400 !important;
}
</style>
