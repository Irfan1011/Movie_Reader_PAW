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
            <h3 class="text-h4 font-weight-bold mb-3">Lorem Ipsum</h3>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                It has survived not only five centuries, but also the leap into electronic typesetting, 
                remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
                containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
                including versions of Lorem Ipsum.
            </p>
        </div>
    </v-main>
</template>