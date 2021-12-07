<template>
    <v-main>
        <div class="d-flex flex-column justify-space-between align-center">
            <v-lazy>
                <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="900"
                max-width="400"
                v-bind:src="articles.img_url"
                ></v-img>
            </v-lazy>
        </div>
        <div class="black--text text-left mt-10 ml-15">
            <h3 class="text-h3 font-weight-bold mb-1">{{articles.title}}</h3>
            <h2 class="text-h6 font-weight-light mb-5">Written by: {{articles.author}}</h2>
            <p class="text-h5 font-weight-light mt-3 text-justify mr-15">
                {{articles.body}}
            </p>
        </div>
        <div class="mt-15">
            <v-btn class="green white--text" lazy @click="$router.go(-1)">Return</v-btn>
        </div>
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
            article: new FormData,
            articles: [],
        };
    },
    methods: {
        // Read data
        readData() {
            var url = this.$api + '/article/' + localStorage.getItem('article_id');
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.articles = response.data.data;
            });
        },
        // goBack() {
        //     this.$router.push({
        //         name: localStorage.getItem('router_return'),
        //     });
        // }
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