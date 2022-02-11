<template>
  <div class="to-do-topbar">
    <div class="to-do-topbar__filters-wrapper">
      <a-input
          placeholder="Search..."
          type="search"
          class="input"
          v-model="search"
          @input="handleSearch"
          allowClear
      />
      <a-select
          default-value=""
          @change="val => $emit('filter', val)"
          style="width: 155px"
          :options="filterOptions"
      />
    </div>
    <a-button
        type="primary"
        @click="addToDo"
    >
      + Add
    </a-button>
  </div>
</template>

<script>
export default {
  name: 'ToDoTopbar',
  data: () => ({
    search: ''
  }),
  methods: {
    addToDo() {
      this.$emit('addToDo')
    },
    handleSearch() {
      this.$emit('search', this.search)
    }
  },
  computed: {
    filterOptions() {
      return [
        {
          value: '',
          label: 'All'
        },
        {
          value: 0,
          label: 'Not completed'
        },
        {
          value: 1,
          label: 'Completed'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.to-do-topbar {
  display: flex;
  gap: 20px;

  &__filters-wrapper {
    width: 100%;
    display: flex;
    gap: 5px;
  }
}
</style>