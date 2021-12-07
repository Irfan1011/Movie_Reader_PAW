<template>
    <v-main>
        <v-container>
            <v-card elevation="5" style="position:relative !important">
                <v-layout>
                    <v-img
                    lazy-src="https://picsum.photos/id/11/10/6"
                    max-height="300"
                    max-width="400"
                    v-bind:src="profiles.img_url">
                    </v-img>
                    <v-flex xs10>
                        <v-card-title primary-title>
                            <div class="mt-10 ml-5 text-h4 font-weight-bold">
                                {{profiles.first_name}} {{profiles.last_name}}
                            </div>
                        </v-card-title>
                        <v-card-title primary-title>
                            <div class="ml-5 text-h5">
                                {{profiles.role}}
                            </div>
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-btn icon small color="green" style="position:absolute; right:60px; bottom:5px;" @click="editHandler(profiles)"> <v-icon>mdi-pencil</v-icon> Edit Profile </v-btn>
            </v-card>

            <v-divider class="mt-10"/>

            <v-card-title primary-title>
                <v-container>
                    <v-row>
                        <v-col>
                            <div class="text-md-body-1 black--text">
                                <p class="font-weight-bold">Email</p> {{profiles.email}}
                            </div>
                        </v-col>
                        <v-col>
                            <div class="text-md-body-1 black--text">
                                <p class="font-weight-bold">Phone Number</p> {{profiles.phone_number}}
                            </div>
                        </v-col>
                    </v-row>
                </v-container>

                <h2 class="font-weight-bold black--text mt-5">Movies: </h2>
            </v-card-title>
            
            <v-container>
                <v-row dense>
 
                    <v-col
                    v-for="(item, i) in articles"
                    :key="i"
                    cols="12"
                    >
                        <v-card elevation="5">
                            <v-layout>
                                <v-img
                                lazy-src="https://picsum.photos/id/11/10/6"
                                height="250"
                                width="250"
                                v-bind:src="item.img_url">
                                </v-img>
                                <v-flex xs10>
                                <v-card-title primary-title>
                                    <div class="ml-5 text-h5 font-weight-bold">
                                        {{item.title}}
                                    </div>
                                </v-card-title>
                                <v-card-text primary-title>
                                    <div class="ml-5 text-md-body-1 text-justify">
                                        {{item.body.substr(0,700)}}...
                                    </div>
                                    <v-row class="mt-5">
                                        <v-spacer/>
                                        <v-btn icon small color="green" class="mr-2" @click="editArticle(item.id)"> <v-icon>mdi-pencil</v-icon> </v-btn>
                                        <v-btn icon small color="red" @click="deleteHandler(item.id)"> <v-icon>mdi-delete</v-icon> </v-btn>
                                        <v-btn text router @click="startReadingArticle(item.id)"><v-icon color="light-green darken-2">mdi-book</v-icon> Read-Now </v-btn> 
                                    </v-row>
                                </v-card-text>
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-container>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Edit Profile</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field v-model="first_name" label="First Name" maxlength="20" required></v-text-field>               
                        <v-text-field v-model="last_name" label="Last Name" maxlength="50" required></v-text-field>
                        <v-text-field v-model="img_url" label="Image Url" required></v-text-field>                                    
                        <v-text-field v-model="phone_number" label="Phone number" required></v-text-field>
                        <v-text-field v-model="gender" label="Gender" required></v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="setForm"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning!</span>
                </v-card-title>
                <v-card-text>Anda yakin ingin menghapus artikel ini?</v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogConfirm = false"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="deleteData"> Delete </v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{error_message}}</v-snackbar>
    </v-main>
</template>

<script>
export default {
    name: "List",
    data() {
        return {
            inputType: 'Tambah',
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            search: null,
            dialog: false,
            dialogConfirm: false,
            article: new FormData,
            articles: [],
            profile: new FormData,
            profiles: [],
            form: {
                first_name: null,
                last_name: null,
                img_url: null,
                phone_number: null,
                gender: null,
            },
            // profile: {
            //     img_url: null,
            //     first_name: null,
            //     last_name: null,
            //     phone_number: null,
            //     role: null,
            // },
            role: ["Mahasiswa", "Dosen", "Art Designer"],
            deleteId: '',
            editId: '',
        };
    },
    methods: {
        setForm() {
            if(this.inputType !== 'Tambah') {
                this.update();
            } else {
                this.save();
            }
        },
        loadProfilePage() {
            this.readData();
            this.readDataProfil();
        },
        // Read data artikel
        readData() {
            var url = this.$api + '/article/author/' + localStorage.getItem('id');
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.articles = response.data.data;
            });
        },
        // Read data profil
        readDataProfil() {
            var url = this.$api + '/user/' + localStorage.getItem('id');
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.profiles = response.data.data;
            });
        },
        //baca artikel
        startReadingArticle($id) {
            localStorage.setItem('article_id', $id);
            this.$router.push({
                name: 'article-show',
            });
        },
        // Simpan data article
        save() {
            this.article.append('img_url', this.form.img_url);
            this.article.append('title', this.form.title);
            this.article.append('body', this.form.body);
            this.article.append('author', localStorage.getItem('active_user'));

            var url = this.$api + '/article/';
            this.load = true;
            this.$http.post(url, this.article, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.close();
                this.readData();
                this.resetForm();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },

        update() {
            let newData = {
                img_url: this.form.img_url,
                title: this.form.title,
                body: this.form.body,
                author: localStorage.getItem('active_user')
            };

            var url = this.$api + '/article/' + this.editId;
            this.load = true;
            this.$http.put(url, newData, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.close();
                this.readData();
                this.resetForm();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },

        deleteData() {
            var url = this.$api + '/article/' + this.deleteId;
            this.load = true;
            this.$http.delete(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.close();
                this.readData();
                this.resetForm();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },

        editHandler(item) {
            this.inputType = 'Ubah';
            this.editId = item.id;
            this.form.first_name = item.first_name;
            this.form.last_name = item.last_name;
            this.form.img_url = item.img_url;
            this.form.phone_number = item.phone_number;
            this.form.gender = item.gender;
            this.dialog = true;
        },

        //edit artikel
        editArticle($id) {
            localStorage.setItem('article_id', $id);
            this.$router.push({
                name: 'article-edit',
            });
        },

        deleteHandler(id) {
            this.deleteId = id;
            this.dialogConfirm = true;
        },

        close() {
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogConfirm = false;
            this.readData();
        },

        cancel() {
            this.resetForm();
            this.readData();
            this.dialog = false;
            this.dialogConfirm = false;
            this.inputType = 'Tambah';
        },

        resetForm() {
            this.form = {
                nama_kelas: null,
                kode: null,
                biaya_pendaftaran: null,
                kapasitas: null,
            };
        },
    },
    computed: {
        formTitle() {
            return this.inputType;
        },
    },
    mounted: function() {
        this.loadProfilePage();
    },
};
</script>