<template>
  <div style="margin-top: 15px" v-if="posts.length > 0">
    <h2 style="text-align: center">Post List</h2>
    <post-item
      @remove="$emit('remove', post)"
      :key="post.id"
      v-for="post in posts"
      :post="post"
    />
  </div>
  <h2 v-else style="text-align: center; margin-top: 15px">Posts are Empty</h2>
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
