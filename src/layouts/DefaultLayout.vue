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
            <v-container>
              <v-row v-for="link in links" :key="link.title" class="my-1">
                <v-col cols="auto" class="pa-0">
                  <v-icon>{{ link.icon }}</v-icon>
                </v-col>
                <v-col align-self="center" class="pa-0">
                  <a class="font-weight-bold text-decoration-none ms-4" :href="link.link" target="_blank">{{ link.title }}</a>
                </v-col>
              </v-row>
            </v-container>
          </v-list-item-subtitle>
          <v-switch
            style="width: 100%;"
            class="pa-2 mt-0"
            v-model="$vuetify.theme.dark"
            inset
            label="Dark Mode"
            append-icon="mdi-brightness-4"
            hide-details>
          </v-switch>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <div v-for="item in items" :key="item.title">
          <v-list-item v-if="item.items == null"
            link
            :to="item.to">
            <v-list-item-icon>
              <v-icon>{{ item.action }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            v-else
            v-model="item.active"
            :prepend-icon="item.action"
            no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="child in item.items"
              :key="child.title"
              :to="child.to">
              <v-list-item-content>
                <v-list-item-title v-text="child.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
      <template v-slot:append>
        <div class="pa-2" :class="$vuetify.breakpoint.mobile? 'd-block' : 'd-none'">
          <v-btn color="primary" class="mb-2" block @click="$router.push('/authentication/signin')">SIGNIN</v-btn>
          <v-btn color="primary" outlined block @click="$router.push('/authentication/signup')">SIGNUP</v-btn>
        </div>
      </template>
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
    links: [
      {
        title: 'GitHub',
        link: 'https://github.com/shindohyun',
        icon: 'mdi-github'
      },
      {
        title: 'Blog',
        link: 'https://shindohyun.github.io',
        icon: 'mdi-book-open-page-variant'
      },
      {
        title: 'Email',
        link: 'mailto:shindohyunx@gmail.com',
        icon: 'mdi-email'
      }
    ],
    items: [
      { 
        title: 'Dashboard', 
        action: 'mdi-view-dashboard', 
        to: '/dashboard'
      },
      {
        title: 'Bulletin Board',
        action: 'mdi-bulletin-board',
        to: '/bulletin-board'
      },
      {
        title: 'Card List',
        action: 'mdi-card-bulleted',
        to: '/card-list'
      }
    ]
  })
};
</script>
