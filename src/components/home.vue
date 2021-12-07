<template>
    <v-main>
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
                            v-text="item.title"
                            ></v-card-title>
 
                            <v-card-subtitle class="text-left">
                                Written by : {{ item.author }}
                            </v-card-subtitle>
                            <v-card-actions>
 
                                <v-btn
                                    class="ml-2 mt-5"
                                    outlined
                                    rounded
                                    small
                                    @click="startReadingArticle(item.id)"
                                >
                                    READ NOW
                                </v-btn>
                            </v-card-actions>
                        </div>
 
                        <v-avatar
                            class="ma-3"
                            size="500"
                            tile
                        >
                            <v-img v-bind:src="item.img_url"></v-img>
                        </v-avatar>
                        </div>
                    </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-flex>
    </v-main>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            inputType: 'Tambah',
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            search: null,
            article: new FormData,
            articles: [],
            // dialog: false,
            // dialogConfirm: false,
            // headers: [
            //     {
            //         text: "Nama Kelas",
            //         align: "start",
            //         sortable: true,
            //         value: "nama_kelas"
            //     },
            //     {
            //         text: "Kode", value: "kode"
            //     },
            //     {
            //         text: "Biaya Pendaftaran", value: "biaya_pendaftaran"
            //     },
            //     {
            //         text: "Kapasitas", value: "kapasitas"
            //     },
            //     {
            //         text: "Actions", value: "actions"
            //     },
            // ],
            // form: {
            //     nama_kelas: null,
            //     kode: null,
            //     biaya_pendaftaran: null,
            //     kapasitas: null,
            // },
            // deleteId: '',
            // editId: '',
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
        startReadingArticle($id) {
            localStorage.setItem('article_id', $id);
            this.$router.push({
                name: 'article-show',
            });
        },
        // // Simpan data course
        // save() {
        //     this.course.append('nama_kelas', this.form.nama_kelas);
        //     this.course.append('kode', this.form.kode);
        //     this.course.append('biaya_pendaftaran', this.form.biaya_pendaftaran);
        //     this.course.append('kapasitas', this.form.kapasitas);

        //     var url = this.$api + '/course/';
        //     this.load = true;
        //     this.$http.post(url, this.course, {
        //         headers: {
        //             'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        //         }
        //     }).then(response => {
        //         this.error_message = response.data.message;
        //         this.color = "green";
        //         this.snackbar = true;
        //         this.load = true;
        //         this.close();
        //         this.readData();
        //         this.resetForm();
        //     }).catch(error => {
        //         this.error_message = error.response.data.message;
        //         this.color = "red";
        //         this.snackbar = true;
        //         this.load = false;
        //     });
        // },

        // update() {
        //     let newData = {
        //         nama_kelas: this.form.nama_kelas,
        //         kode: this.form.kode,
        //         biaya_pendaftaran: this.form.biaya_pendaftaran,
        //         kapasitas: this.form.kapasitas
        //     };

        //     var url = this.$api + '/course/' + this.editId;
        //     this.load = true;
        //     this.$http.put(url, newData, {
        //         headers: {
        //             'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        //         }
        //     }).then(response => {
        //         this.error_message = response.data.message;
        //         this.color = "green";
        //         this.snackbar = true;
        //         this.load = true;
        //         this.close();
        //         this.readData();
        //         this.resetForm();
        //         this.inputType = 'Tambah';
        //     }).catch(error => {
        //         this.error_message = error.response.data.message;
        //         this.color = "red";
        //         this.snackbar = true;
        //         this.load = false;
        //     });
        // },

        // deleteData() {
        //     var url = this.$api + '/course/' + this.deleteId;
        //     this.load = true;
        //     this.$http.delete(url, {
        //         headers: {
        //             'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        //         }
        //     }).then(response => {
        //         this.error_message = response.data.message;
        //         this.color = "green";
        //         this.snackbar = true;
        //         this.load = true;
        //         this.close();
        //         this.readData();
        //         this.resetForm();
        //         this.inputType = 'Tambah';
        //     }).catch(error => {
        //         this.error_message = error.response.data.message;
        //         this.color = "red";
        //         this.snackbar = true;
        //         this.load = false;
        //     });
        // },

        // editHandler(item) {
        //     this.inputType = 'Ubah';
        //     this.editId = item.id;
        //     this.form.nama_kelas = item.nama_kelas;
        //     this.form.kode = item.kode;
        //     this.form.biaya_pendaftaran = item.biaya_pendaftaran;
        //     this.form.kapasitas = item.kapasitas;
        //     this.dialog = true;
        // },

        // deleteHandler(id) {
        //     this.deleteId = id;
        //     this.dialogConfirm = true;
        // },

        // close() {
        //     this.dialog = false;
        //     this.inputType = 'Tambah';
        //     this.dialogConfirm = false;
        //     this.readData();
        // },

        // cancel() {
        //     this.resetForm();
        //     this.readData();
        //     this.dialog = false;
        //     this.dialogConfirm = false;
        //     this.inputType = 'Tambah';
        // },

        // resetForm() {
        //     this.form = {
        //         nama_kelas: null,
        //         kode: null,
        //         biaya_pendaftaran: null,
        //         kapasitas: null,
        //     };
        // },
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