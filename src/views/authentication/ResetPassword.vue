<template>
  <v-card class="px-8 py-16" :width="$vuetify.breakpoint.mobile? 'auto' : 480">
    <v-card-title class="text-h5 justify-center">Forgot Your Password?</v-card-title>
    <p class="text-center my-3 mx-2 font-weight-light">Enter your email address and we will send you instructions to reset your password.</p>
    <v-card-text>
      <form @submit.prevent="submit()">
        <v-text-field 
          v-model="email" 
          label="E-mail" 
          required
          outlined>
        </v-text-field>
        <v-btn type="submit" color="primary" block x-large>
          Send email
        </v-btn>
        <v-container>
          <v-row justify="center">
            <v-col cols="auto" class="mt-3">
              <router-link class="font-weight-bold text-decoration-none" to="/authentication/signin">Back to Login</router-link>
            </v-col>
          </v-row>
        </v-container>
      </form>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'ResetPassword',
  data: () => ({
    email: ''
  }),
  methods: {
    submit: () => {
      console.log('send email!')
    }
  }
}
</script>
