export default {
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    hideDialog() {
      this.$emit("update:show", false);
    },
  },
};
