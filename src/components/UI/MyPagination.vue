<template>
  <div class="page__wrapper">
    <div
      v-for="pageNumber in totalPages"
      class="page"
      :key="pageNumber"
      :class="{ 'current-page': modelValue === pageNumber }"
      @click="changePage(pageNumber)"
    >
      {{ pageNumber }}
    </div>
  </div>
</template>

<script>
export default {
  name: "my-pagination",
  props: {
    modelValue: Number,
    totalPages: Number,
  },
  methods: {
    changePage(pageNumber) {
      this.$emit("update:modelValue", pageNumber);
    },
  },
};
</script>

<style scoped>
.page__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
}
.page {
  border: 2px solid teal;
  padding: 10px;
  margin-right: 3px;
  cursor: pointer;
}
.current-page {
  border: 3px solid teal;
  font-weight: 600;
}
</style>
