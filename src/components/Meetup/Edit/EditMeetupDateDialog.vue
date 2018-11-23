<template>
    <v-dialog width="350px" persistent v-model="editDialog"> 
        <v-btn accent slot="activator">Edit date</v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>Edit Meetup Date</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row warp>
                    <v-flex xs12>
                        <v-date-picker v-model="editableTime" style="width: 100%" actions>
                            <template scope="{save, cancel}">
                                <v-btn class="blue--text darken-1"
                                flat
                                @click.native="editDialog = false">Close</v-btn>
                                <v-btn class="blue--text darken-1"
                                flat
                                @click.native="onSaveChanges">Save</v-btn>
                            </template>

                        </v-date-picker>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  data () {
    return {
      editDialog: false,
      editableTime: null
    }
  },
  methods: {
    onSaveChanges () {
      const newDate = new Date(this.meetup.date)
      const newDay = new Date(this.editableTime).getUTCDate()
      const newMonth = new Date(this.editableTime).getUTCMonth()
      const newYear = new Date(this.editableTime).getUTCFullYear()
      newDate.setUTCDate(newDay)
      newDate.setUTCMonth(newMonth)
      newDate.setUTCFullYear(newYear)
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        date: newDate
      })
    }
  },
  created () {
    this.editableTime = new Date(this.meetup.date).toISOString().substr(0, 10)
  }
}
</script>
