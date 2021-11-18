<template>
  <v-sheet height="880">
    <v-img
      width="100%"
      min-height="768px"
      max-height="840"
      src="../../assets/hero.jpg"
      class="mx-auto"
      alt=""
    >
      <v-sheet height="880" color="rgba(0, 0, 0, 0.32)">
        <v-container fill-height fluid>
          <v-row align="center" justify="start">
            <v-col class="mx-13">
              <h2 class="intro-text">Explora tus componentes</h2>
              <p class="description-hero" >
                Arcadía es una plataforma pública que te permite organizar tus componentes favoritos por marcas y categorías. 
              </p>
              <p class="description-hero" >
                Empieza ya a agregar tus componentes.
              </p>
              <v-btn color="purple accent-4" dark x-large  to="/arcadia/components">¡Ingresa Ya!</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-img>
  </v-sheet>
</template>

<script>
export default {
  name: "Hero",
};
</script>

<style>
.v-sheet {
  margin: 0px 0px !important;
}
h2.intro-text {
  font-size: 60px !important;
  color: #ffffff;
  font-family: "Noto Serif" !important;
  font-weight: bold !important;
}
p.description-hero {
  font-family: "Montserrat" !important;
  font-size: 19px !important;
  margin: 32px 0px !important;
  color: #ffffff;
}
.v-btn {
  font-size: 16px !important;
  text-transform: none !important;
  font-family: "Montserrat" !important;
  font-weight: 500 !important;
}
</style>
