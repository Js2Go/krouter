<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this // 把当前表单实例传下去
    }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validate(cb) {
      // 遍历所有item
      const tasks = this.$children
        .filter(item => item.prop)
        .map(item => item.validate())
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false))
    }
  }
}
</script>

<style scoped>

</style>
