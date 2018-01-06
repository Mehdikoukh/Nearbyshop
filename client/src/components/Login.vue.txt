<template>
  <v-flex xs12 md6 offset-md3>
  <h1>Login</h1>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
    <v-text-field label="Password"
              v-model="password"
              :rules="passRules"
              :append-icon-cb="() => (e1 = !e1)"
              :type="e1 ? 'password' : 'text'"
              counter
              required
            ></v-text-field>
    <v-btn @click="login" :disabled="!valid">Submit</v-btn>
  </v-form>
</v-flex>
</template>


<script>
import AuthenticationService from '@/services/AuthenticationService'
  export default {
    data: () => ({
      valid: true,
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'no email format'
      ],
      password: '',
      passRules: [
        (v) => !!v || 'Password is required',
        (v) => v && v.length >= 8 || 'PPassword is short , more than 8 characters'
      ],
      e1: true
    }),
    methods: {
      async login () {
        if (this.$refs.form.validate()) {
          const response = await AuthenticationService.login({
            email: this.email,
            password: this.password
          })
          if(response.data.user){
            this.$store.dispatch('setUser', response.data.user)
            this.$router.push({name: 'nearby-shops'})
          }
        }
      }
      }
    }
</script>

<style scoped>

</style>
