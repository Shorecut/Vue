<template>
  <form @submit.prevent>
    <h4>Create Post</h4>
    <my-input
      v-focus
      v-model.trim="post.title"
      type="text"
      placeholder="Title"
    />
    <my-input v-model.trim="post.body" type="text" placeholder="Description" />
    <my-button
      style="align-self: flex-end; margin-top: 15px"
      @click="createPost"
      class="btn"
      >Create</my-button
    >
  </form>
</template>
<script>
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = {
        title: "",
        body: "",
      };
    },
  },
};
</script>
<style scoped>
form {
  display: flex;
  flex-direction: column;
}
h4 {
  text-align: center;
}
</style>
