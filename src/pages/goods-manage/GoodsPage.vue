<template>
  <div>
    <el-card class="mb-6">
      <el-form ref="form" :model="goodsForm" label-width="80px">
        <el-form-item label="商品名" prop="keyword" label-width="80px">
          <el-input class="w-1/4" v-model="goodsForm.keyword" placeholder="请输入商品名" />
        </el-form-item>
        <el-form-item label="品牌" prop="brandId" label-width="80px">
          <el-select v-model="goodsForm.brandId" placeholder="请选择商品品牌">
            <template v-for="item in brandList" :key="item.value">
              <el-option :value="item.id" :label="item.name"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="商品类别" prop="goodsTypeId" label-width="80px">
          <el-cascader v-model="goodsForm.goodsTypeId" :options="goodsTypeList" placeholder="请选择商品类别" />
          <!-- <el-select
            v-model="goodsForm.goodsTypeId"
            placeholder="请选择商品类别"
          >
            <template v-for="item in goodsTypeList" :key="item.value">
              <el-option :value="item.id" :label="item.name"></el-option>
            </template>
          </el-select> -->
        </el-form-item>
        <el-form-item label="商品状态" prop="state" label-width="80px">
          <el-select v-model="goodsForm.state">
            <template v-for="item in goodStateList" :key="item.value">
              <el-option :value="item.value" :label="item.label"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label-width="80px">
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div class="mb-6">
        <el-button type="primary" @click="handleCreate">新增</el-button>
        <el-button type="danger" :disabled="checkedGoodsIds.length === 0" @click="handleDel()">批量删除</el-button>
      </div>
      <el-table :data="goodsList" @selection-change="handleSelectionChange" v-loading="isTableLoading">
        <el-table-column type="selection" width="55" />
        <el-table-column label="商品名" width="200">
          <template #default="scope">
            <div class="flex flex-row">
              <img :src="scope.row.imageUrl" width="64" height="64" />
              <div class="ml-2 flex flex-col truncate">
                <el-tooltip :content="scope.row.name">
                  <div class="mt-2 mb-1 text-black-85 flex flex-start">
                    <span class="truncate">{{ scope.row.name }}</span>
                  </div>
                </el-tooltip>
                <el-tooltip :content="scope.row.desc">
                  <div class="mb-2 text-black-65 flex flex-start">
                    <span class="truncate">{{ scope.row.desc }}</span>
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
          <template v-if="item.prop === 'state'" #default="scope">
            <el-tag v-if="scope.row.state === 1" type="success" effect="dark">在售</el-tag>
            <el-tag v-if="scope.row.state === 2" type="warning" effect="dark">下架</el-tag>
            <el-tag v-if="scope.row.state === 3" type="danger" effect="dark">售罄</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
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
      <AddEditGoodsDialog
        :goodsTypeList="goodsTypeList"
        :brandList="brandList"
        :curItem="curItem"
        :mode="dialogMode"
        v-model="isShowAEDialog"
        @updateList="getGoodsList"
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
import { AddEditGoodsDialog } from "@/components";
import { DelDialog } from "@/components";
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { GOOD_STATE, DIALOG_MODE_ADD, DIALOG_MODE_EDIT, DEL_DIALOG_SINGLE, DEL_DIALOG_MULTIPLE } from "@/const";
import utils from "@/utils/utils";

