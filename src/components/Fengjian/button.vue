<template>
  <div
    class="main"
    :class="[color, fontColor, noBorder]"
    :style="{ width: width + 'px' }"
    @click="$emit('isOn')"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "white",
    },
    fontColor: {
      type: String,
      default: "black",
    },
    width: {
      type: Number,
      default: 60,
    },
    noBorder: {
      type: String,
    },
  },
  data() {
    return {};
  },

  created() {},

  methods: {},
};
</script>

<style scoped>
.main {
  width: 60px;
  height: 32px;
  line-height: 32px;
  border: 0.5px solid #dcdfe6;
  font-size: 12px;
  text-align: center;
  border-radius: 3px;
  cursor: pointer;
  margin-left: 10px;
}
.blue {
  background-color: #409eff;
}
.fonstBlue {
  color: #6b9eff;
}
.fontWhite {
  color: #fff;
}
.green {
  background-color: #67c23a;
}
.noborder {
  border: unset;
}
.red {
  background-color: #f56c6c;
}
</style>
