<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot />
    <p v-if="error" class="error">{{ error }}</p>
    <!-- <p>{{ form.rules }}</p> -->
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  inject: ['form'],
  data() {
    return {
      error: ''
    }
  },
  methods: {
    validate() {
      // 拿出校验规则、模型值
      const rules = this.form.rules[this.prop]
      const value = this.form.model[this.prop]

      const descriptor = {[this.prop]: rules}
      // 校验器创建
      const schema = new Schema(descriptor)
      // Promise return Boolean
      return schema.validate({[this.prop]: value}, errors => {
        if (errors) {
          this.error = errors[0].message
        } else {
          this.error = ''
        }
      })
      // console.log(rules, value)
    }
  },
  mounted() {
    this.$on('validate', () => {
      this.validate()
    })
  }
}
</script>

<style scoped>
.error {
  color: red;
  font-size: 14px;
}
</style>
