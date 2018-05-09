var stack = []
var isPush = true
var isReplace = false

function hack(router) {
  var originPush = router.push
  var originReplace = router.replace
  router.push = function() {
    isPush = true
    originPush.apply(router, arguments)
  }
  router.replace = function() {
    isPush = true
    isReplace = true
    originReplace.apply(router, arguments)
  }
  router.afterEach(function(to) {
    if (isPush) {
      if (isReplace) {
        stack.pop()
      }
      stack.push(to.name)
    } else {
      stack.pop()
      if (stack.length == 0) {
        stack.push(to.name)
      }
    }
    isPush = false
    isReplace = false
  })
}

export default {
  install: function(Vue, options) {
    hack(options.router)
    Vue.component('AppRouter', {
      data: function() {
        return {stack: stack}
      },
      watch: {
        stack: function() {
          this.emitChange()
        }
      },
      mounted: function() {
        this.emitChange()
      },
      methods: {
        emitChange: function() {
          this.$emit('change', stack[stack.length - 1])
        }
      },
      render: function(h) {
        var keepAlive = Vue.component('KeepAlive')
        var routerView = Vue.component('router-view')
        return h(keepAlive, {
          props: {
            include: stack
          }
        }, [h(routerView)])
      }
    })
    Vue.prototype.$getRouterStack = function() {
      return stack
    }
  }
}
