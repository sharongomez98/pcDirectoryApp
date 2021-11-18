<template>
  <v-footer color="#0B0A0A" dark class="pa-10">
    <v-sheet class="flex" color="transparent">
      <v-row justify="center" no-gutters class="px-12">
        <v-icon color="white" large>mdi-arrange-send-to-back</v-icon>
        <h2 class="footer-title px-6">Arcadia</h2>
        <v-spacer />
        <h3 class="footer-item pa-4">Powered By The Flame Hashira </h3>
        <v-avatar size="60" >
          <v-img src="../../assets/rengoku.jpg" alt="Rengoku Kyojuros"></v-img>
        </v-avatar>
      </v-row>
    </v-sheet>
  </v-footer>
</template>
<script>
export default {
  name: "Footer",
};
</script>
<style>
h2.footer-title {
  font-size: 36px !important;
  font-family: "Noto Serif" !important;
  font-weight: 700 !important;
}
h3.footer-item {
  font-family: "Montserrat" !important;
  font-weight: 600 !important;
}
</style>
