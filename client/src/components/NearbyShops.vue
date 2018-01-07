template>
  <v-container grid-list-md text-xs-center>
  <v-layout row wrap>
      <v-flex v-for="(shop, key) in shops" xs12 sm6 md4>
        <transition name="fade">
        <v-card v-if="shop.show">
          <v-card-media :src="shop.picture" height="150px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3  class="text-md-left headline mb-0">{{shop.name}}</h3><br>
              <div class="text-md-left"><v-icon>map</v-icon> &nbsp; {{shop.location.dist}} from </div>
              <div class="text-md-left"><v-icon>email</v-icon> &nbsp; {{shop.email}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn v-on:click.native="like(shop, key)" flat icon color="green">
              <v-icon>thumb_up</v-icon>
            </v-btn>
            <v-btn v-on:click.native="dislike(shop, key)" flat icon color="red">
              <v-icon>thumb_down</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </transition>
      </v-flex>
    </v-layout><br>
  </v-container>
</template>


<script>
import AuthenticationService from '@/services/AuthenticationService'
import ShopsService from '@/services/ShopsService'

  export default {
    data: () => ({
      shops: [],
    }),
    methods: {
      async load(page){
        const response = await ShopsService.nearbyShops({
           userId: this.$store.state.user,
           userLoc: this.$store.state.userLoc
         })
        response.data.shops.map((obj) => {
            obj.show = true;
            return obj;
        })
        this.shops = response.data.shops
      },
      async like(shop, key){
        const response = await ShopsService.likeShop({userId: this.$store.state.user, shopId: shop._id})
        if (response.statusText == 'ok') {
          shop.show = false
          var self = this
        }
      },
      async dislike(shop, key){
        const response = await ShopsService.dislikeShop({userId: this.$store.state.user, shopId: shop._id})
        if (response.statusText == 'ok') {
          shop.show = false
          var self = this
        }
      }
    },
    beforeMount(){
      if (!this.$store.state.userLoc) {
        const self = this
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position){
            self.$store.dispatch('setLoc', {
              lat: position.coords.latitude,
              lon: position.coords.longitude
            })
            self.load()
          });
        } else {
          alert("you are not gealocated")
        }
      } else {
        this.load()
      }
    }
  }
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
