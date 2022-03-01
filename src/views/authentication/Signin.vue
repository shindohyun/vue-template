<template>
  <v-card class="px-8 py-16" :width="$vuetify.breakpoint.mobile? 'auto' : 480">
    <v-card-title class="text-h5 mb-6">Welcome to Vue Template</v-card-title>
    <v-card-text>
      <form @submit.prevent="submit()">
        <v-text-field 
          class="mb-4"
          v-model="email" 
          label="E-mail" 
          required
          outlined
          hide-details>
        </v-text-field>
        <v-text-field 
          v-model="password" 
          label="Password" 
          required
          outlined
          hide-details
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword">
        </v-text-field>
        <v-container class="my-6 pa-0">
          <router-link class="font-weight-bold text-decoration-none" to="/authentication/reset-password">Forgot password?</router-link>
        </v-container>
        <v-btn type="submit" color="primary" block x-large>
          Sign In
        </v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'Signin',
  data: () => ({
    email: '',
    password: '',
    showPassword: false
  }),
  methods: {
    submit: () => {
      console.log('sign in!')
    }
  }
}
</script>
