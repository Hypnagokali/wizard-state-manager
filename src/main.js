import Vue from 'vue'
import App from './App.vue'

// import VueWizard from "./components/VueWizard";

// window.wizard = VueWizard;
// export default VueWizard;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
