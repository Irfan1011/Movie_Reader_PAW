<template>
  <div>
    <v-app-bar app fixed height="75px">
      <h1 class="text-center">Movie Reader</h1>
      <VSpacer />
      <v-toolbar-items>
        <v-btn text router @click="login"> Login </v-btn> 
        <v-btn text router @click="register"> Register </v-btn> 
      </v-toolbar-items>
    </v-app-bar>
    
    <v-carousel height="100vh" cycle hide-delimiters>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-row class="fill-height" align="center" justify="center">
          <div class="text-h4 white--text font-weight-bold">{{ item.title }}</div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  
  data(){
    return {
      items: [
        {
          src: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c4e7fb7b-29e1-4057-9fc1-eecfadf9e4c7/de2l3u5-bd984abf-e52d-4e97-9a21-1971ec889647.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M0ZTdmYjdiLTI5ZTEtNDA1Ny05ZmMxLWVlY2ZhZGY5ZTRjN1wvZGUybDN1NS1iZDk4NGFiZi1lNTJkLTRlOTctOWEyMS0xOTcxZWM4ODk2NDcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.RbtMd-fSZXCF79wacR9apSppO20DTvIykd-DJe_N7Rw",
          title: "#1 WELCOME"
        },
        {
          src: "https://cdn-s3.allmovie.com/cms/18044/home_eternals.jpg",
          title: "#2 DC MOVIE"
        },
        {
          src: "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2018/04/28/676915-avengers-infinity-war.jpg",
          title: "#3 MARVEL"
        },
      ],
    }
  },
  methods: {
    login() {
      this.$router.push({
          name: 'Login',
      });
    },
        
    register() {
      this.$router.push({
          name: 'Register',
      });
    }
  }
};
</script>