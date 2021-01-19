// 路由入口

let Vue
class KRouter {
  constructor(options) {
    this.$options = options
    this.routeMap = {}

    // 使用Vue的响应式机制，路由切换的时候，做一些响应
    this.app = new Vue({
      data: {
        // 默认更目录
        current: '/'
      }
    })
  }

  init() {
    // 启动整个路由
    // 由插件的use负责启动
    // 1. 监听 hashChange
    this.bindEvents()
    // 2. 处理路由表
    this.createRouteMap()
    // 3. 初始化组件 router-view router-link
    this.initComponent()
    // 4. 生命周期 路由守卫
  }

  bindEvents() {
    window.addEventListener('hashchange', this.onHashChange.bind(this), false)
    window.addEventListener('load', this.onHashChange.bind(this), false)
  }

  getHash() {
    return window.location.hash.slice(1) || '/'
  }

  push(url) {
    // hash模式直接赋值
    window.location.hash = url
    // history模式使用 pushState
  }

  createRouteMap() {
    this.$options.routes.forEach(item => {
      this.routeMap[item.path] = item
    })
  }

  initComponent() {
    Vue.component('router-view', {
      render: h => {
        const component = this.routeMap[this.app.current].component
        return h(component)
      }
    })

    Vue.component('router-link', {
      props: {
        to: String
      },
      // template: `<a :href="to"><slot /></a>`,
      render(h) {
        return h('a', {
          attrs: {
            href: `#${this.to}`
          }
        }, [this.$slots.default])
      }
    })
  }

  getFrom(e) {
    let from, to
    if (e.newURL) {
      from = e.oldURL.split('#')[1]
      to = e.newURL.split('#')[1]
    } else {
      from = ''
      to = this.getHash()
    }
    return { from, to }
  }

  onHashChange(e) {
    // 获取当前的哈希值
    let hash = this.getHash()
    let router = this.routeMap[hash]
    let { from, to } = this.getFrom(e)
    // 修改 this.app.current 借用 vue的响应式机制
    if (router.beforeEnter) {
      router.beforeEnter(from, to, () => {
        this.app.current = hash
      })
    } else {
      this.app.current = hash
    }
  }

  static install(_Vue) {
    Vue = _Vue
    Vue.mixin({
      beforeCreate() {
        Vue.prototype.$kkbrouter = '来了老弟, 我是路由'
        if (this.$options.router) {
          Vue.prototype.$krouter = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }
}

export default KRouter
