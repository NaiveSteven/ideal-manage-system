<template>
  <div>
    <el-dialog
      :title="mode === 'add' ? '新增商品' : '编辑商品'"
      v-model="visible"
    >
      <el-form
        ref="form"
        :model="dialogForm"
        label-width="100px"
        :rules="dialogFormRules"
      >
        <el-form-item label="商品名" prop="name" label-width="100px">
          <el-input v-model="dialogForm.name" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="品牌" prop="brandId" label-width="100px">
          <el-select v-model="dialogForm.brandId" placeholder="请选择商品品牌">
            <template v-for="item in brandList" :key="item.value">
              <el-option :value="item.id" :label="item.name"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="商品类别" prop="goodsTypeId" label-width="100px">
          <el-select
            v-model="dialogForm.goodsTypeId"
            placeholder="请选择商品类别"
          >
            <template v-for="item in goodsTypeList" :key="item.value">
              <el-option :value="item.id" :label="item.name"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="图片地址" prop="imageUrl" label-width="100px">
          <el-input
            v-model="dialogForm.imageUrl"
            placeholder="请输入商品图片地址"
          />
        </el-form-item>
        <el-form-item label="规格" prop="size" label-width="100px">
          <el-input v-model="dialogForm.size" placeholder="请输入商品规格" />
        </el-form-item>
        <el-form-item label="商品价格" prop="price" label-width="100px">
          <el-input-number size="mini" v-model="dialogForm.price" />
        </el-form-item>
        <el-form-item label="市场价" prop="marketPrice" label-width="100px">
          <el-input-number size="mini" v-model="dialogForm.marketPrice" />
        </el-form-item>
        <el-form-item label="销量" prop="saleNum" label-width="100px">
          <el-input-number size="mini" v-model="dialogForm.saleNum" />
        </el-form-item>
        <el-form-item label="库存" prop="count" label-width="100px">
          <el-input-number size="mini" v-model="dialogForm.count" />
        </el-form-item>
        <el-form-item label="库存" prop="state" label-width="100px">
          <el-radio-group v-model="dialogForm.state">
            <el-radio :label="1">在售</el-radio>
            <el-radio :label="2">下架</el-radio>
            <el-radio :label="3">售罄</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="描述" prop="desc" label-width="100px">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5 }"
            v-model="dialogForm.desc"
            placeholder="请输入商品描述"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button
            type="primary"
            :loading="isBtnLoading"
            @click="handleSubmit"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getCurrentInstance, reactive, ref, toRaw, watch } from "vue";
import { GOOD_STATE, DIALOG_MODE_ADD, DIALOG_MODE_EDIT } from "../../const";
export default {
  name: "AddEditGoodsDialog",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    mode: {
      type: String,
      default: DIALOG_MODE_ADD,
    },
    brandList: {
      type: Array,
      default: () => [],
    },
    goodsTypeList: {
      type: Array,
      default: () => [],
    },
    curItem: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const { ctx } = getCurrentInstance();
    const visible = ref(false);
    const isBtnLoading = ref(false);
    const goodStateList = ref(GOOD_STATE);
    const dialogForm = reactive({
      id: "",
      name: "",
      goodsTypeId: "",
      brandId: "",
      desc: "",
      price: 0,
      marketPrice: 0,
      size: "",
      count: 0,
      saleNum: 0,
      state: 1,
      imageUrl: "",
    });
    const dialogFormRules = reactive({
      name: [
        {
          required: true,
          trigger: "change",
        },
      ],
      goodsTypeId: [
        {
          required: true,
          trigger: "change",
        },
      ],
      brandId: [
        {
          required: true,
          trigger: "change",
        },
      ],
      desc: [
        {
          required: true,
          trigger: "change",
        },
      ],
      price: [
        {
          required: true,
          trigger: "change",
        },
      ],
      marketPrice: [
        {
          required: true,
          trigger: "change",
        },
      ],
      size: [
        {
          required: true,
          trigger: "change",
        },
      ],
      count: [
        {
          required: true,
          trigger: "change",
        },
      ],
      state: [
        {
          required: true,
          trigger: "change",
        },
      ],
      imageUrl: [
        {
          required: true,
          trigger: "change",
        },
      ],
      saleNum: [
        {
          required: true,
          trigger: "change",
        },
      ],
    });

    watch(
      () => props.modelValue,
      (newValue) => {
        visible.value = newValue;
      }
    );

    watch(visible, (newValue) => {
      if (!newValue) {
        handleReset("form");
      } else {
        if (props.mode === DIALOG_MODE_EDIT) {
          ctx.$nextTick(() => {
            Object.assign(dialogForm, props.curItem);
          });
        }
      }
      emit("update:modelValue", newValue);
    });

    const handleReset = (form) => {
      ctx.$refs[form].resetFields();
    };

    const handleClose = () => {
      visible.value = false;
      handleReset("form");
    };

    const handleSubmit = () => {
      ctx.$refs.form.validate(async (valid) => {
        if (valid) {
          if (props.mode === DIALOG_MODE_ADD) {
            handleAdd();
          } else {
            handleUpdate();
          }
        }
      });
    };

    const handleAdd = async () => {
      isBtnLoading.value = true;
      try {
        await ctx.$api.addGoods(dialogForm);
        visible.value = false;
        ctx.$message.success("创建成功");
        emit("updateList");
      } catch (error) {
        ctx.$message(error.msg || error);
      }
      isBtnLoading.value = false;
    };

    const handleUpdate = async () => {
      isBtnLoading.value = true;
      try {
        const params = { ...dialogForm, id: props.curItem.id };
        await ctx.$api.updateGoods(params);
        visible.value = false;
        ctx.$message.success("编辑成功");
        emit("updateList");
      } catch (error) {
        ctx.$message(error.msg || error);
      }
      isBtnLoading.value = false;
    };

    return {
      isBtnLoading,
      goodStateList,
      visible,
      dialogForm,
      dialogFormRules,
      handleReset,
      handleClose,
      handleSubmit,
      handleUpdate,
    };
  },
};
</script>

<style lang="scss"></style>
