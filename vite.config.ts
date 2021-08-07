/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-05-18 23:36:07
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-07 23:53:54
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias:{
      '@': path.resolve( __dirname, './src' )
    }
  },
  plugins: [vue()]
})