const { ctx } = getCurrentInstance();
const $api = inject("$api")
const $message = inject("$message")
const goodStateList = ref(GOOD_STATE);
const checkedGoodsIds = ref([]);
const goodsTypeList = ref([]);
const brandList = ref([]);
const goodsList = ref([]);
const contents = ref([]);
const isTableLoading = ref(false);
const isShowAEDialog = ref(false);
const isDelBtnLoading = ref(false);
const isShowDelDialog = ref(false);
const dialogMode = ref(DIALOG_MODE_ADD);
const delMode = ref(DEL_DIALOG_MULTIPLE);
const curItem = ref({});
const goodsForm = reactive({
  keyword: "",
  brandId: "",
  goodsTypeId: [],
  state: 0,
});
const pager = reactive({
  page: 1,
  limit: 10,
  total: 10,
});
const columns = reactive([
  {
    label: "商品类别",
    prop: "goodsTypeId",
    width: 100,
    showOverflowTooltip: true,
    formatter(row, column, value) {
      return utils.getTreeListItem(value, goodsTypeList.value).name;
    },
  },
  {
    label: "品牌",
    prop: "brandId",
    width: 100,
    showOverflowTooltip: true,
    formatter(row, column, value) {
      return utils.getListName(value, brandList);
    },
  },
  {
    label: "价格",
    prop: "price",
    minWidth: 100,
  },
  {
    label: "市场价",
    prop: "marketPrice",
    minWidth: 100,
  },
  {
    label: "规格",
    prop: "size",
    minWidth: 100,
  },
  {
    label: "销量",
    prop: "saleNum",
    minWidth: 100,
  },
  {
    label: "库存",
    prop: "count",
    minWidth: 100,
  },
  {
    label: "状态",
    prop: "state",
    minWidth: 100,
    formatter(row, column, value) {
      return {
        1: "在售",
        2: "下架",
        3: "售罄",
      }[value];
    },
  },

  {
    label: "创建时间",
    prop: "createdAt",
    width: 150,
    formatter: (row, column, value) => {
      return utils.formateDate(new Date(value));
    },
  },
]);

onMounted(() => {
  getGoodsList();
  getBrandList();
  getGoodsTypeList();
});

const getGoodsList = async () => {
  isTableLoading.value = true;
  try {
    const params = { ...pager };
    Object.keys(goodsForm).forEach((item) => {
      if (goodsForm[item]) {
        params[item] = goodsForm[item];
      }
    });
    params.goodsTypeId = goodsForm.goodsTypeId.slice().pop();
    const { count, rows } = await $api.getGoodsList(params);
    goodsList.value = rows;
    pager.total = count;
  } catch (error) {
    $message.error(error.msg || error);
  }
  isTableLoading.value = false;
};

const getBrandList = async () => {
  try {
    const params = {
      page: 1,
      limit: 1000,
    };
    const { rows } = await $api.getBrandList(params);
    brandList.value = rows;
  } catch (error) {
    $message(error.msg || error);
  }
};

const getGoodsTypeList = async () => {
  try {
    const params = {
      page: 1,
      limit: 1000,
    };
    const { rows } = await $api.getGoodsTypeList(params);
    goodsTypeList.value = rows;
    modifyLabelValue(goodsTypeList.value);
  } catch (error) {
    $message(error.msg || error);
  }
};

const deleteGoods = async (ids) => {
  isDelBtnLoading.value = true;
  try {
    await $api.deleteGoods({ id: ids });
    $message.success("删除成功");
    isDelBtnLoading.value = false;
    isShowDelDialog.value = false;
    getGoodsList();
  } catch (error) {
    $message.error(error.msg || error);
  }
  isDelBtnLoading.value = false;
};

const handleDelConfirm = () => {
  if (delMode.value === DEL_DIALOG_SINGLE) {
    deleteGoods([curItem.value.id]);
  } else {
    deleteGoods(checkedGoodsIds.value);
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
  checkedGoodsIds.value = arr;
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
  getGoodsList();
};

const handleReset = (form) => {
  ctx.$refs[form].resetFields();
  getGoodsList();
};

const handleCurrentChange = (current) => {
  pager.page = current;
  getGoodsList();
};

const modifyLabelValue = (list) => {
  list.forEach((item) => {
    item.label = item.name;
    item.value = item.id;
    if (item.children) {
      modifyLabelValue(item.children);
    }
  });
};
</script>

<style lang="scss"></style>
