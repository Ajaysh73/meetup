<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title class="primary--text">
                        <h2>{{meetup.location}}</h2>
                    </v-card-title>
                    <v-card-media
                        class="white--text"
                        :src= "meetup.imageUrl"
                        height="300px"
                        >
                    </v-card-media>
                    <v-card-text >
                        <div class="info--text mb-2"  id="InfoText">{{meetup.date | date}} - {{meetup.title}} </div>
                        <div  id="AboutText">
                        {{meetup.description}}
                        </div>             
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn large flat class="primary">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
  export default {
    props: ['id'],
    computed: {
      meetup () {
        return this.$store.getters.loadedMeetup(this.id)
      }
    }
  }
</script>

<style>
#InfoText { 
font: italic bold 23px/23px Georgia, serif;
}
#AboutText { 
font: 19px Georgia, serif;
}
</style>