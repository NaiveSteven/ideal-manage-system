import { Ref } from 'vue';
/**
 * 工具函数封装
 */
export default {
    formateDate(date: Date, rule: string) {
        let fmt = rule || 'yyyy-MM-dd hh:mm:ss'
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, date.getFullYear().toString())
        }
        const o: { [key: string]: number } = {
            // 'y+': date.getFullYear(),
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                const val = o[k] + '';
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? val : ('00' + val).substr(val.length));
            }
        }
        return fmt;
    },
    getListName(id: number, list: Ref | Array<{[index: string]: number}>, name = 'name') {
        let obj = {} as any;
        if ((list as Ref).value){
            obj = (list as Ref).value.find((item: any) => {
                return item.id === id;
            });
        } else {
            obj = (list as Array<{[index: string]: number}>).find((item: any) => {
                return item.id === id;
            });
        }
        if (!obj || Object.keys(obj).length === 0) {
            return "";
        }
        return obj[name];
    },
    getListLabel(value: number, list: Array<{[index: string]: number}>) {
        let obj = {} as any;
        obj = list.find((item: any) => {
            return item.value === value;
        });
        if (!obj || Object.keys(obj).length === 0) {
            return "";
        }
        return obj.label;
    }
}