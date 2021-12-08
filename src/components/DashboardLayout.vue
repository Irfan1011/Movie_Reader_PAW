<template>
    <div class="dashboard">
        <v-navigation-drawer v-model="drawer" class="fullheight" width="256" app fixed>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title"> Menu </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list dense nav>
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    link
                    tag="router-link"
                    :to="item.to"
                >
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>

                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app fixed height="75px">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <h1>Movie Reader</h1>
            <VSpacer />
            <v-toolbar-items>
                <!-- Tombol Logout -->
                <v-btn text router @click="showProfile" class="mr-5"><v-icon color="blue">mdi-account</v-icon> Profile </v-btn> 
                <v-btn text router @click="logout"><v-icon color="red">mdi-power</v-icon> Logout </v-btn> 
            </v-toolbar-items>
        </v-app-bar>

        <div class="fullheight pa-5">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: "Dashboard",
    data() {
        return {
            drawer: true,
            items: [
                {title: "Home", to: "/home"},
                {title: "Create Article", to: "/article/create"},
            ],
        };
    },
    methods: {
        logout() {
            this.load = true;

            this.$http.post(this.$api + '/logout', {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.clear();
                this.$router.push({
                    name: 'Dashboard',
                });
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                localStorage.removeItem('token');
                this.load = false;
                this.$router.push({
                    name: 'Dashboard',
                });
            })
        },

        showProfile() {
            this.$router.push({
                name: 'Profile',
            });
        }
    }
};
</script>

<style scoped>
.fullheight {
    min-height: 100vh !important;
}

.router {
    text-decoration: none;
    color: black;
}
</style>