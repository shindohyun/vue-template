<template>
  <v-app>
    <v-app-bar 
      app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title>Vue Template</v-app-bar-title>
      <v-container :class="$vuetify.breakpoint.mobile? 'd-none' : 'd-block'">
        <v-row justify="end">
          <v-col align-self="center" cols="auto">
            <v-btn depressed color="transparent"  @click="$router.push('/authentication/signin')">
              SIGNIN
            </v-btn>
          </v-col>
          <v-col align-self="center" cols="auto">
            <v-btn outlined dark @click="$router.push('/authentication/signup')">
              SIGNUP
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Dohyun
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-footer class="pa-4" :class="$vuetify.breakpoint.mobile? 'd-block' : 'd-none'" inset app>
        <v-btn color="primary" class="mb-2" block @click="$router.push('/authentication/signin')">SIGNIN</v-btn>
        <v-btn color="primary" outlined block @click="$router.push('/authentication/signup')">SIGNUP</v-btn>
      </v-footer>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'DefaultLayout',
  data: () => ({
    drawer: false,
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/dashboard'},
      { title: 'Grid-System', icon: 'mdi-view-dashboard', to: '/grid-system'},
    ],
    right: null,
  }),
};
</script>
<style>
.v-app-bar-title__content{
  width: min-content !important;
}
</style>
