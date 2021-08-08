/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-05-21 22:02:03
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-08 22:05:35
 */
import config from './../config'
export default {
    setItem(key: string, val: string){
        let storage = this.getStorage();
        storage[key] = val;
        window.localStorage.setItem(config.namespace,JSON.stringify(storage));
    },
    getItem(key: string){
        return this.getStorage()[key]
    },
    getStorage(){
        return JSON.parse(window.localStorage.getItem(config.namespace) || "{}");
    },
    clearItem(key: string){
        let storage = this.getStorage()
        delete storage[key]
        window.localStorage.setItem(config.namespace,JSON.stringify(storage));
    },
    clearAll(){
        window.localStorage.clear()
    }
}