import axios from "axios";

export const postModule = {
  state: () => ({
    posts: [],
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
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) => {
        const a = post1[state.selectedSort];
        const b = post2[state.selectedSort];

        if (!a || !b) return 0;

        return typeof a === "string" ? a.localeCompare(b) : a - b;
      });
    },
    sortedAndSearchPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.isPostLoading = bool;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
    setPage(state, page) {
      state.page = page;
    },
    setLimit(state, limit) {
      state.limit = limit;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit("setLoading", true);
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit(
          "setTotalPages",
          Math.ceil(res.headers["x-total-count"] / state.limit)
        );
        commit("setPosts", res.data);
      } catch (error) {
        alert(error);
      } finally {
        commit("setLoading", false);
      }
    },
    async loadPosts({ state, commit }) {
      try {
        commit("setPage", state.page + 1);
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit(
          "setTotalPages",
          Math.ceil(res.headers["x-total-count"] / state.limit)
        );
        commit("setPosts", [...state.posts, ...res.data]);
      } catch (error) {
        alert(error);
      }
    },
  },
  namespaced: true,
};
