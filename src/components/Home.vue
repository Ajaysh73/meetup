<template>
<v-container>
    <v-layout row wrap>
        <v-flex xs12 sm6 class=" text-xs-center text-sm-right">
            <v-btn large class="info" router to= "/meetups">Explore Meetups</v-btn>
        </v-flex>
        <v-flex xs12 sm6 class="text-xs-center text-sm-left">
            <v-btn large class="info" router to= "/meetup/new">Organize New Meetup</v-btn>
        </v-flex>
    </v-layout>
    <v-layout>
        <v-flex xs12 class="text-xs-center">
            <v-progress-circular 
            :width="7"
            :size="70" 
            class="primary--text"
            indeterminate
            v-if="loading" ></v-progress-circular>
        </v-flex>
    </v-layout>
    <v-layout class="mt-2"> 
        <v-flex xs12>
            <v-carousel style="cursor: pointer;" v-if="!loading">
                <v-carousel-item
                v-for="meetup in meetups"
                :src="meetup.imageUrl"
                :key="meetup.id"
                @click="onLoadMeetup(meetup.id)">
                <div class="title">
                    {{meetup.title}}
                </div>
                </v-carousel-item>
            </v-carousel>
        </v-flex>
    </v-layout>
        <v-layout row wrap class="mt-2">
        <v-flex xs12 class="text-xs-center">
            <p>Explore our awesome meetups!!</p>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.featuredMeetups
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push('/meetups/' + id)
    }
  }

}
</script>
<style scoped>
    .title{
        position: absolute;
        bottom: 50px;
        background-color: rgba(0,0,0,.87);
        color: white;
        font: size 2em;
        padding: 20px;
        text-align: center;
    }
    
</style>
