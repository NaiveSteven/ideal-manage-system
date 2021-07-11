<template>
  <div>
    <el-card>
      <div class="mb-6">
        <el-button type="primary" @click="handleCreate">新增</el-button>
        <el-button
          type="danger"
          :disabled="checkedGoodsTypeIds.length === 0"
          @click="handleDel()"
          >批量删除</el-button
        >
      </div>
      <el-table
        :data="goodsTypeList"
        @selection-change="handleSelectionChange"
        v-loading="isTableLoading"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        row-key="id"
      >
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
              v-model="goodsTypeForm.keyword"
              @change="getGoodsTypeList"
              placeholder="请输入品牌名"
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
      <AddEditGoodsTypeDialog
        :curItem="curItem"
        :mode="dialogMode"
        :goodsTypeList="goodsTypeList"
        v-model="isShowAEDialog"
        @updateList="getGoodsTypeList"
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
import AddEditGoodsTypeDialog from "../components/goodsType/AddEditGoodsTypeDialog.vue"
import DelDialog from "../components/common/DelDialog.vue"
import { getCurrentInstance, onMounted, reactive, ref } from "vue"
import {
  DIALOG_MODE_ADD,
  DIALOG_MODE_EDIT,
  DEL_DIALOG_SINGLE,
  DEL_DIALOG_MULTIPLE,
} from "../const"
import utils from "../utils/utils"
export default {
  name: "GoodsTypePage",
  components: { DelDialog, AddEditGoodsTypeDialog },
  setup() {
    const { ctx } = getCurrentInstance()
    const checkedGoodsTypeIds = ref([])
    const goodsTypeList = ref([])
    const contents = ref([])
    const isTableLoading = ref(false)
    const isShowAEDialog = ref(false)
    const isDelBtnLoading = ref(false)
    const isShowDelDialog = ref(false)
    const dialogMode = ref(DIALOG_MODE_ADD)
    const delMode = ref(DEL_DIALOG_MULTIPLE)
    const curItem = ref({})
    const goodsTypeForm = reactive({
      keyword: "",
    })
    const pager = reactive({
      page: 1,
      limit: 10,
      total: 10,
    })
    const columns = reactive([
      {
        label: "商品类别名",
        prop: "name",
        minWidth: 120,
        hasChildren: true,
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
      getGoodsTypeList()
    })

    const getGoodsTypeList = async () => {
      isTableLoading.value = true
      try {
        const params = { ...pager }
        Object.keys(goodsTypeForm).forEach((item) => {
          if (goodsTypeForm[item]) {
            params[item] = goodsTypeForm[item]
          }
        })
        const { count, rows } = await ctx.$api.getGoodsTypeList(params)
        goodsTypeList.value = rows
        modifyLabelValue(goodsTypeList.value);
        pager.total = count
      } catch (error) {
        ctx.$message.error(error.msg || error)
      }
      isTableLoading.value = false
    }

    const deleteGoodsType = async (ids) => {
      isDelBtnLoading.value = true
      try {
        await ctx.$api.deleteGoodsType({ id: ids })
        ctx.$message.success("删除成功")
        isDelBtnLoading.value = false
        isShowDelDialog.value = false
        getGoodsTypeList()
      } catch (error) {
        ctx.$message.error(error.msg || error)
      }
      isDelBtnLoading.value = false
    }

    const handleDelConfirm = () => {
      if (delMode.value === DEL_DIALOG_SINGLE) {
        deleteGoodsType([curItem.value.id])
      } else {
        deleteGoodsType(checkedGoodsTypeIds.value)
      }
    }

    const handleDel = (row) => {
      delMode.value = row ? DEL_DIALOG_SINGLE : DEL_DIALOG_MULTIPLE
      isShowDelDialog.value = true
      if (row) {
        curItem.value = row
      }
    }

    const handleSelectionChange = (list) => {
      const arr = []
      list.map((item) => {
        arr.push(item.id)
      })
      checkedGoodsTypeIds.value = arr
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
      getGoodsTypeList()
    }

    const handleReset = (form) => {
      ctx.$refs[form].resetFields()
      getGoodsTypeList()
    }

    const handleCurrentChange = (current) => {
      pager.page = current
      getGoodsTypeList()
    }

    const modifyLabelValue = (list) => {
      list.forEach((item) => {
        item.label = item.name;
        item.value = item.id;
        if (item.children) {
          modifyLabelValue(item.children)
        }
      })
    }

    return {
      delMode,
      dialogMode,
      curItem,
      isShowAEDialog,
      isTableLoading,
      goodsTypeList,
      goodsTypeForm,
      columns,
      pager,
      checkedGoodsTypeIds,
      getGoodsTypeList,
      handleQuery,
      handleReset,
      handleCurrentChange,
      handleDel,
      handleDelConfirm,
      handleEdit,
      handleSelectionChange,
      handleCreate,
      deleteGoodsType,
      modifyLabelValue,
      isDelBtnLoading,
      isShowDelDialog,
      contents,
    }
  },
}
</script>

<style lang="scss"></style>
