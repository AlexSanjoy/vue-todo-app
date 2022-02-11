<template>
  <div class="to-do-statistic">
    <a-tag
        v-for="(item, key) in badges"
        :key="key"
        :color="item.color"
    >
      {{ item.count }} {{ item.text }}
    </a-tag>
  </div>
</template>

<script>
export default {
  name: 'ToDoStatistic',
  props: {
    items: {
      type: Array,
      default: null
    }
  },
  computed: {
    total() {
      return Array.isArray(this.items) && this.items.length
    },
    notCompleted() {
      return Array.isArray(this.items) && this.items.filter(item => !item.done).length
    },
    completed() {
      return this.total - this.notCompleted
    },
    badges() {
      return [
        {
          count: this.total,
          text: 'total',
          color: '#108ee9'
        },
        {
          count: this.notCompleted,
          text: 'not completed',
          color: '#f50'
        },
        {
          count: this.completed,
          text: 'completed',
          color: '#87d068'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.to-do-statistic {

}
</style>