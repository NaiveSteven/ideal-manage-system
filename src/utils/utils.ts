import { Ref } from 'vue';

interface TreeListItem {
    id: number;
    pid: number[];
    children: TreeListItem[];
}
/**
 * 工具函数封装
 */
export default {
    formateDate(date: Date, rule?: string) {
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
    getListName(id: number, list: Ref | any, name = 'name') {
        let obj = {} as any;
        if ((list as Ref).value) {
            obj = (list as Ref).value.find((item: any) => {
                return item.id === id;
            });
        } else {
            obj = (list as Array<{ [index: string]: number }>).find((item: any) => {
                return item.id === id;
            });
        }
        if (!obj || Object.keys(obj).length === 0) {
            return "";
        }
        return obj[name];
    },
    getListLabel(value: number, list: any) {
        let obj = {} as any;
        obj = list.find((item: any) => {
            return item.value === value;
        });
        if (!obj || Object.keys(obj).length === 0) {
            return "";
        }
        return obj.label;
    },
    // 找到树结构当前项
    getTreeListItem(id: number, list: TreeListItem[]) {
        let selectedItem = {} as TreeListItem;

        const getItem = (id: number, list: TreeListItem[]) => {
          list.forEach((item) => {
            if (item.id === id) {
              selectedItem = item;
            }
            if (!selectedItem.id && item.children && item.children.length > 0) {
              getItem(id, item.children);
            }
          })
        }
        getItem(id, list)
        return selectedItem;
    },
    // 根据 id 数组，找到数组中的项
    getListByIds(ids: number[] = [], list: Array<{ [index: string]: number }> = []) {
        const arr: Array<{ [index: string]: number }> = [];
        ids.forEach((item) => {
            list.forEach((cur) => {
                if (Number(item) === Number(cur.id)) {
                    arr.push(cur);
                }
            })
        })
        return arr;
    }
}