<template>
    <main>
        <v-container fluid fill-height class="posisinya">
            <v-layout flex align-center justify-center>
                <v-flex xs12 sm6 elevation-6>
                    <v-toolbar class="grey darken-3">
                        <v-toolbar-title class="grey--text">
                            <h1>Register Dulu Bro</h1>
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card>
                        <v-card-text class="pt-4">
                            <div> 
                                <v-form v-model="valid" ref="form">
                                     <v-text-field v-model="firstName" :rules="[rules.required]" label="First Name" maxlength="20" required></v-text-field>               
                                        <v-text-field v-model="lastName" :rules="[rules.required]" label="Last Name" maxlength="20" required></v-text-field>
                                        <v-text-field v-model="img_url" :rules="[rules.required]" label="Image Url" required></v-text-field>                                    
                                        <v-text-field v-model="phone_number" :rules="[rules.required]" label="Phone number" required></v-text-field>
                                        <v-text-field v-model="gender" :rules="[rules.required]" label="Gender" required></v-text-field>
                                        <v-text-field v-model="username" :rules="[rules.required]" label="Username" required></v-text-field>
                                        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                                        <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>                                    
                                    <v-layout justify-end>
                                        <v-btn class="mr-2" color="green" @click="login"> Login </v-btn> <!-- btn go to register -->
                                        <v-btn class="mr-2" @click="submit" :class="{ 'grey darken-1 white--text' : valid, disabled: !valid }"> SUBMIT </v-btn>
                                        <v-btn @click="clear" class="grey darken-1 white--text"> Clear </v-btn>
                                    </v-layout>
                                </v-form>
                            </div>
                        </v-card-text>
                    </v-card>
                    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{ error_message }}</v-snackbar>
                </v-flex>
            </v-layout>
        </v-container>
    </main>
</template>

<style>
    @import url("https://fonts.googleapis.com/css?family=Jolly%20Lodger");
    .grey--text{
        font-family: "Jolly Lodger";
    }

    .posisinya{
        position: absolute;
        top: 20px;
        left: 0;
        right: 0;
    }
</style>

<script>
export default {
    name:"Login",
    data() {
        return {
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            valid: false,
            password: '',
            passwordRules: [
                (v) => !!v || 'Password tidak boleh kosong :(',
            ],
            email: '',
            emailRules: [
                (v) => !!v || 'E-mail tidak boleh kosong :(',
            ],
            name: '',
            nameRules: [
                (v) => !!v || 'Nama tidak boleh kosong :(',
            ]
        };
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                // validasi
                this.load = true;

                this.$http.post(this.$api + '/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = false;
                    this.clear();
                    this.$router.push({
                        name: 'Login',
                    });
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                })
            }
        },

        clear() {
            this.$refs.form.reset() //clear form
        },
        
        login() {
            this.$router.push({
                name: 'Login',
            });
        }
    },
};
</script>
