<template ref="#aboutUs">
  <v-sheet class="pa-12 mx-14 my-10">
    <p></p>
    <h2 class="section-title text-center">Arcadia lo hace por ti</h2>
    <v-spacer></v-spacer>
    <p class="description text-center my-12">
      Arcadia es un directorio público de componentes de computadora. Navegar y
      experimentar las funcionalidades de nuestro sitio te permitirá conocer la variedad
      de componentes que existen en el mercado o que alguna vez estuvieron en él. Nuestra
      página se divide en 3 sectores:
    </p>
    <v-spacer></v-spacer>
    <v-row justify="space-around">
      <v-col v-for="(value, index) in values" :key="index" lg="2" md="2" sx="2">
        <v-hover>
          <template v-slot:default="{ hover }">
            <div
              :class="`elevation-${hover ? 24 : 0}`"
              class="transition-swing"
            >
              <v-container fluid>
                <v-layout justify-center>
                  <v-sheet>
                    <v-sheet class="mx-auto my-2" color="purple accent-4" rounded>
                      <v-container fill-height fluid>
                        <v-layout align-center justify-center>
                          <v-icon size="150" color="white">{{ value.icon }}</v-icon>
                        </v-layout>
                      </v-container>
                    </v-sheet>
                    <h3 class="text-center item-title">{{ value.title }}</h3>
                    <p class="text-center text">{{ value.text }}</p>
                  </v-sheet>
                </v-layout>
              </v-container>
            </div>
          </template>
        </v-hover>
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-col v-for="(value, index) in values2" :key="index" lg="2" md="2" sx="2">
        <v-hover>
          <template v-slot:default="{ hover }">
            <div
              :class="`elevation-${hover ? 24 : 0}`"
              class="mx-auto transition-swing"
            >
              <v-container fluid>
                <v-layout justify-center>
                  <v-sheet>
                    <v-sheet  color="purple accent-4" rounded>
                      <v-container fill-height fluid>
                        <v-layout align-center justify-center>
                          <v-icon size="150" color="white">{{ value.icon }}</v-icon>
                        </v-layout>
                      </v-container>
                    </v-sheet>
                    <h3 class="text-center item-title">{{ value.title }}</h3>
                    <p class="text-center text">{{ value.text }}</p>
                  </v-sheet>
                </v-layout>
              </v-container>
            </div>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script>
export default {
  name: "AboutUs",
  data() {
    return {
      values: [
        {
          title: "Componentes",
          icon: "mdi-puzzle",
          text: "Verás el listado de componentes registrados en Arcadia.",
        },
      ],
      values2: [
        {
          title: "Categorías",
          icon: "mdi-tag",
          text: "Puedes registrar categorías para organizar fácilmente tus componentes.",
        },
        {
          title: "Marcas",
          icon: "mdi-octagram",
          text: "Puedes agregar las marcas de tus componentes favoritos.",
        },
      ],
    };
  },
};
</script>

<style>
h2.section-title {
  font-size: 50px !important;
  color: #212121 !important;
  font-family: "Noto Serif" !important;
  font-weight: 600 !important;
}
h3.item-title {
  color: #212121 !important;
  font-family: "Montserrat" !important;
  font-weight: 500 !important;
}

p.description {
  font-family: "Montserrat" !important;
  font-size: 18px !important;
  margin: 32px 0px !important;
  color: #212121 !important;
}
p.text {
  font-family: "Montserrat" !important;
  font-size: 18px !important;
  margin: 32px 0px !important;
  color: #212121 !important;
}
</style>
