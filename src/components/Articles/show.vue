<template>
    <v-main>
        <div class="d-flex flex-column justify-space-between align-center">
            <v-lazy>
                <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="300"
                max-width="500"
                src="https://picsum.photos/id/11/500/300"
                ></v-img>
            </v-lazy>
        </div>
        <div class="black--text text-left mt-10 ml-15">
            <h3 class="text-h4">Title</h3>
            <p>Body</p>
        </div>
    </v-main>
</template>