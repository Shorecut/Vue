<template>
  <div class="app">
    <h1>Post Page</h1>
    <div class="app_block">
      <my-button @click="showDialog">Create Post</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list
      v-if="!isPostLoading"
      @remove="removePost"
      :posts="sortedPosts"
    />
    <div v-else class="loader"></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios";
export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: "",
      sortOptions: [
        { value: "title", name: "by name" },
        { value: "body", name: "by desc" },
        { value: "id", name: "by Id" },
      ],
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
        this.posts = res.data;
      } catch (error) {
        alert(error);
      } finally {
        this.isPostLoading = false;
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return this.posts.sort((post1, post2) => {
        const a = post1[this.selectedSort];
        const b = post2[this.selectedSort];
        if (typeof a === "string") {
          return a.localeCompare(b);
        } else {
          return a - b;
        }
      });
    },
  },
  //watch: {
  //  selectedSort(newValue) {
  //    this.posts.sort((post1, post2) => {
  //      const a = post1[newValue];
  //      const b = post2[newValue];
  //      if (typeof a === "string") {
  //        return a.localeCompare(b);
  //      } else {
  //        return a - b;
  //      }
  //    });
  //  },
  //},
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 40px;
}

.app_block {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.loader {
  border: 8px solid transparent;
  border-top: 8px solid #000000;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  margin: 0 auto;
  margin-top: 15px;
}

/* Анимация спиннера */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
