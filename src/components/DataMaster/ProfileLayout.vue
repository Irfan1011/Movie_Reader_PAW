<template>
    <v-main>
        <v-container>
            <v-card elevation="5">
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
                    <v-dialog  persistent max-width="800">
                        <template v-slot:activator="{ on, attrs }">
                        <v-col align="right" v-bind="attrs" v-on="on">
                            <v-btn text router><v-icon color="blue-grey darken-1">mdi-pencil</v-icon> Edit </v-btn> 
                        </v-col>
                        </template>
                        <v-card>
                            <v-card-text>
                                <v-container>
                                    <v-col cols="12" sm="6" md="12">
                                        <v-text-field
                                        v-model="profile.img_url"
                                        counter="100"
                                        label="Image URL"
                                        required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="12">
                                        <v-text-field
                                        v-model="profile.first_name"
                                        counter="100"
                                        label="First Name"
                                        required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="12">
                                        <v-text-field
                                        v-model="profile.last_name"
                                        counter="100"
                                        label="Last Name"
                                        required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="12">
                                        <v-text-field
                                        v-model="profile.phone_number"
                                        counter="100"
                                        label="Phone Number"
                                        required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="12">
                                        <v-select
                                        v-model="profile.role"
                                        :items="role"
                                        label="Role"
                                        required
                                        ></v-select>
                                    </v-col>
                                </v-container>

                                <v-card-actions>
                                    <v-spacer/>
                                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                        <v-btn color="blue darken-1" text @click="update">Save</v-btn>
                                </v-card-actions>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                    </v-flex>
                </v-layout>
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
            headers: [],
            article: new FormData,
            articles: [],
            profile: new FormData,
            profiles: [],
            form: {
                img_url: null,
                title: null,
                body: null,
                author: null,
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
            this.form.nama_kelas = item.nama_kelas;
            this.form.kode = item.kode;
            this.form.biaya_pendaftaran = item.biaya_pendaftaran;
            this.form.kapasitas = item.kapasitas;
            this.dialog = true;
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