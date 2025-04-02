import axios from "axios";
import { onMounted, ref } from "vue";

export function usePosts(limit) {
  const posts = ref([]);
  const totalPages = ref(0);
  const isPostLoading = ref(true);
  const fetching = async () => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: 1,
            _limit: limit,
          },
        }
      );
      totalPages.value = Math.ceil(res.headers["x-total-count"] / limit);
      posts.value = res.data;
    } catch (error) {
      alert(error);
    } finally {
      isPostLoading.value = false;
    }
  };
  onMounted(fetching);
  return {
    posts,
    totalPages,
    isPostLoading,
  };
}
