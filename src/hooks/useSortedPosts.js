import { computed, ref } from "vue";

export default function useSortedPosts(posts) {
  const selectedSort = ref("");
  const sortedPosts = computed(() => {
    if (!posts?.value || !Array.isArray(posts.value)) {
      console.warn(posts);
      return [];
    }
    return [...posts.value].sort((post1, post2) => {
      const a = post1[selectedSort.value];
      const b = post2[selectedSort.value];

      if (!a || !b) return 0;

      return typeof a === "string" ? a.localeCompare(b) : a - b;
    });
  });
  return {
    selectedSort,
    sortedPosts,
  };
}
