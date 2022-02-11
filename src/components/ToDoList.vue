<template>
  <div
      v-if="Array.isArray(items)"
      class="to-do-list"
  >
    <ToDoListItem
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :text="item.value"
      :done="item.done"
      @checkedChange="$emit('checkedChange', item)"
      @edit="$emit('edit', item)"
      @delete="$emit('delete', item)"
    />
  </div>
</template>

<script>
import ToDoListItem from '@/components/ToDoListItem'

export default {
  name: 'ToDoList',
  components: {
    ToDoListItem
  },
  mixins: [],
  props: {
    items: {
      type: Array,
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
.to-do-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>