<template>
  <div style="margin-top: 15px" v-if="posts.length > 0">
    <h2 style="text-align: center">Post List</h2>
    <transition-group name="post-list" tag="div">
      <post-item
        @remove="$emit('remove', post)"
        :key="post.id"
        v-for="post in posts"
        :post="post"
      />
    </transition-group>
  </div>
  <h2 v-else style="text-align: center; margin-top: 15px">NO Posts</h2>
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
<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
.post-list-move {
  transition: transform 0.8s ease;
}
</style>
