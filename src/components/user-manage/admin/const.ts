/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-10-06 06:38:02
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-06 06:43:38
 */
import { FormItemConfigItem } from "@/interfaces/ilForm"
export const FORM_MODEL = {
    id: "",
    phone: "",
    nickname: "",
    username: "",
    password: "",
    roles: [],
    avatar: "",
}
export const LAYOUT = {
    rowLayout: {
        type: "flex",
        direction: "column",
        justify: 'center'
    },
    colLayout: {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 24,
        xl: 24,
    },
}

export const FORM_CONFIG = {
    labelWidth: "100px",
    size: "mini",
    rules: {
        phone: [
            {
              required: true,
              trigger: "change",
            },
          ],
          nickname: [
            {
              required: true,
              trigger: "change",
            },
          ],
          username: [
            {
              required: true,
              trigger: "change",
            },
          ],
          password: [
            {
              required: true,
              trigger: "change",
            },
          ],
          roles: [
            {
              required: true,
              trigger: "change",
            },
          ],
          avatar: [
            {
              required: true,
              trigger: "change",
            },
          ],
    },
}

export const FORM_ITEM_CONFIG: FormItemConfigItem[] = [
    {
        type: "input",
        prop: "avatar",
        formItem: { label: "头像" },
        attrs: {
            placeholder: "请输入头像地址",
            clearable: true,
        },
    },
    {
        type: "input",
        prop: "nickname",
        formItem: { label: "昵称" },
        attrs: {
            placeholder: "请输入昵称",
            clearable: true,
        },
    },
    {
        type: "input",
        prop: "username",
        formItem: { label: "用户名" },
        attrs: {
            placeholder: "请输入用户名",
            clearable: true,
        },
    },
    {
        type: "input",
        prop: "password",
        formItem: { label: "密码" },
        attrs: {
            placeholder: "请输入密码",
            clearable: true,
        },
    },
    {
        type: "input",
        prop: "phone",
        formItem: { label: "手机号" },
        attrs: {
            placeholder: "请输入手机号",
            clearable: true,
        },
    },
    {
        type: "select",
        prop: "roles",
        formItem: { label: "角色" },
        attrs: {
            multiple: true,
            placeholder: "请选择管理员角色",
            clearable: true,
        },
    },
]

export const Options = {
    roles: []
}