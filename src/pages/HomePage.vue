<template>
  <div class="basic-layout">
    <div
      :class="['nav-side', isCollapse ? 'fold' : 'unfold', 'overflow-hidden']"
    >
      <!-- 系统LOGO -->
      <div class="logo">
        <img src="./../assets/logo.png" />
        <span>Ideal</span>
      </div>
      <!-- 导航菜单 -->
      <el-menu
        :default-active="activeMenu"
        background-color="#001529"
        text-color="#fff"
        :collapse="isCollapse"
        class="nav-menu"
        @select="handleSelectMenu"
      >
        <tree-menu :menuData="menuData" />
      </el-menu>
    </div>
    <div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
      <div class="nav-top">
        <div class="nav-left">
          <div class="menu-fold" @click="toggle">
            <i class="el-icon-s-fold"></i>
          </div>
          <div class="bread">
            <BreadCrumb />
          </div>
        </div>
        <div class="user-info">
          <el-select
            v-model="curRole"
            placeholder="请选择角色"
            class="mr-2"
            @change="handleRoleChange"
          >
            <template v-for="item in curRoleList" :key="item.id">
              <el-option :value="item.id" :label="item.name"></el-option>
            </template>
          </el-select>
          <el-badge
            :is-dot="noticeCount > 0 ? true : false"
            class="notice"
            type="danger"
          >
            <i class="el-icon-bell"></i>
          </el-badge>
          <el-dropdown @command="handleLogout">
            <div class="flex items-center flex-col">
              <el-avatar :size="20" :src="userInfo.avatar">
                <img
                  src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                />
              </el-avatar>
              <div class="user-link">
                <span>{{ userInfo.nickname }}</span>
                <i class="el-icon--right"></i>
              </div>
            </div>

            <template #dropdown>
              <el-dropdown-menu>
                <div class="flex justify-center">
                  <el-avatar :size="40" :src="userInfo.avatar">
                    <img
                      src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                    />
                  </el-avatar>
                </div>

                <el-dropdown-item command="email" class="flex justify-center"
                  >昵称：{{ userInfo.nickname }}</el-dropdown-item
                >
                <el-dropdown-item command="username" class="flex justify-center"
                  >用户名：{{ userInfo.username }}</el-dropdown-item
                >
                <el-dropdown-item command="phone" class="flex justify-center"
                  >手机号：{{ userInfo.phone }}</el-dropdown-item
                >
                <el-dropdown-item command="logout" class="flex justify-center"
                  >退出</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div
        class="bg-gray-200 p-6 overflow-auto"
        style="height: calc(100vh - 50px)"
      >
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TreeMenu from "../components/TreeMenu.vue"
import BreadCrumb from "../components/BreadCrumb.vue"
import storage from "../utils/storage"
import { MENU_DATA } from "../const/index.ts"
export default {
  name: "HomePage",
  components: { TreeMenu, BreadCrumb },
  data() {
    return {
      isCollapse: false,
      noticeCount: 0,
      menuData: MENU_DATA,
      activeMenu: "",
      curRole: "",
      roleList: [], // 所有角色
      curRoleList: [], // 当前用户角色列表
      permissionList: [], // 所有权限点
    }
  },
  async created() {
    this.getAdminUserInfo()
    await this.getRoleList()
    this.getPermissionList()
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
  },
  watch: {
    $route: {
      handler() {
        this.activeMenu = this.$route.name
      },
      immediate: true,
    },
  },
  methods: {
    async getAdminUserInfo() {
      try {
        const res = await this.$api.getAdminUserInfo()
        this.$store.commit("saveData", { data: res, key: "userInfo" })
      } catch (error) {
        this.$message.error(error.msg || error)
      }
    },
    async getRoleList() {
      try {
        const params = { page: 1, limit: 1000 }
        const { rows } = await this.$api.getRoleList(params)
        this.roleList = rows
      } catch (error) {
        this.$message.error(error.msg || error)
      }
    },
    async getPermissionList() {
      try {
        const params = { page: 1, limit: 1000 }
        const { rows } = await this.$api.getPermissionList(params)
        this.permissionList = rows
        if (
          this.userInfo &&
          this.userInfo.roles &&
          this.userInfo.roles.length > 0
        ) {
          this.curRoleList = this.getCurList(this.userInfo.roles, this.roleList)
          this.curRole = this.curRoleList[0].id
          const curPermissionNameList = this.getCurPermissionNameList(
            this.permissionList
          )
          const curPermissionList = this.getCurList(
            this.curRoleList[0].permissionsID,
            this.permissionList
          )
          this.$store.commit("saveData", {
            data: curPermissionList,
            key: "permissionList",
          })
          this.$store.commit("saveData", {
            data: curPermissionNameList,
            key: "permissionNameList",
          })
        }
      } catch (error) {
        console.log(error, "error")
        this.$message.error(error.msg || error)
      }
    },
    handleRoleChange(roleId) {
      const curRoleItem = this.roleList.find(
        (item) => Number(roleId) === Number(item.id)
      )
      const curPermissionList = this.getCurList(
        curRoleItem.permissionsID,
        this.permissionList
      )
      const curPermissionNameList = this.getCurPermissionNameList(
        this.permissionList
      )
      this.$store.commit("saveData", {
        data: curPermissionList,
        key: "permissionList",
      })
      this.$store.commit("saveData", {
        data: curPermissionNameList,
        key: "permissionNameList",
      })
      this.goRouteByRole(curRoleItem)
    },
    getCurList(ids, list) {
      const arr = []
      list.forEach((item) => {
        ids.forEach((cur) => {
          if (Number(cur) === Number(item.id)) {
            arr.push(item)
          }
        })
      })
      return arr
    },
    getCurPermissionNameList(permissionList) {
      const arr = []
      permissionList.forEach((item) => {
        arr.push(item.name)
      })
      return arr
    },
    handleLogout(key) {
      if (key === "logout") {
        storage.clearItem("token")
        this.userInfo = null
        this.$router.push("/login")
      }
    },
    handleSelectMenu(name) {
      if (this.$route.name !== name) {
        this.$router.push({
          name,
        })
      }
    },
    goRouteByRole(curRoleItem) {
      if (curRoleItem.name === "超级管理员") {
        this.$router.push({
          name: "home",
        })
      } else if (curRoleItem.name === "订单操作员") {
        this.$router.push({
          name: "placeOrderManage",
        })
      } else if (curRoleItem.name === "商品管理员") {
        this.$router.push({
          name: "brandManage",
        })
      } else if (curRoleItem.name === "游客") {
        this.$router.push({
          name: "home",
        })
      }
    },
    toggle() {
      this.isCollapse = !this.isCollapse
    },
  },
}
</script>

<style lang="scss">
.basic-layout {
  position: relative;
  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    overflow-y: auto;
    transition: width 0.5s;
    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;
      img {
        margin: 0 16px;
        width: 32px;
        height: 32px;
      }
    }
    .nav-menu {
      height: calc(100vh - 50px);
      border-right: none;
    }
    // 合并
    &.fold {
      width: 64px;
    }
    // 展开
    &.unfold {
      width: 200px;
    }
  }
  .content-right {
    margin-left: 200px;
    overflow: hidden;
    // 合并
    &.fold {
      margin-left: 64px;
    }
    // 展开
    &.unfold {
      margin-left: 200px;
    }
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      .nav-left {
        display: flex;
        align-items: center;
        .menu-fold {
          margin-right: 15px;
          font-size: 18px;
        }
      }
      .user-info {
        .notice {
          line-height: 30px;
          margin-right: 15px;
        }
        .user-link {
          cursor: pointer;
          color: #409eff;
        }
      }
    }
  }
}
</style>
