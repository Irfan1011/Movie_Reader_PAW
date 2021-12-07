<template>
    <main>
        <v-container fluid fill-height class="posisinya">
            <v-layout flex align-center justify-center>
                <v-flex xs12 sm6 elevation-6>
                    <v-toolbar class="blue lighten-2">
                        <v-toolbar-title class="white--text">
                            <h1>Register Dulu Bro</h1>
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card>
                        <v-card-text class="pt-4">
                            <div> 
                                <v-form v-model="valid" ref="form">
                                        <v-text-field v-model="first_name" label="First Name" maxlength="20" required></v-text-field>               
                                        <v-text-field v-model="last_name" label="Last Name" maxlength="50" required></v-text-field>
                                        <v-text-field v-model="img_url" label="Image Url" required></v-text-field>                                    
                                        <v-text-field v-model="phone_number" label="Phone number" required></v-text-field>
                                        <v-text-field v-model="gender" label="Gender" required></v-text-field>
                                        <v-text-field v-model="username" label="Username" required></v-text-field>
                                        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                                        <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[min=8]" :type="show1? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>                                    
                                    <v-layout justify-end>
                                        <v-btn text disabled class="">Sudah punya akun?</v-btn>
                                        <v-btn class="mr-2" color="blue" text @click="login"> Login </v-btn> <!-- btn go to register -->
                                        <v-spacer></v-spacer>
                                        <v-btn class="mr-2" @click="submit" :class="{ 'green lighten-1 white--text' : valid, disabled: !valid }"> Submit </v-btn>
                                        <v-btn @click="clear" class="white black--text"> Clear </v-btn>
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

    .posisinya{
        position: absolute;
        top: 20px;
        left: 0;
        right: 0;
    }
    .content{
        background: #032859;
        .content-item{
             overflow: hidden;
             text-overflow: ellipsis;
             white-space: nowrap;
             font-size: 24px;
             box-sizing: border-box;
             text-align: left;
             color: #666;
             border-bottom: 1px solid #f6f6f6;
        }
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
                    first_name: this.first_name,
                    last_name: this.last_name,
                    img_url: this.img_url,
                    phone_number: this.phone_number,
                    gender: this.gender,
                    username: this.username,
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
