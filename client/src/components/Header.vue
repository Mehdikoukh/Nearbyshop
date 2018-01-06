<v-toolbar-items>
      <v-btn v-if="$store.state.isLoggedIn" flat dark @click="navigateTo({name: 'nearby-shops'})">Nearbyshop</v-btn>
      <v-btn v-if="$store.state.isLoggedIn" flat dark @click="navigateTo({name: 'preferred-shops'})">PreferredShops</v-btn>
      <v-btn v-if="!$store.state.isLoggedIn" flat dark @click="navigateTo({name: 'login'})">Login</v-btn>
      <v-btn v-if="!$store.state.isLoggedIn" flat dark @click="navigateTo({name: 'register'})">Register</v-btn>
      <v-btn v-if="$store.state.isLoggedIn" flat dark @click="logout()">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    methods: {
      navigateTo(route){
        this.$router.push(route)
      },
      /*
      data: function(){
        return {
          get isLoggedIn(){
            return localStorage.getItem('isLoggedIn')
          }
        }
      },
      */
      logout(){
        this.$store.dispatch('logout')
        this.$router.push({name: 'login'})
      }
    }
  }
</script>

<style scoped>

</style>