<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height style="background: #F5F5F5">
        <v-row justify="center">
          <v-col cols="auto">
            <router-view/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: 'AuthenticationLayout'
}
</script>
