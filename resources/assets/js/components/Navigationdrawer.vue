<template>
    <v-layout wrap>
        <v-navigation-drawer v-model="drawer" :mini-variant="mini" absolute temporary color="primary">
            <v-list class="pa-1">
                <v-list-tile v-if="mini" @click.stop="mini = !mini">
                    <v-list-tile-action>
                        <v-icon>chevron_right</v-icon>
                    </v-list-tile-action>
                </v-list-tile>

                <v-list-tile avatar tag="div">
                    <v-list-tile-avatar>
                        <img src="https://yt3.ggpht.com/-TyxgQYDx-lI/AAAAAAAAAAI/AAAAAAAAAAA/UwM3eRMLuKM/s88-c-k-no-mo-rj-c0xffffff/photo.jpg">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>Bùi Anh Tuấn</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-btn icon @click.stop="mini = !mini">
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>

            <v-list class="pt-0" dense>
                <v-divider light></v-divider>

                <v-list-tile v-for="item in items" :key="item.title">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

            </v-list>
        </v-navigation-drawer>
    </v-layout>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      mini: false,
      items: [
        { title: "Home", icon: "dashboard", link: "../views/Home.vue" },
        { title: "About", icon: "question_answer", link: "../views/About.vue" }
      ]
    };
  },
  watch: {}
};
</script>

