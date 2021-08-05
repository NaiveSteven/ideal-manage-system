<!--
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-05-22 17:17:40
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-05 23:50:17
-->
<template>
  <template v-for="menu in menuData">
    <el-submenu
      v-if="
        menu.children &&
        menu.children.length > 0 &&
        validatePermission(menu.permission)
      "
      :key="menu.name"
      :index="menu.name"
    >
      <template #title>
        <i :class="menu.icon"></i>
        <span>{{ menu.menuName }}</span>
      </template>
      <tree-menu :menuData="menu.children" />
    </el-submenu>
    <el-menu-item
      v-if="
        (!menu.children || menu.children.length === 0) &&
        validatePermission(menu.permission)
      "
      :index="menu.name"
      :key="menu.name"
      ><template #title>
        <i :class="menu.icon"></i>
        <span>{{ menu.menuName }}</span>
      </template></el-menu-item
    >
  </template>
</template>
<script>
export default {
  name: "TreeMenu",
  props: {
    menuData: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {
    permissionList() {
      return this.$store.state.permissionList
    },
  },
  methods: {
    validatePermission(permission) {
      const item = this.permissionList.find(
        (item) => item.permission === permission
      )
      return Boolean(item)
    },
  },
}
</script>
