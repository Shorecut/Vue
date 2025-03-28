<template>
  <div>
    <h1>Post Page</h1>
    <my-input
      v-focus
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
    />
    <div class="app_block">
      <my-button @click="showDialog">Create Post</my-button>
      <my-select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list
      v-if="!isPostLoading"
      @remove="(post) => setRemovePost(post.id)"
      :posts="sortedAndSearchPosts"
    />
    <div v-else class="loader"></div>
    <div v-intersection="loadPosts"></div>
    <!--<my-pagination v-model="page" :totalPages="totalPages" />-->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    ...mapActions({
      loadPosts: "post/loadPosts",
      fetchPosts: "post/fetchPosts",
    }),
    ...mapMutations({
      setPage: "post/setPage",
      setSearchQuery: "post/setSearchQuery",
      setSelectedSort: "post/setSelectedSort",
      setRemovePost: "post/setRemovePost",
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },

    showDialog() {
      this.dialogVisible = true;
    },
    //changePage(pageNumber) {
    //  this.page = pageNumber;
    //},
    //async fetchPosts() {
    //  try {
    //    this.isPostLoading = true;
    //    const res = await axios.get(
    //      "https://jsonplaceholder.typicode.com/posts",
    //      {
    //        params: {
    //          _page: this.page,
    //          _limit: this.limit,
    //        },
    //      }
    //    );
    //    this.totalPages = Math.ceil(res.headers["x-total-count"] / this.limit);
    //    this.posts = res.data;
    //  } catch (error) {
    //    alert(error);
    //  } finally {
    //    this.isPostLoading = false;
    //  }
    //},
    //async loadPosts() {
    //  try {
    //    this.page += 1;
    //    const res = await axios.get(
    //      "https://jsonplaceholder.typicode.com/posts",
    //      {
    //        params: {
    //          _page: this.page,
    //          _limit: this.limit,
    //        },
    //      }
    //    );
    //    this.totalPages = Math.ceil(res.headers["x-total-count"] / this.limit);
    //    this.posts = [...this.posts, ...res.data];
    //  } catch (error) {
    //    alert(error);
    //  }
    //},
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isPostLoading: (state) => state.post.isPostLoading,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,

      sortOptions: (state) => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndSearchPosts: "post/sortedAndSearchPosts",
    }),
  },
};
</script>

<style scoped>
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
