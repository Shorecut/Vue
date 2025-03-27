<template>
  <div class="navbar">
    <div style="cursor: pointer" @click="$router.push('/')">VUE</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Posts</my-button>
      <my-button @click="$router.push('/about')" style="margin-left: 10px"
        >About</my-button
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  position: sticky;
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px #000000;
  display: flex;
  border-radius: 0 0 9px 9px;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns {
  margin-left: auto;
}
</style>
