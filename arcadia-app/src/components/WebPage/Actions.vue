<template ref="#aboutUs">
  <v-sheet class="pa-12 mx-14 my-10">
    <p></p>
    <h2 class="section-title text-center">Acciones</h2>
    <v-spacer></v-spacer>
    <p class="description text-center my-12">
      Las acciones que puedes realizar en Arcadia son las operaciones básicas de un CRUD:
      Create, Read, Update y Delete, las cuales te explicamos a continuación:
    </p>
    <v-spacer></v-spacer>
    <v-row justify="space-around">
      <v-col v-for="(value, index) in values" :key="index" lg="3" md="4" sx="12">
        <v-hover>
          <template v-slot:default="{ hover }">
            <div
              :class="`elevation-${hover ? 24 : 0}`"
              class="mx-auto pa-4 transition-swing"
            >
              <v-sheet class="pa-10" height="400">
                <v-sheet class="mx-auto my-2" height="150" width="150">
                  <v-icon size="150" color="purple accent-4">{{ value.icon }}</v-icon>
                </v-sheet>
                <h3 class="text-center item-title">{{ value.title }}</h3>
                <p class="text-center text">{{ value.text }}</p>
              </v-sheet>
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
          title: "Ver",
          icon: "mdi-eye",
          text: "Ve el listado de componentes, categorías y marcas disponibles en Arcadia.",
        },
        {
          title: "Guardar",
          icon: "mdi-content-save",
          text: "Crea componentes, categorías y marcas y ve tu publicación en el listado oficial.",
        },
        {
          title: "Editar",
          icon: "mdi-pencil",
          text: "Deseas actualizar la información, puedes editar tu publicación sin problemas.",
        },
        {
          title: "Eliminar",
          icon: "mdi-delete",
          text:
            "Cometiste un error, no te preocupes puedes eliminar tus publicaciones cuando quieras.",
        },
      ],
    };
  },
};
</script>

<style>
h2.section-title {
  font-size: 48px !important;
  color: #212121 !important;
  font-family: "Noto Serif" !important;
  font-weight: bold !important;
}
h3.item-title {
  color: #212121 !important;
  font-family: "Montserrat" !important;
  font-weight: bold !important;
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
