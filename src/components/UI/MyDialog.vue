<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import dialogMixin from "@/components/mixins/dialogMixin";

export default {
  name: "my-dialog",
  mixins: [dialogMixin],
  //props: {
  //  show: {
  //    type: Boolean,
  //    default: true,
  //  },
  //},
  //methods: {
  //  hideDialog() {
  //    this.$emit("update:show", false);
  //  },
  //},
};
</script>

<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}
.dialog__content {
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 60px;
  width: 400px;
  padding: 20px;
}
</style>
