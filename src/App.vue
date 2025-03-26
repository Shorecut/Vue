<template>
  <div class="app">
    <h1>Post Page</h1>
    <my-input v-model="searchQuery" />
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
      :posts="sortedAndSearchPosts"
    />
    <div v-else class="loader"></div>
    <my-pagination v-model="page" :totalPages="totalPages" />
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
      searchQuery: "",
      page: 1,
      limit: 10,
      totalPages: 100,

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
    changePage(pageNumber) {
      this.page = pageNumber;
    },
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(res.headers["x-total-count"] / this.limit);
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
      return [...this.posts].sort((post1, post2) => {
        const a = post1[this.selectedSort];
        const b = post2[this.selectedSort];

        if (!a || !b) return 0;

        return typeof a === "string" ? a.localeCompare(b) : a - b;
      });
    },
    sortedAndSearchPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  watch: {
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
    page() {
      this.fetchPosts();
    },
  },
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
