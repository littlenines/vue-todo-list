<template>
  <div class="container">
    <h1 class="title" data-test="title">{{ title }}</h1>
    <section class="todo">
      <div class="todo-form">
        <input
          type="text"
          class="todo-input-field"
          v-model="todoInput"
          @keyup.enter="saveItem"
          maxlength="35"
          data-test="todo-input"
        />
        <button class="todo-button" @click="saveItem" data-test="todo-button">
          {{ todoButton }}
        </button>
      </div>

      <div class="todo-items">
        <ul>
          <li
            class="todo-item"
            v-for="(item, index) in items"
            :key="item.id"
            @click="itemDone(item)"
            :class="{ done: item.done }"
            data-test="todo-item"
          >
            {{ item.label }}
            <i
              class="mdi mdi-close-circle delete-icon"
              @click="deleteItem(index)"
              data-test="delete-button"
            ></i>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "ToDo",
  data() {
    return {
      title: "to-do list",
      todoInput: "",
      todoButton: "Add new",
      items: [
        { id: 1, label: "Buy milk", done: false },
        { id: 2, label: "Buy a gun", done: false },
        { id: 3, label: "World domination", done: true },
      ],
    };
  },

  methods: {
    saveItem() {
      const itemsList = this.items;
      if (itemsList.length >= 10 || !this.todoInput.trim()) {
        return null;
      } else {
        itemsList.push({
          id: itemsList.length + 1,
          label: this.todoInput,
          done: false,
        });
        this.todoInput = "";
      }
    },

    deleteItem(item) {
      return this.items.splice(item, 1);
    },

    itemDone(item) {
      item.done = !item.done;
    },
  },
};
</script>

<style lang="scss">
.title {
  margin: unset;
  text-align: center;
  color: $text-title;
  text-transform: uppercase;
}

.todo {
  border-radius: 10px;
  border: 0.5px solid $black;
}

.todo-form {
  display: flex;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid $black;
  background-color: $background-primary;
}

.todo-input-field {
  margin-right: 5px;
  flex: 1;
}

.todo-button {
  color: $button-text;
  background-color: $button-background;
}

.todo-items {
  padding: 10px;
  border-radius: 0 0 10px 10px;
  background: $white url("@/assets/paper.jpg");
}

.todo-item {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  cursor: pointer;
  margin-bottom: 5px;
  border-radius: 10px;
  border: 2px solid $black;
  background-color: $item-background;
}

.done {
  text-decoration: line-through;
}

.delete-icon {
  color: $background-primary;
  cursor: default;
}
</style>
