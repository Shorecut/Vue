<template>
  <div>
    <h3>User List</h3>
    <post-item
      @remove="$emit('remove', post)"
      :key="post.id"
      v-for="post in posts"
      :post="post"
    />
  </div>
</template>
<script>
import PostItem from "./PostItem.vue";

export default {
  components: { PostItem },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped></style>
