<template>
    <v-main>
        <h1 class="black--text text-h4 font-weight-bold mb-1 text-left">Create Article</h1>
        <v-form v-model="valid">
            <v-card elevation="5" class="weight ml-15 mr-15 mt-10">
                <v-row>
                    <v-col cols="12" md="6" class="ml-10">
                        <h3 class="font-weight-medium text-left">Title</h3>
                        <v-text-field
                        v-model="title"
                        label="Article Title (Required)"
                        counter="100"
                        required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="5" class="mr-10">
                        <h3 class="font-weight-medium text-left">Image URL</h3>
                        <v-text-field
                        v-model="img_url"
                        label="Image URL (Required)"
                        counter="100"
                        required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="11" class="ml-10">
                        <h3 class="font-weight-medium text-left">Body</h3>
                        <v-text-field
                        v-model="body"
                        label="Article Text (Required)"
                        counter="1000"
                        required></v-text-field>
                    </v-col>

                    <v-col class="ml-9">
                        <v-btn color="blue darken-1">Submit</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-form>
    </v-main>
</template>