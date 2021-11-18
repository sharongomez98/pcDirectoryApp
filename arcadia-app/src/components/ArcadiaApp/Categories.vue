<template>
  <v-container ma-0 pa-0 fluid>
    <v-layout class="pt-6">
      <v-card color="grey darken-4" dark>
        <v-card-title class="mx-6"
          ><v-icon large class="mx-3"> mdi-octagram </v-icon>Categorías</v-card-title
        >
      </v-card>
    </v-layout>

    <div>
      <v-container fluid fill-height>
        <v-layout child-flex>
          <v-data-table
            :headers="headers"
            :items="categories"
            :loading="loading"
            loading-text="Cargando... Por favor espere"
            class="elevation-6"
            :footer-props="{
              'items-per-page-text': 'Categorías por página',
              'items-per-page-all-text': 'Todos',
              'page-text': '{0}-{1} de {2}',
            }"
          >
            <template v-slot:item.image="{ item }">
              <div class="d-flex justify-center pa-3">
                <v-avatar height="100" width="100" tile>
                  <v-img :src="item.image" contain></v-img>
                </v-avatar>
              </div>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    class="pa-2"
                    @click="editItem(item)"
                  >
                    mdi-pencil
                  </v-icon>
                </template>
                <span>Editar</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="error"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    class="pa-2"
                    @click="deleteItem(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                <span>Eliminar</span>
              </v-tooltip>
            </template>
            <template v-slot:no-data>
              <span
                >La lista de categorías esta vacía. Agrega una categoría para verla en la
                lista.</span
              >
            </template>
            <template v-slot:top>
              <v-card elevation="0">
                <v-dialog v-model="dialog" max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-layout justify-end>
                      <v-btn
                        class="ma-6"
                        color="grey darken-4"
                        dark
                        x-large
                        v-bind="attrs"
                        v-on="on"
                        >Nueva Categoría</v-btn
                      >
                    </v-layout>
                  </template>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-subheader>Nombre de la categoría</v-subheader>
                          <v-row class="py-3">
                            <v-text-field
                              v-model="editedItem.name"
                              solo
                              :counter="30"
                              :rules="nameRules"
                              required
                            ></v-text-field>
                          </v-row>
                          <v-subheader>Descripción de la categoría</v-subheader>
                          <v-row class="py-3">
                            <v-textarea
                              v-model="editedItem.description"
                              solo
                              :counter="255"
                              :rules="descriptionRules"
                              required
                            ></v-textarea>
                          </v-row>
                          <v-subheader>Imagen de la categoría</v-subheader>
                          <v-row class="py-3">
                            <v-textarea
                              v-model="editedItem.image"
                              solo
                              :counter="255"
                              :rules="imageRules"
                              required
                              label="Ingrese la URL de la imagen"
                            ></v-textarea>
                          </v-row>
                          <v-layout justify-center class="py-3">
                            <v-card elevation="0">
                              <v-img :src="editedItem.image"></v-img>
                            </v-card>
                          </v-layout>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed @click="close"> Cancelar </v-btn>
                        <v-btn
                          depressed
                          color="primary"
                          :loading="loading"
                          @click="save(editedItem)"
                        >
                          Guardar
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-form>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title
                      >¿Esta seguro que desea eliminar este elemento?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn depressed @click="closeDelete">Cancelar</v-btn>
                      <v-btn
                        depressed
                        color="error"
                        :loading="loading"
                        @click="deleteItemConfirm(editedItem.id)"
                        >Eliminar</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card>
            </template>
          </v-data-table>
        </v-layout>
      </v-container>
    </div>
  </v-container>
</template>
<script>
import axios from "axios";

