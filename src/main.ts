/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-05-18 23:36:07
 * @LastEditors: mjqin
 * @LastEditTime: 2021-09-16 10:30:23
 */
import { createApp } from 'vue'
import App from './App.vue'
import route from './router'
import ElementPlus from 'element-plus'
import { ElMessage } from 'element-plus' 
import 'element-plus/lib/theme-chalk/index.css';
import ideal from './components/common/index'
import request from './utils/request'
import storage from './utils/storage'
import api from './apis/index';
import store from './store'
import './index.css';

console.log("环境变量=>", import.meta.env)

const app = createApp(App);
app.config.globalProperties.$app = api
app.config.globalProperties.$request = request
app.config.globalProperties.$storage = storage
app.provide('$api', api);
app.provide('$message', ElMessage)
app.provide('$request', request)
app.provide('$storage', storage)
app.use(route).use(store).use(ideal).use(ElementPlus, { size: 'small' }).mount('#app')
