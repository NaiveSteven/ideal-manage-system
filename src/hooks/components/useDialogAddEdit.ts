/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-09-12 17:01:37
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-06 04:28:54
 */
import type { Ref, ComponentInternalInstance } from 'vue'
import {getCurrentInstance} from 'vue'
import { ElMessage, ElForm } from 'element-plus'
import { ref } from 'vue';
import { DIALOG_MODE_ADD } from "@/const"

interface CommonDialogProps {
    mode: 'edit' | 'add';
    modelValue: Boolean;
    curItem: any;
}

export function useDialogAddEdit(
    props: CommonDialogProps,
    emit: EmitType,
    asyncAddFunc: Function,
    asyncUpdateFunc: Function,
    visible: Ref<Boolean>,
    getAddParams: Function,
    getUpdateParams: Function,
) {
    const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance
    const isConfirmBtnLoading = ref<Boolean>(false)

    const handleSubmit = () => {
        (ctx?.$refs.form as typeof ElForm).validate((valid: Boolean) => {
            if (valid) {
                if (props.mode === DIALOG_MODE_ADD) {
                    handleAdd()
                } else {
                    handleUpdate()
                }
            }
        })
    }

    const handleAdd = async () => {
        isConfirmBtnLoading.value = true
        try {
            await asyncAddFunc(getAddParams())
            visible.value = false
            ElMessage.success("创建成功")
            emit("updateList")
        } catch (error) {
            ElMessage(error.msg || error)
        }
        isConfirmBtnLoading.value = false
    }

    const handleUpdate = async () => {
        isConfirmBtnLoading.value = true
        try {
            await asyncUpdateFunc(getUpdateParams())
            visible.value = false
            ElMessage.success("编辑成功")
            emit("updateList")
        } catch (error) {
            ElMessage(error.msg || error)
        }
        isConfirmBtnLoading.value = false
    }

    return { isConfirmBtnLoading, handleSubmit, handleAdd, handleUpdate }
}