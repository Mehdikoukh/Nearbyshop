<template>
  <div id="app">
    <v-app>
    <page-header/>
      <v-content>
        <v-container>
          <router-view/>
        </v-container>
      </v-content>
  </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'

export default {
  name: 'app',
  components: {
    PageHeader
  }
}
</script>

<style>

</style>