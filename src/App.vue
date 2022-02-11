<template>
  <div id="app" class="to-do-app">
    <div class="to-do-app__container">
      <ToDoTopbar
          @addToDo="openModal(actionTypes.add.value)"
          @search="handleSearchToDo"
          @filter="handleFilterToDo"
      />
      <ToDoStatistic :items="filteredToDoList" />
      <ToDoList
          :items="filteredToDoList"
          @checkedChange="handleToDoCheckedChange"
          @edit="handleEditToDoModalOpen"
          @delete="handleDeleteToDoItem"
      />
    </div>
    <!-- Две отдельные модалки по ТЗ. Так бы делал одну.   -->
    <a-modal
        title="Add new ToDo"
        v-model="modals.add"
        okText="Add"
        @ok="handleAddNewTodo"
        @cancel="handleAddNewTodoModalClose"
    >
      <a-input
          v-model="newToDo"
          allowClear
      />
      <span
          v-if="error"
          class="to-do-app__error-label"
      >

        {{ error }}
      </span>
    </a-modal>
    <a-modal
        title="Edit ToDo"
        v-model="modals.edit"
        okText="Save"
        @ok="handleEditToDoItem"
    >
      <a-input
          v-model="editableToDo"
          allowClear
      />
      <span
          v-if="error"
          class="to-do-app__error-label"
      >

        {{ error }}
      </span>
    </a-modal>
  </div>
</template>

<script>
import ToDoTopbar from '@/components/ToDoTopbar'
import ToDoList from '@/components/ToDoList'
import ToDoStatistic from '@/components/ToDoStatistic'

export default {
  name: 'App',
  components: {
    ToDoTopbar,
    ToDoList,
    ToDoStatistic
  },
  data: () => ({
    modals: {
      add: false,
      edit: false
    },
    newToDo: '',
    editableToDo: '',
    editableToDoItem: null,
    toDoList: [],
    filteredToDoList: [],
    filters: {
      value: '',
      done: null
    },
    error: ''
  }),
  computed: {
    actionTypes() {
      return {
        add: {
          value: 'add'
        },
        edit: {
          value: 'edit'
        }
      }
    }
  },
  created() {
    this.toDoList = this.getSavedToDo()
    this.filteredToDoList = this.toDoList
  },
  watch: {
    newToDo(val) {
      this.validateInput(val)
    },
    editableToDo(val) {
      this.validateInput(val)
    }
  },
  methods: {
    getSavedToDo() {
      return JSON.parse(window.localStorage.getItem('todo')) || []
    },
    saveToDoList(list) {
      window.localStorage.setItem('todo', JSON.stringify(list || this.toDoList))
    },
    validateInput(val) {
      if (!val) {
        this.error = 'Field is required'
        return false
      } else if (val.length > 100) {
        this.error = 'The length must be no more than 100'
        return false
      } else {
        this.error = ''
        return true
      }
    },
    openModal(type) {
      this.modals[type] = true
    },
    handleAddNewTodoModalClose() {
      this.newToDo = ''
      this.error = ''
      this.modals[this.actionTypes.add.value] = false
    },
    handleEditTodoModalClose() {
      this.editableToDo = ''
      this.error = ''
      this.modals[this.actionTypes.edit.value] = false
    },
    handleEditToDoModalOpen(item) {
      this.editableToDo = item.value
      this.editableToDoItem = item
      this.openModal(this.actionTypes.edit.value)
    },
    handleSearchToDo(val) {
      this.filters.value = val
      this.handleFilterToDoList()
    },
    handleFilterToDo(val) {
      this.filters.done = typeof val === 'number' ? !!val : null
      this.handleFilterToDoList()
    },
    listEntryFilter({ list = [], value, key }) {
      return value ? list.filter(item => item[key].includes(value)) : list
    },
    listEqualsFilter({ list = [], value, key }) {
      console.log(value)
      return (typeof value === 'boolean' || value) ? list.filter(item => item[key] === value) : list
    },
    handleFilterToDoList() {
      this.filteredToDoList = this.listEqualsFilter({
        list: this.toDoList,
        key: 'done',
        value: this.filters.done
      })
      this.filteredToDoList = this.listEntryFilter({
        list: this.filteredToDoList,
        key: 'value',
        value: this.filters.value
      })
    },
    handleAddNewTodo() {
      if (!this.newToDo || !this.validateInput(this.newToDo)) {
        return
      }
      const savedToDo = this.getSavedToDo()
      let toDoItems = []
      let toDoItemId = 0
      const newToDoItem = {
        value: this.newToDo,
        done: false
      }
      if (!savedToDo.length) {
        toDoItems.push({
          ...newToDoItem,
          id: toDoItemId
        })
      } else {
        const ids = Object.keys(savedToDo) || []
        toDoItemId = parseInt(ids[ids.length - 1] || 0) + 1
        toDoItems = [
          ...savedToDo,
          {
            ...newToDoItem,
            id: toDoItemId
          }
        ]
      }
      this.toDoList = toDoItems
      this.handleFilterToDoList()
      this.saveToDoList()
      this.handleAddNewTodoModalClose()
    },
    handleEditToDoItem() {
      if (!this.validateInput(this.editableToDo)) {
        return
      }
      if (this.editableToDo !== this.editableToDoItem.value) {
        const id = this.editableToDoItem.id
        this.toDoList.forEach((item) => {
          if (item.id === id) {
            item.value = this.editableToDo
          }
        })
        this.handleFilterToDoList()
        this.saveToDoList()
      }
      this.handleEditTodoModalClose()
    },
    handleDeleteToDoItem(item) {
      this.toDoList = this.toDoList.filter(toDo => toDo.id !== item.id)
      this.handleFilterToDoList()
      this.saveToDoList()
    },
    handleToDoCheckedChange(item) {
      this.toDoList.forEach((toDo) => {
        if (toDo.id === item.id) {
          toDo.done = !toDo.done
        }
      })
      this.handleFilterToDoList()
      this.saveToDoList()
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/styles/variables';

.to-do-app {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $main-color;
  max-width: 600px;
  margin: 0 auto;
  padding: 75px 15px 50px;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__error-label {
    color: #f50;
  }
}
</style>
