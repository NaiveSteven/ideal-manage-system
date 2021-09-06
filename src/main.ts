/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-05-18 23:36:07
 * @LastEditors: mjqin
 * @LastEditTime: 2021-09-07 00:08:52
 */
import { createApp } from 'vue'
import App from './App.vue'
import route from './router'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
import request from './utils/request'
import storage from './utils/storage'
import api from './apis/index';
import store from './store'
import './index.css';

console.log("环境变量=>", import.meta.env)

const app = createApp(App);
app.config.globalProperties.$request = request;
app.config.globalProperties.$api = api;
app.config.globalProperties.aaaaa = 'aaaaa';
app.config.globalProperties.$storage = storage;
app.use(route).use(store).use(ElementPlus, { size: 'small' }).mount('#app')
