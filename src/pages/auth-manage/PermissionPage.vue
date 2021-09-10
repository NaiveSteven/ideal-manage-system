<template>
  <div>
    <el-card>
      <div class="mb-6 flex justify-between items-center">
        <div>
          <el-button type="primary" @click="handleCreate">新增</el-button>
          <el-button type="danger" :disabled="checkedPermissionIds.length === 0" @click="handleDel()"
            >批量删除</el-button
          >
        </div>
        <el-select v-model="permissionForm.permission_type" @change="handleQuery" placeholder="请选择类型">
          <template v-for="item in permissionTypeList" :key="item.value">
            <el-option :value="item.value" :label="item.label"></el-option>
          </template>
        </el-select>
      </div>
      <el-table :data="permissionList" @selection-change="handleSelectionChange" v-loading="isTableLoading">
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
            <el-input
              size="mini"
              v-model="permissionForm.keyword"
              @change="getPermissionList"
              placeholder="请输入权限点名"
            />
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
      <AddEditPermissionDialog
        :curItem="curItem"
        :mode="dialogMode"
        v-model="isShowAEDialog"
        @updateList="getPermissionList"
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
import { AddEditPermissionDialog } from "@/components";
import { DelDialog } from "@/components";
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import {
  DIALOG_MODE_ADD,
  DIALOG_MODE_EDIT,
  DEL_DIALOG_SINGLE,
  DEL_DIALOG_MULTIPLE,
  PERMISSION_TYPE_LIST,
} from "@/const";
import utils from "@/utils/utils";

const { ctx } = getCurrentInstance();
const $api = inject("$api")
const $message = inject("$message")
const checkedPermissionIds = ref([]);
const permissionList = ref([]);
const moduleList = ref([]);
const contents = ref([]);
const isTableLoading = ref(false);
const isShowAEDialog = ref(false);
const isDelBtnLoading = ref(false);
const isShowDelDialog = ref(false);
const dialogMode = ref(DIALOG_MODE_ADD);
const delMode = ref(DEL_DIALOG_MULTIPLE);
const permissionTypeList = ref(PERMISSION_TYPE_LIST);
const curItem = ref({});
const permissionForm = reactive({
  keyword: "",
  permission_type: 0,
});
const pager = reactive({
  page: 1,
  limit: 10,
  total: 10,
});
const columns = reactive([
  {
    label: "名称",
    prop: "name",
    minWidth: "110",
  },
  {
    label: "permission",
    prop: "permission",
    minWidth: "110",
    showOverflowTooltip: true,
  },
  {
    label: "权限点类别",
    prop: "permission_type",
    minWidth: "110",
    formatter(row, column, value) {
      return utils.getListLabel(value, PERMISSION_TYPE_LIST);
    },
  },
  {
    label: "所属模块名",
    prop: "moduleId",
    minWidth: "110",
    showOverflowTooltip: true,
    formatter(row, column, value) {
      return utils.getListName(value, moduleList, "moduleName");
    },
  },
  {
    label: "创建时间",
    prop: "createdAt",
    width: "150",
    formatter: (row, column, value) => {
      return utils.formateDate(new Date(value));
    },
  },
]);

onMounted(() => {
  getModuleList();
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

const getPermissionList = async () => {
  isTableLoading.value = true;
  try {
    const params = { ...pager };
    Object.keys(permissionForm).forEach((item) => {
      if (permissionForm[item]) {
        params[item] = permissionForm[item];
      }
    });
    const { count, rows } = await $api.getPermissionList(params);
    permissionList.value = rows;
    pager.total = count;
  } catch (error) {
    $message.error(error.msg || error);
  }
  isTableLoading.value = false;
};

const deletePermission = async (ids) => {
  isDelBtnLoading.value = true;
  try {
    await $api.deletePermission({ id: ids });
    $message.success("删除成功");
    isDelBtnLoading.value = false;
    isShowDelDialog.value = false;
    getPermissionList();
  } catch (error) {
    $message.error(error.msg || error);
  }
  isDelBtnLoading.value = false;
};

const handleDelConfirm = () => {
  if (delMode.value === DEL_DIALOG_SINGLE) {
    deletePermission([curItem.value.id]);
  } else {
    deletePermission(checkedPermissionIds.value);
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
  checkedPermissionIds.value = arr;
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
  getPermissionList();
};

const handleReset = (form) => {
  ctx.$refs[form].resetFields();
  getPermissionList();
};

const handleCurrentChange = (current) => {
  pager.page = current;
  getPermissionList();
};
</script>

<style lang="scss"></style>
