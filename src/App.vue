<template>
  <v-app>
    <v-navigation-drawer v-model="sideNav" temporary fixed>
      <v-list>
        <v-list-tile v-for="menu in menuItems" 
        :key= "menu.title"
        router 
        :to="menu.link">
          <v-list-tile-action>
            <v-icon top>{{ menu.icon}}</v-icon>
          </v-list-tile-action>
            <v-list-tile-content>{{menu.title}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon 
      @click.native.stop="sideNav= !sideNav"
      class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor:pointer">Meetup</router-link> 
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only" >
        <v-btn flat v-for="menu in menuItems"
        :key="menu.title"
        router 
        :to ="menu.link">
        {{menu.title}}
          <v-icon right dark>{{menu.icon}}</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    
   <main>
     <router-view></router-view>
   </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
      menuItems: [
        { icon: 'supervisor_account', title: 'View Mettups', link: '/meetups' },
        { icon: 'room', title: 'Organize Meetup', link: '/meetup/new' },
        { icon: 'person', title: 'Profile', link: '/profile' },
        { icon: 'face', title: 'Sign up', link: '/signup' },
        { icon: 'lock_open', title: 'Sign in', link: '/signin' }
      ]
    }
  },
  name: 'App'
}
</script>
