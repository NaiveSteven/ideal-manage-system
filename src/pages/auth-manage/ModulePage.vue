<template>
  <div>
    <el-card>
      <div class="mb-6">
        <el-button type="primary" @click="handleCreate">新增</el-button>
        <el-button type="danger" :disabled="checkedBrandIds.length === 0" @click="handleDel()">批量删除</el-button>
      </div>
      <el-table :data="brandList" @selection-change="handleSelectionChange" v-loading="isTableLoading">
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
            <el-input size="mini" v-model="moduleForm.keyword" @change="getModuleList" placeholder="请输入模块名" />
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
      <AddEditModuleDialog :curItem="curItem" :mode="dialogMode" v-model="isShowAEDialog" @updateList="getModuleList" />
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
import { AddEditModuleDialog } from "@/components";
import { DelDialog } from "@/components";
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { DIALOG_MODE_ADD, DIALOG_MODE_EDIT, DEL_DIALOG_SINGLE, DEL_DIALOG_MULTIPLE } from "@/const";
import utils from "@/utils/utils";

const { ctx } = getCurrentInstance()
const $api = inject("$api")
const $message = inject("$message")
const checkedBrandIds = ref([]);
const brandList = ref([]);
const contents = ref([]);
const isTableLoading = ref(false);
const isShowAEDialog = ref(false);
const isDelBtnLoading = ref(false);
const isShowDelDialog = ref(false);
const dialogMode = ref(DIALOG_MODE_ADD);
const delMode = ref(DEL_DIALOG_MULTIPLE);
const curItem = ref({});
const moduleForm = reactive({
  keyword: "",
});
const pager = reactive({
  page: 1,
  limit: 10,
  total: 10,
});
const columns = reactive([
  {
    label: "模块名",
    prop: "moduleName",
    minWidth: 120,
  },
  {
    label: "备注",
    prop: "remark",
    minWidth: 120,
  },
  {
    label: "创建时间",
    prop: "createdAt",
    minWidth: 150,
    formatter: (row, column, value) => {
      return utils.formateDate(new Date(value));
    },
  },
]);

onMounted(() => {
  getModuleList();
});

const getModuleList = async () => {
  isTableLoading.value = true;
  try {
    const params = { ...pager };
    Object.keys(moduleForm).forEach((item) => {
      if (moduleForm[item]) {
        params[item] = moduleForm[item];
      }
    });
    const { count, rows } = await $api.getModuleList(params);
    brandList.value = rows;
    pager.total = count;
  } catch (error) {
    $message.error(error.msg || error);
  }
  isTableLoading.value = false;
};

const deleteBrand = async (ids) => {
  isDelBtnLoading.value = true;
  try {
    await $api.deleteModule({ id: ids });
    $message.success("删除成功");
    isDelBtnLoading.value = false;
    isShowDelDialog.value = false;
    getModuleList();
  } catch (error) {
    $message.error(error.msg || error);
  }
  isDelBtnLoading.value = false;
};

const handleDelConfirm = () => {
  if (delMode.value === DEL_DIALOG_SINGLE) {
    deleteBrand([curItem.value.id]);
  } else {
    deleteBrand(checkedBrandIds.value);
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
  checkedBrandIds.value = arr;
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
  getModuleList();
};

const handleReset = (form) => {
  ctx.$refs[form].resetFields();
  getModuleList();
};

const handleCurrentChange = (current) => {
  pager.page = current;
  getModuleList();
};
</script>

<style lang="scss"></style>
