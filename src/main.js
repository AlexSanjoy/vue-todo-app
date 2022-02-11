import Vue from 'vue'
import App from '@/App.vue'
import '@/assets/styles/main.scss'
import * as AntDesignVue from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false

Vue.use(AntDesignVue)

new Vue({
  render: h => h(App),
}).$mount('#app')
