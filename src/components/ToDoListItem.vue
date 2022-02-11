<template>
  <a-card class="to-do-list-item" size="small">
    <div class="to-do-list-item__container">
      <a-checkbox
          :checked="done"
          @change="$emit('checkedChange')"
      >
      <span class="to-do-list-item__text" :title="text">
        {{ text }}
      </span>
      </a-checkbox>
      <a-space>
        <a-button
            icon="edit"
            @click="$emit('edit')"
        />
        <a-button
            icon="delete"
            @click="$emit('delete')"
        />
      </a-space>
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'ToDoListItem',
  props: {
    text: {
      type: String,
      default: ''
    },
    done: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.to-do-list-item {
  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &::v-deep {
    .ant-checkbox-wrapper {
      width: calc(100% - 100px);
      display: flex;
      align-items: center;

      .ant-checkbox ~ span {
        width: 100%;
      }
    }
  }

  &__text {
    font-size: 1rem;
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
    display: block;
  }
}
</style>