export default {
  name: "Categories",
  data: () => ({
    loading: true,
    dialog: false,
    dialogDelete: false,
    loadView: true,
    headers: [
      { text: "Nombre", align: "center", value: "name", sortable: false },

      { text: "Imagen", align: "center", value: "image", sortable: false },
      { text: "Descripción", align: "left", value: "description", sortable: false },
      { text: "Actiones", align: "center", value: "actions", sortable: false },
    ],
    nameRules: [
      (v) => !!v || "El nombre de la categoría es requerido.",
      (v) =>
        (v && v.length <= 30) ||
        "El nombre de la categoría debe tener menos de 30 caracteres.",
    ],
    descriptionRules: [
      (v) => !!v || "La descripción de la categoría es requerida.",
      (v) =>
        (v && v.length <= 255) ||
        "La descripción de la categoría debe tener menos de 255 caracteres.",
    ],
    imageRules: [
      (v) => !!v || "La URL de la imagen de la categoría es requerida.",
      (v) =>
        (v && v.length <= 255) ||
        "La URL de la imagen de la categoría debe tener menos de 255 caracteres.",
    ],
    categories: [],
    editedIndex: -1,
    editedItem: {
      brandId: "",
      name: "",
      description: "",
      color: "",
    },
    defaultItem: {
      brandId: "",
      name: "",
      description: "",
      color: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Categoría" : "Editar Categoría";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.loading = true;
    this.initialize();
  },

  methods: {
    initialize() {
      axios
        .get("category/")
        .then((response) => {
          if (response.status == 200) {
            this.loading = false;
            this.categories = response.data;
          }
        })
        .catch((error) => {
          this.loading = false;
          console.log(error.response.status);
          let alert = {
            alert: true,
            alert_active: true,
            alert_message:
              "No se pudo obtener la lista de categorías. Intente de nuevo más tarde.",
            alert_color: "error",
          };
          this.$emit("chanceAlert", alert);
        });
    },

    editItem(item) {
      this.editedIndex = this.categories.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.categories.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm(brandId) {
      this.loading = true;
      axios
        .delete("category/" + brandId)
        .then((response) => {
          if (response.status == 200) {
            let alert = {
              alert: true,
              alert_active: true,
              alert_message: "Categoría eliminada correctamente.",
              alert_color: "success",
            };
            this.initialize();
            this.$emit("chanceAlert", alert);
          }
        })
        .catch((error) => {
          this.loading = false;
          console.log(error.response.status);
          let alert = {
            alert: true,
            alert_active: true,
            alert_message:
              "No se pudo eliminar la categoría. Intente de nuevo más tarde.",
            alert_color: "error",
          };
          this.loading = false;
          this.$emit("chanceAlert", alert);
        });
      this.closeDelete();
    },

    close() {
      this.$refs.form.reset();
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save(item) {
      if (this.$refs.form.validate()) {
        let cleanAlert = {
          alert: false,
          alert_active: false,
          alert_message: "",
          alert_color: "",
        };
        this.$emit("chanceAlert", cleanAlert);
        this.loading = true;
        if (this.editedIndex == -1) {
          let json = {
            name: item.name,
            description: item.description,
            image: item.image,
          };
          axios
            .post("category/", json)
            .then((response) => {
              if (response.status == 200) {
                let alert = {
                  alert: true,
                  alert_active: true,
                  alert_message: "Categoría creada correctamente.",
                  alert_color: "success",
                };
                this.initialize();
                this.$emit("chanceAlert", alert);
              }
            })
            .catch((error) => {
              console.log(error.response.status);
              let alert = {
                alert: true,
                alert_active: true,
                alert_message:
                  "No se pudo crear la categoría. Intente de nuevo más tarde.",
                alert_color: "error",
              };
              this.loading = false;
              this.$emit("chanceAlert", alert);
            });
        } else {
          let json = {
            brandId: item.id,
            name: item.name,
            description: item.description,
            image: item.image,
          };
          console.log("put", json);
          axios
            .put("category/" + json.brandId, json)
            .then((response) => {
              if (response.status == 200) {
                let alert = {
                  alert: true,
                  alert_active: true,
                  alert_message: "Categoría editada correctamente.",
                  alert_color: "success",
                };
                this.initialize();
                this.$emit("chanceAlert", alert);
              }
            })
            .catch((error) => {
              console.log(error.response.status);
              let alert = {
                alert: true,
                alert_active: true,
                alert_message:
                  "No se pudo editar la categoría´. Intente de nuevo más tarde.",
                alert_color: "error",
              };
              this.loading = false;
              this.$emit("chanceAlert", alert);
            });
        }
        this.close();
      }
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
<style>
.card-title {
  padding: 0px 0px;
}
</style>
