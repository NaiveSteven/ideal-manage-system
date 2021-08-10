<template>
  <div>
    <div class="mb-6">
      <el-button type="primary" @click="handleCreate">新增</el-button>
      <el-button
        type="danger"
        :disabled="checkedGoodsIds.length === 0"
        @click="handleDel()"
        >批量删除</el-button
      >
    </div>
    <el-table
      :data="placeOrderList"
      @selection-change="handleSelectionChange"
      v-loading="isTableLoading"
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
        <template v-if="item.prop === 'state'" #default="scope">
          <el-tag v-if="scope.row.state === 1" type="danger" effect="dark"
            >未付款</el-tag
          >
          <el-tag v-if="scope.row.state === 2" type="warning" effect="dark"
            >已付款未发货</el-tag
          >
          <el-tag v-if="scope.row.state === 3" type="primary" effect="dark"
            >已发货未确认收到</el-tag
          >
          <el-tag v-if="scope.row.state === 4" type="success" effect="dark"
            >确认到货订单完成</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row)" size="mini"
            >编辑</el-button
          >
          <el-button type="text" size="mini" @click="handleToDetail(scope.row)"
            >详情</el-button
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
    <AddEditOrderDialog
      :goodsList="goodsList"
      :curItem="curItem"
      :mode="dialogMode"
      v-model="isShowAEDialog"
      @updateList="getPlaceOrderList"
    />
    <!-- <DelDialog
        v-model="isShowDelDialog"
        @delConfirm="handleDelConfirm"
        :contents="contents"
        :isBtnLoading="isDelBtnLoading"
      /> -->
  </div>
