<template>
  <div>
    <h1>Post Page</h1>
    <my-input v-focus v-model="searchQuery" />
    <div class="app_block">
      <my-button>Create Post</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form />
    </my-dialog>
    <post-list v-if="!isPostLoading" :posts="sortedAndSearchPosts" />
    <div v-else class="loader"></div>
    <!--<div v-intersection="loadPosts"></div>-->
    <!--<my-pagination v-model="page" :totalPages="totalPages" />-->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import { usePosts } from "@/hooks/usePosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import axios from "axios";
export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,

      sortOptions: [
        { value: "title", name: "by name" },
        { value: "body", name: "by desc" },
        { value: "id", name: "by Id" },
      ],
    };
  },

  setup(props) {
    const { posts, isPostLoading, totalPages } = usePosts(0);
    const { selectedSort, sortedPosts } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchPosts } =
      useSortedAndSearchedPosts(sortedPosts);

    return {
      posts,
      isPostLoading,
      totalPages,
      selectedSort,
      sortedAndSearchPosts,
      sortedPosts,
      searchQuery,
    };
  },
};
</script>

<style>
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
