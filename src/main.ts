import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import tagListModel from '@/models/tagList';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';

Vue.config.productionTip = false;

Vue.prototype.addTagProto = () => {
	const tag = window.prompt('全局方法：请输入新的标签');
	if (tag !== null) {
		if (tag === '') {
			alert('标签不可为空');
		} else {
			const result = tagListModel.create(tag);
			if (result.code === 0) {
				window.alert('创建成功！');
			} else {
				window.alert('创建失败！原因: ' + result.message);
			}
		}
	}
};

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
