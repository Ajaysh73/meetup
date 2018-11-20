<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="primary--text"> Create a new Meetup</h1>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="onCreateMeetup">
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                            name="title"
                            label="Title"
                            id="title"
                            v-model="title"
                            required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                     <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                            name="location"
                            label="Location"
                            id="location"
                            v-model="location"
                            required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                           <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
                            <input type="file"
                             style="display: none" 
                             ref="fileInput" 
                             accept="image/*"
                             @change="onFilePicked">
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="imageUrl" height="250">
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                            name="description"
                            label="Description"
                            id="description"
                            v-model="description"
                            multi-line  
                            required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3 class="mb-2">
                            <h3>Choose date and Time</h3>
                            <v-date-picker v-model="date">
                            </v-date-picker>
                            <p>{{date}}</p>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3 class="mb-2">
                            <h3>Choose date and Time</h3>
                            <v-time-picker v-model="time">

                            </v-time-picker>
                            <p>{{time}}</p>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn class="primary"
                             :disabled="!formIsValid"
                             type="submit"
                            > Create Meetup
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
  data () {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      date: '',
      time: '',
      image: null

    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' &&
          this.location !== '' &&
          this.imageUrl !== '' &&
          this.description !== '' &&
          this.date !== '' &&
          this.time !== ''
    }
  },
  methods: {
    onCreateMeetup () {
      if (!this.formIsValid) {
        return
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: new Date(this.date + ' ' + this.time)
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let filename = files[0].name
      console.log('filename:' + filename)
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
        console.log('Completed reading', '')
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>

