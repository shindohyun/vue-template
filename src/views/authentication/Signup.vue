<template>
  <v-card class="px-8 py-16" :width="$vuetify.breakpoint.mobile? 'auto' : 480">
    <v-card-title class="font-weight-black">Sign Up</v-card-title>
    <v-card-text>
      Already have an account? <router-link class="font-weight-bold text-decoration-none" to="/authentication/signin">Sign In</router-link>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="submit(invalid)">
          <validation-provider v-slot="{ errors }" name="이메일" rules="required|email">
            <v-text-field 
              v-model="email" 
              :error-messages="errors" 
              placeholder="E-mail" 
              required>
            </v-text-field>
          </validation-provider>
          <validation-provider v-slot="{ errors }" name="비밀번호" rules="required|password">
            <v-text-field 
              v-model="password" 
              :error-messages="errors" 
              placeholder="Password" 
              required 
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword">
            </v-text-field>
          </validation-provider>
          <validation-provider v-slot="{ errors }" name="비밀번호 확인" rules="required|confirmed:@비밀번호">
            <v-text-field 
              v-model="confirmPassword"
              :error-messages="errors" 
              placeholder="Confirm password" 
              required 
              :type="showConfirmPassword ? 'text' : 'password'"
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showConfirmPassword = !showConfishowConfirmPasswordrm">
            </v-text-field>
          </validation-provider>
          <v-btn class="mt-6" type="submit" color="primary" block>
            Sign Up
          </v-btn>
        </form>
      </validation-observer>
    </v-card-text>
  </v-card>
</template>
<script>
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

export default {
  name: 'Signup',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    id: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false
  }),
  methods: {
    submit: (invalid) => {
      if(invalid) return
      console.log('sign up!')
    }
  },
}
</script>