</template>
<script>
import { AddEditOrderDialog } from "@/components"
// import DelDialog from "../components/common/DelDialog.vue"
import { getCurrentInstance, onMounted, reactive, ref, watch } from "vue"
import {
  GOOD_STATE,
  DIALOG_MODE_ADD,
  DIALOG_MODE_EDIT,
  DEL_DIALOG_SINGLE,
  DEL_DIALOG_MULTIPLE,
} from "@/const"
import utils from "@/utils/utils"
export default {
  name: "PlaceOrderList",
  components: { AddEditOrderDialog },
  props: {
    deal_state: String,
  },
  setup(props) {
    const { ctx } = getCurrentInstance()
    const goodStateList = ref(GOOD_STATE)
    const checkedGoodsIds = ref([])
    const placeOrderList = ref([])
    const goodsTypeList = ref([])
    const brandList = ref([])
    const goodsList = ref([])
    const userList = ref([])
    const contents = ref([])
    const isTableLoading = ref(false)
    const isShowAEDialog = ref(false)
    const isDelBtnLoading = ref(false)
    const isShowDelDialog = ref(false)
    const dialogMode = ref(DIALOG_MODE_ADD)
    const delMode = ref(DEL_DIALOG_MULTIPLE)
    const curItem = ref({})
    const placeOrderForm = reactive({
      keyword: "",
      brandId: "",
      goodsTypeId: [],
      state: 0,
    })
    const pager = reactive({
      page: 1,
      limit: 10,
      total: 10,
    })
    const columns = reactive([
      {
        label: "用户Id",
        prop: "userId",
        width: 100,
        showOverflowTooltip: true,
        formatter: (row, column, value) => {
          return utils.getListName(value, userList)
        },
      },
      {
        label: "商品名",
        prop: "goodsId",
        minWidth: 100,
        showOverflowTooltip: true,
        formatter: (row, column, value) => {
          return utils.getListName(value, goodsList)
        },
      },
      {
        label: "地址",
        prop: "address",
        width: 100,
        showOverflowTooltip: true,
      },
      {
        label: "价格",
        prop: "price",
        minWidth: 100,
      },
      {
        label: "购买数量",
        prop: "count",
        minWidth: 100,
      },
      {
        label: "状态",
        prop: "state",
        minWidth: 150,
      },
      {
        label: "创建时间",
        prop: "createdAt",
        width: 150,
        formatter: (row, column, value) => {
          return utils.formateDate(new Date(value))
        },
      },
    ])

    watch(
      () => props.deal_state,
      () => {
        getPlaceOrderList()
      }
    )
    onMounted(() => {
      getPlaceOrderList()
      getUserList()
      getGoodsList()
      getBrandList()
      getGoodsTypeList()
    })

    const getPlaceOrderList = async () => {
      isTableLoading.value = true
      try {
        const params = {
          ...pager,
        }
        if (placeOrderForm.state) {
          params.state = placeOrderForm.state
        }
        if (props.deal_state) {
          params.deal_state = Number(props.deal_state)
        }
        const { rows } = await ctx.$api.getPlaceOrderList(params)
        placeOrderList.value = rows
      } catch (error) {
        ctx.$message.error(error.msg || error)
      }
      isTableLoading.value = false
    }

    const getGoodsList = async () => {
      try {
        const params = {
          page: 1,
          limit: 1000,
        }
        const { rows } = await ctx.$api.getGoodsList(params)
        goodsList.value = rows
      } catch (error) {
        ctx.$message.error(error.msg || error)
      }
    }

    const getUserList = async () => {
      const params = { page: 1, limit: 1000 }
      try {
        const { rows } = await ctx.$api.getUserList(params)
        userList.value = rows
      } catch (error) {
        ctx.$message.error(error.msg || error)
      }
    }

    const getBrandList = async () => {
      try {
        const params = {
          page: 1,
          limit: 1000,
        }
        const { rows } = await ctx.$api.getBrandList(params)
        brandList.value = rows
      } catch (error) {
        ctx.$message(error.msg || error)
      }
    }

    const getGoodsTypeList = async () => {
      try {
        const params = {
          page: 1,
          limit: 1000,
        }
        const { rows } = await ctx.$api.getGoodsTypeList(params)
        goodsTypeList.value = rows
        modifyLabelValue(goodsTypeList.value)
      } catch (error) {
        ctx.$message(error.msg || error)
      }
    }

    const deleteGoods = async (ids) => {
      isDelBtnLoading.value = true
      try {
        await ctx.$api.deleteGoods({ id: ids })
        ctx.$message.success("删除成功")
        isDelBtnLoading.value = false
        isShowDelDialog.value = false
        getGoodsList()
      } catch (error) {
        ctx.$message.error(error.msg || error)
      }
      isDelBtnLoading.value = false
    }

    const handleDelConfirm = () => {
      if (delMode.value === DEL_DIALOG_SINGLE) {
        deleteGoods([curItem.value.id])
      } else {
        deleteGoods(checkedGoodsIds.value)
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
      checkedGoodsIds.value = arr
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
      getGoodsList()
    }

    const handleReset = (form) => {
      ctx.$refs[form].resetFields()
      getGoodsList()
    }

    const handleCurrentChange = (current) => {
      pager.page = current
      getGoodsList()
    }

    const modifyLabelValue = (list) => {
      list.forEach((item) => {
        item.label = item.name
        item.value = item.id
        if (item.children) {
          modifyLabelValue(item.children)
        }
      })
    }

    const handleToDetail = (row) => {
      ctx.$emit("toDetail", row)
    }

    return {
      delMode,
      dialogMode,
      curItem,
      isShowAEDialog,
      isTableLoading,
      goodStateList,
      goodsList,
      userList,
      placeOrderList,
      placeOrderForm,
      columns,
      pager,
      checkedGoodsIds,
      brandList,
      getPlaceOrderList,
      goodsTypeList,
      getGoodsList,
      handleQuery,
      handleReset,
      handleCurrentChange,
      handleDel,
      handleDelConfirm,
      handleEdit,
      handleSelectionChange,
      handleCreate,
      getBrandList,
      getUserList,
      getGoodsTypeList,
      deleteGoods,
      isDelBtnLoading,
      isShowDelDialog,
      contents,
      handleToDetail,
    }
  },
}
</script>

<style lang="scss"></style>
