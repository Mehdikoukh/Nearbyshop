<template>
  <v-flex xs12 md6 offset-md3>
  <h3>Register</h3>
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
                    <p class="err">{{error}}</p>
    <v-btn @click="register" :disabled="!valid">Submit</v-btn>
  </v-form>
</v-flex>
</template>


<script>
import AuthenticationService from '@/services/AuthenticationService'
  export default {
    data: () => ({
      error: '',
      valid: true,
      email: '',
      emailRules: [
        (v) => !!v || 'Empty',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Wrong email'
      ],
      password: '',
      passRules: [
        (v) => !!v || 'Empty',
        (v) => v && v.length >= 8 || 'Password is short , more than 8 characters'
      ],
      e1: true
    }),
    methods: {
      async register () {
        if (this.$refs.form.validate()) {
          const response = await AuthentificationService.register({
            email: this.email,
            password: this.password,
            newpassword: this.newassword
          })
          if (response.data.error) {
            console.log(response.data.error);
            this.error = response.data.error
          } else if (response.data.success) {
            this.$router.push({name:'login'})
          }
        }
      }
      
    }
  }
</script>

<style scoped>
  .err{
    color: red
  }
</style>
