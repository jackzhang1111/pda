// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'lib-flexible/flexible'
import '@/assets/css/reset.css'
import '@/assets/css/common.less'
import '@/assets/css/animation.less'
import {isDisabled,formValidate,strTrim,objTrim,priceReg,objDeepCopy,deepnull} from '@/common/utils'
import store from './store/index'
import * as mycomponents from '@/common/mycomponents.js'

Vue.config.productionTip = false


Vue.use(Vant);

Vue.prototype.$fn = {
  copy:objDeepCopy,
  isDisabled,
  formValidate,
  strTrim,
  objTrim,
  priceReg,
  deepnull,
}
Vue.prototype.jn = '₵'
Vue.prototype.$webUrl = 'http://192.168.1.9:8080/shangzhan168/dev/'

//注册全局组件
Object.keys(mycomponents).forEach(key => {
  Vue.component(key, mycomponents[key])
})

router.afterEach((to,from,next) => {
  window.scroll(0, 0);
});

/* eslint-disable no-new */
const main = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
export default main