<template>
    <v-main>
        <h1 class="black--text text-h4 font-weight-bold mb-1 text-left">Create Article</h1>
        <v-form v-model="valid" ref="form">
            <v-card elevation="5" class="weight ml-15 mr-15 mt-10">
                <v-row>
                    <v-col cols="12" md="6" class="ml-10">
                        <h3 class="font-weight-medium text-left">Title</h3>
                        <v-text-field
                        v-model="form.title"
                        label="Article Title (Required)"
                        counter="100"
                        required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="ml-10">
                        <h3 class="font-weight-medium text-left">Image URL</h3>
                        <v-text-field
                        v-model="form.img_url"
                        label="Image URL (Required)"
                        counter="100"
                        required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="ml-10">
                        <h3 class="font-weight-medium text-left">Body</h3>
                        <v-textarea
                        v-model="form.body"
                        label="Article Text (Required)"
                        auto-grow
                        rows="15"
                        required></v-textarea>
                    </v-col>

                    <v-col cols="12" md="6" class="ml-10">
                        <v-btn color="blue darken-1" @click="save">Submit</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-form>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{ error_message }}</v-snackbar>
    </v-main>
</template>

<script>
export default {
    name: "List",
    data() {
        return {
            load: false,
            snackbar: false,
            error_message: '',
            valid: false,
            color: '',
            headers: [],
            article: new FormData,
            articles: [],
            form: {
                img_url:'',
                title:'',
                body:'',
                author:''
            }
        };
    },
    methods: {
        // Simpan data article
        save() {
            this.article.append('img_url', this.form.img_url);
            this.article.append('title', this.form.title);
            this.article.append('body', this.form.body);
            this.article.append('author', localStorage.getItem('au_first_name') + ' ' + localStorage.getItem('au_last_name'));

            var url = this.$api + '/article';
            this.load = true;
            this.$http.post(url, this.article, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                },
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.$router.push({
                    name: 'Home',
                });
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
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
};
</script>