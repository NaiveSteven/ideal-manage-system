<template>
  <div>
    <el-card>
      <div class="mb-6">
        <el-button type="primary" @click="handleCreate">新增</el-button>
        <el-button type="danger" :disabled="checkedRoleIds.length === 0" @click="handleDel()">批量删除</el-button>
      </div>
      <el-table :data="roleList" @selection-change="handleSelectionChange" v-loading="isTableLoading">
        <el-table-column type="selection" width="55" />
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
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #header>
            <el-input size="mini" v-model="roleForm.keyword" @change="getRoleList" placeholder="请输入角色名" />
          </template>
          <template #default="scope">
            <el-button type="text" @click="handleEdit(scope.row)" size="mini">编辑</el-button>
            <el-button type="text" size="mini" @click="handleDel(scope.row)">删除</el-button>
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
      <AddEditRoleDialog
        :curItem="curItem"
        :mode="dialogMode"
        :permissionList="permissionList"
        :moduleList="moduleList"
        v-model="isShowAEDialog"
        @updateList="getRoleList"
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
<script setup>
import { AddEditRoleDialog } from "@/components";
import { DelDialog } from "@/components";
import { getCurrentInstance, onMounted, reactive, ref, inject } from "vue";
import { DIALOG_MODE_ADD, DIALOG_MODE_EDIT, DEL_DIALOG_SINGLE, DEL_DIALOG_MULTIPLE } from "@/const";
import utils from "@/utils/utils";
const { ctx } = getCurrentInstance();
const $api = inject("$api")
const $message = inject("$message")
const checkedRoleIds = ref([]);
const roleList = ref([]);
const contents = ref([]);
const permissionList = ref([]);
const moduleList = ref([]);
const isTableLoading = ref(false);
const isShowAEDialog = ref(false);
const isDelBtnLoading = ref(false);
const isShowDelDialog = ref(false);
const dialogMode = ref(DIALOG_MODE_ADD);
const delMode = ref(DEL_DIALOG_MULTIPLE);
const curItem = ref({});
const roleForm = reactive({
  keyword: "",
});
const pager = reactive({
  page: 1,
  limit: 10,
  total: 10,
});
const columns = reactive([
  {
    label: "角色名",
    prop: "name",
    minWidth: 120,
  },
  {
    label: "所绑定的权限点",
    prop: "permissionsID",
    minWidth: 180,
    formatter: (row, column, value) => {
      return getPermission(value);
    },
    showOverflowTooltip: true,
  },
  {
    label: "创建时间",
    prop: "createdAt",
    minWidth: 120,
    formatter: (row, column, value) => {
      return utils.formateDate(new Date(value));
    },
  },
  {
    label: "备注",
    prop: "remark",
    minWidth: 120,
  },
]);

onMounted(() => {
  getModuleList();
  getRoleList();
  getPermissionList();
});

const getModuleList = async () => {
  try {
    const params = {
      page: 1,
      limit: 1000,
    };
    const { rows } = await $api.getModuleList(params);
    moduleList.value = rows;
  } catch (error) {
    $message.error(error.msg || error);
  }
};

const getRoleList = async () => {
  isTableLoading.value = true;
  try {
    const params = { ...pager };
    Object.keys(roleForm).forEach((item) => {
      if (roleForm[item]) {
        params[item] = roleForm[item];
      }
    });
    const { count, rows } = await $api.getRoleList(params);
    roleList.value = rows;
    pager.total = count;
  } catch (error) {
    $message.error(error.msg || error);
  }
  isTableLoading.value = false;
};

const getPermissionList = async () => {
  try {
    const params = {
      page: 1,
      limit: 1000,
    };
    const { rows } = await $api.getPermissionList(params);
    permissionList.value = rows;
  } catch (error) {
    $message.error(error.msg || error);
  }
};

const deleteRole = async (ids) => {
  isDelBtnLoading.value = true;
  try {
    await $api.deleteRole({ id: ids });
    $message.success("删除成功");
    isDelBtnLoading.value = false;
    isShowDelDialog.value = false;
    getRoleList();
  } catch (error) {
    $message.error(error.msg || error);
  }
  isDelBtnLoading.value = false;
};

const handleDelConfirm = () => {
  if (delMode.value === DEL_DIALOG_SINGLE) {
    deleteRole([curItem.value.id]);
  } else {
    deleteRole(checkedRoleIds.value);
  }
};

const handleDel = (row) => {
  delMode.value = row ? DEL_DIALOG_SINGLE : DEL_DIALOG_MULTIPLE;
  isShowDelDialog.value = true;
  if (row) {
    curItem.value = row;
  }
};

const handleSelectionChange = (list) => {
  const arr = [];
  list.map((item) => {
    arr.push(item.id);
  });
  checkedRoleIds.value = arr;
};

const handleCreate = () => {
  dialogMode.value = DIALOG_MODE_ADD;
  isShowAEDialog.value = true;
};

const handleEdit = (row) => {
  dialogMode.value = DIALOG_MODE_EDIT;
  curItem.value = row;
  isShowAEDialog.value = true;
};

const handleQuery = () => {
  pager.page = 1;
  getRoleList();
};

const handleReset = (form) => {
  ctx.$refs[form].resetFields();
  getRoleList();
};

const handleCurrentChange = (current) => {
  pager.page = current;
  getRoleList();
};

const getPermission = (permissionsID) => {
  const arr = [];
  permissionList.value.forEach((item) => {
    permissionsID.forEach((cur) => {
      if (item.id === Number(cur)) {
        arr.push(item);
      }
    });
  });
  let str = "";
  if (arr) {
    arr.forEach((item) => {
      str += item.permission + "/";
    });
  }
  return str;
};
</script>

<style lang="scss"></style>
