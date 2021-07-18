<template>
  <div>
    <el-card>
      <div class="mb-6">
        <el-button type="primary" @click="handleCreate">新增</el-button>
      </div>
      <el-table :data="adminList" v-loading="isTableLoading">
        <el-table-column label="昵称" width="160">
          <template #default="scope">
            <div class="flex flex-row">
              <el-avatar :src="scope.row.avatar" />
              <div class="ml-2 flex truncate items-center">
                <el-tooltip :content="scope.row.nickname">
                  <div class="mt-2 mb-1 text-black-85 flex flex-start">
                    <span class="truncate">{{ scope.row.nickname }}</span>
                  </div>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :formatter="item.formatter"
          :show-overflow-tooltip="item.showOverflowTooltip"
        >
          <template v-if="item.prop === 'roles'" #default="scope" width="150">
            <el-tag
              v-for="item in Utils.getListByIds(scope.row.roles, roleList)"
              class="mr-1 mb-1"
              :key="item.value"
              type="primary"
              effect="dark"
            >
              {{ item.label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #header>
            <el-input
              size="mini"
              v-model="moduleForm.keyword"
              @change="getAdminList"
              placeholder="请输入用户名"
            />
          </template>
          <template #default="scope">
            <el-button type="text" @click="handleEdit(scope.row)" size="mini"
              >编辑</el-button
            >
            <el-button type="text" size="mini" @click="handleDel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="text-right mt-6"
        background
        layout="prev, pager, next"
        :total="pager.total"
        :page-size="pager.limit"
        @current-change="handleCurrentChange"
      />
      <AddEditAdminDialog
        :curItem="curItem"
        :roleList="roleList"
        :mode="dialogMode"
        v-model="isShowAEDialog"
        @updateList="getAdminList"
      />
      <DelDialog
        v-model="isShowDelDialog"
        @delConfirm="handleDelConfirm"
        :contents="contents"
        :isBtnLoading="isDelBtnLoading"
      />
    </el-card>
  </div>
</template>
<script>
import AddEditAdminDialog from "../components/admin/AddEditAdminDialog.vue"
import DelDialog from "../components/common/DelDialog.vue"
import { getCurrentInstance, onMounted, reactive, ref } from "vue"
import { DIALOG_MODE_ADD, DIALOG_MODE_EDIT } from "../const"
import utils from "../utils/utils"
export default {
  name: "ModulePage",
  components: { DelDialog, AddEditAdminDialog },
  setup() {
    const { ctx } = getCurrentInstance()
    const checkedBrandIds = ref([])
    const adminList = ref([])
    const roleList = ref([])
    const contents = ref([])
    const isTableLoading = ref(false)
    const isShowAEDialog = ref(false)
    const isDelBtnLoading = ref(false)
    const isShowDelDialog = ref(false)
    const dialogMode = ref(DIALOG_MODE_ADD)
    const curItem = ref({})
    const Utils = reactive(utils);
    const moduleForm = reactive({
      keyword: "",
    })
    const pager = reactive({
      page: 1,
      limit: 10,
      total: 10,
    })
    const columns = reactive([
      {
        label: "手机号",
        prop: "phone",
        minWidth: 120,
      },
      {
        label: "密码",
        prop: "password",
        minWidth: 120,
      },
      {
        label: "角色",
        prop: "roles",
        minWidth: 120,
      },
      {
        label: "创建时间",
        prop: "createdAt",
        minWidth: 150,
        formatter: (row, column, value) => {
          return utils.formateDate(new Date(value))
        },
      },
    ])

    onMounted(() => {
      getRoleList()
      getAdminList()
    })

    const getRoleList = async () => {
      try {
        const params = {
          page: 1,
          limit: 1000,
        }
        const { rows } = await ctx.$api.getRoleList(params)
        roleList.value = rows
        roleList.value.forEach((item) => {
          item.label = item.name
          item.value = item.id
        })
      } catch (error) {
        ctx.$message.error(error.msg || error)
      }
    }

    const getAdminList = async () => {
      isTableLoading.value = true
      try {
        const params = { ...pager }
        Object.keys(moduleForm).forEach((item) => {
          if (moduleForm[item]) {
            params[item] = moduleForm[item]
          }
        })
        const { count, rows } = await ctx.$api.getAdminList(params)
        adminList.value = rows
        pager.total = count
      } catch (error) {
        ctx.$message.error(error.msg || error)
      }
      isTableLoading.value = false
    }

    const deleteAdmin = async (ids, adminUserId) => {
      isDelBtnLoading.value = true
      try {
        await ctx.$api.deleteAdmin({ id: ids, adminUserId })
        ctx.$message.success("删除成功")
        isDelBtnLoading.value = false
        isShowDelDialog.value = false
        getAdminList()
      } catch (error) {
        ctx.$message.error(error.msg || error)
      }
      isDelBtnLoading.value = false
    }

    const handleDelConfirm = () => {
      deleteAdmin(curItem.value.id, curItem.value.adminUserId)
    }

    const handleDel = (row) => {
      curItem.value = row
      isShowDelDialog.value = true
    }

    const handleCreate = () => {
      dialogMode.value = DIALOG_MODE_ADD
      isShowAEDialog.value = true
    }

    const handleEdit = (row) => {
      dialogMode.value = DIALOG_MODE_EDIT
      curItem.value = row
      isShowAEDialog.value = true
    }

    const handleQuery = () => {
      pager.page = 1
      getAdminList()
    }

    const handleReset = (form) => {
      ctx.$refs[form].resetFields()
      getAdminList()
    }

    const handleCurrentChange = (current) => {
      pager.page = current
      getAdminList()
    }

    return {
      dialogMode,
      curItem,
      isShowAEDialog,
      isTableLoading,
      roleList,
      adminList,
      moduleForm,
      columns,
      pager,
      checkedBrandIds,
      getAdminList,
      handleQuery,
      handleReset,
      handleCurrentChange,
      handleDel,
      handleDelConfirm,
      handleEdit,
      handleCreate,
      deleteAdmin,
      getRoleList,
      isDelBtnLoading,
      isShowDelDialog,
      contents,
      Utils,
    }
  },
}
</script>

<style lang="scss"></style>
