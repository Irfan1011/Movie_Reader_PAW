<template>
  <v-main class="list">
    <h3 class="text-h3 font-weight-medium mb-5">To Do List</h3>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details>
        </v-text-field>

        <v-spacer></v-spacer>
        <v-btn color="success" dark @click.prevent="inputForm()">
          Tambah
        </v-btn>
      </v-card-title>

      <v-data-table :headers="headers" :items="todos" :search="search">
        <template v-slot:[`item.note`]="{ item }">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header> Note </v-expansion-panel-header>
              <v-expansion-panel-content :color="noteColor(item)">
                <v-layout column align-left>
                  {{ item.note }}
                </v-layout>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>

        <template v-slot:[`item.priority`]="{ item }">
          <v-btn dark @click.prevent="checkPriority(item, index)">
            Check Priority
          </v-btn>

          <v-snackbar
            :top="snackbar.top"
            :right="snackbar.right"
            :left="snackbar.left"
            :bottom="snackbar.bottom"
            :color="snackbar.color"
            :timeout="1000"
            v-model="snackbar.show">

            {{ snackbar.message }}

            <template v-slot:action="{ attrs }">
              <v-btn
                color="white"
                text
                v-bind="attrs"
                @click.prevent="snackbar = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </template>

        <template v-slot:[`item.actions`]="{ item, index }">
          <v-icon
            color="green"
            small
            class="mr-2"
            @click.prevent="inputForm(item, index)">
            mdi-pencil
          </v-icon>

          <v-icon 
            color="red"
            small
            @click.prevent="deleteItem(index)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Form Todo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field v-model="formTodo.task" label="Task" required>
            </v-text-field>

            <v-select
              v-model="formTodo.priority"
              :items="['Penting', 'Biasa', 'Tidak Penting']"
              label="Priority"
              required>
            </v-select>

            <v-textarea 
              v-model="formTodo.note" 
              label="Note" 
              required>
            </v-textarea>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.prevent="resetForm()">
            Cancel
          </v-btn>

          <v-btn color="blue darken-1" text @click.prevent="save()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">
          Are you sure you want to delete this item?
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="cancelDelete">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="confirmDelete">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script>
const formTodoInit = { task: null, priority: null, note: null };
export default {
  name: "List",
  data() {
    return {
      search: null,
      dialog: false,
      deleteDialog: false,
      edit: -1,
      snackbar: {
        top: false,
        right: false,
        left: false,
        bottom: false,
        show: false,
        color: null,
        message: null,
      },
      headers: [
        {
          text: "Task",
          align: "start",
          sortable: true,
          value: "task",
        },
        { text: "Priority", value: "priority" },
        { text: "Note", value: "note" },
        { text: "Actions", value: "actions" },
      ],
      todos: [
        {
          task: "Coding",
          priority: "Penting",
          note: "Code for your life",
        },
        {
          task: "Gaming",
          priority: "Tidak Penting",
          note: "Wasting Time",
        },
        {
          task: "Masak",
          priority: "Biasa",
          note: "Indomie saat coding terbaik gan",
        },
      ],
      formTodo: { ...formTodoInit },
    };
  },

  methods: {
    save() {
      if (this.edit == -1) {
        this.todos.push(this.formTodo);
      } else {
        Object.assign(this.todos[this.edit], this.formTodo);
      }
      this.resetForm();
    },

    cancel() {
      this.resetForm();
      this.dialog = false;
    },
    
    resetForm() {
      this.dialog = false;
    },

    inputForm(item = formTodoInit, index = -1) {
      this.edit = index;
      this.formTodo = { ...item };
      this.dialog = true;
    },

    deleteItem(index) {
      this.delete = index;
      this.deleteDialog = true;
    },

    confirmDelete() {
      this.todos.splice(this.delete, 1);
      this.deleteDialog = false;
    },

    cancelDelete() {
      this.deleteDialog = false;
    },

    checkPriority(item) {
      if (item.priority == "Penting") {
        this.snackbar = {
          top: true,
          right: true,
          left: false,
          bottom: false,
          show: true,
          color: "red",
          message: "Penting",
        };
      } else if (item.priority == "Biasa") {
        this.snackbar = {
          top: true,
          right: false,
          left: true,
          bottom: false,
          show: true,
          color: "green",
          message: "Biasa",
        };
      } else if (item.priority == "Tidak Penting") {
        this.snackbar = {
          top: false,
          right: false,
          left: false,
          bottom: true,
          show: true,
          color: "blue",
          message: "Tidak Penting",
        };
      }
    },

    noteColor(item) {
      if (item.priority == "Penting") {
        return "red";
      } else if (item.priority == "Biasa") {
        return "green";
      } else if (item.priority == "Tidak Penting") {
        return "blue";
      }
    },

  },
};
</script>
