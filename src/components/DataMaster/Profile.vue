<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-1>Welcome!</h3>
        
        <v-flex
            max-width="80%"
            align="left"
            class="mx-auto"
        >
           
            <v-container>
                <v-row dense>

                    <v-col
                    v-for="(item, i) in articles"
                    :key="i"
                    cols="12"
                    >
                    <v-card
                        color="white"
                    >
                        <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <v-card-title
                            class="text-h5"
                            v-text="item.nama_kelas"
                            ></v-card-title>

                            <v-card-subtitle class="text-left">
                                {{ item.kode }}
                            </v-card-subtitle>

                            <v-card-actions>

                            <v-btn
                                class="ml-2 mt-5"
                                outlined
                                rounded
                                small
                            >
                                READ NOW
                            </v-btn>
                            </v-card-actions>
                        </div>

                        <v-avatar
                            class="ma-3"
                            size="125"
                            tile
                        >
                            <v-img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP._eiPTOPDhIdzMSO6092xdwHaHa%26pid%3DApi&f=1"></v-img>
                        </v-avatar>
                        </div>
                    </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-flex>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{formTitle}} Article</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field
                            v-model="form.nama_kelas"
                            label="Nama Kelas"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="form.kode"
                            label="Kode"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="form.biaya_pendaftaran"
                            label="Biaya Pendaftaran"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="form.kapasitas"
                            label="Kapasitas"
                            required
                        ></v-text-field>
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
                <v-card-text>Anda yakin ingin menghapus kelas ini?</v-card-text>
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
            headers: [],
            article: new FormData,
            articles: [],
            form: {
                img_url: null,
                title: null,
                body: null,
                author: null,
            },
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
        // Read data
        readData() {
            var url = this.$api + '/article';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.articles = response.data.data;
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
        this.readData();
    },
};
</script>