// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './plugins/router';
import GenerateModifiers from './plugins/GenerateModifiers';
import DateFormat from './plugins/DateFormat';

Vue.config.productionTip = false;
Vue.use(GenerateModifiers);
Vue.use(DateFormat);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
