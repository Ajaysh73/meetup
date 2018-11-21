<template>
    <v-container>
        <v-layout v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular 
                :width="7"
                :size="70" 
                class="primary--text"
                indeterminate>
                </v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-else>
            <v-flex xs12>
                <v-card>
                    <v-card-title class="primary--text">
                        <h2>{{meetup.location}}</h2>
                        <template v-if="userIsCreator">
                            <v-spacer></v-spacer>
                            <app-edit-meetup-details-dialog :meetup = "meetup">
                            </app-edit-meetup-details-dialog>
                        </template>
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
    },
    userIsAuthenticated () {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      )
    },
    userIsCreator () {
      if (!this.userIsAuthenticated) {
        return false
      }
      console.log(this.meetup.creatorId)
      console.log(this.$store.getters.user.id)
      return this.$store.getters.user.id === this.meetup.creatorId
    },
    loading () {
      return this.$store.getters.loading
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