<template>
  <header class="zl-header" :class="{'fixed': fixed}">
    <div style="float:left">
      <slot name="left" sty="ssdfs"></slot>
    </div>
    <h1 style="display:inline-block;">{ {title}}</h1>
    <div style="float:right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
/**
 * zl-header
 * @module components/header
 * @param {string} [title]
 * @param {boolean} [fixed]
 * @param {solt} [left]
 * @param {solt} [right]
 *
 * @example
 * <zlHeader title="标题" fixed>
      <div slot="left">left</div>
      <span slot="right">right</span>
      <span></span>
    </zlHeader>
 */
export default {
  name: "zl-header",
  props: {
    title: {
      type: String,
      required: true
    },
    fixed: Boolean
  }
};
</script>
<style lang="scss">
.zl-header {
  height: 40px;
  background: blue;
  width: 100%;
}
.fixed {
  position: fixed;
}
</style>
