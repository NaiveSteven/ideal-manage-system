/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-09-12 17:01:37
 * @LastEditors: mjqin
 * @LastEditTime: 2021-09-12 23:11:46
 */
import type { ComponentPublicInstance, Ref } from 'vue'
import { ElMessage, ElForm } from 'element-plus'
import { ref } from 'vue';
import { DIALOG_MODE_ADD, DIALOG_MODE_EDIT } from "@/const"
import { Error } from '@/interfaces/Common.ts'

interface CommonDialogProps {
    mode: DIALOG_MODE_ADD | DIALOG_MODE_EDIT;
    modelValue: Boolean;
    curItem: any;
}

export function useDialogAddEdit(
    ctx: ComponentPublicInstance,
    props: CommonDialogProps,
    emit: any,
    asyncAddFunc: Function,
    asyncUpdateFunc: Function,
    visible: Ref<Boolean>,
    getAddParams: Function,
    getUpdateParams: Function,
) {
    const isConfirmBtnLoading = ref<Boolean>(false)

    const handleSubmit = () => {
        (ctx.$refs.form as typeof ElForm).validate((valid: Boolean) => {
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
        } catch (error: Error) {
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
        } catch (error: Error) {
            ElMessage(error.msg || error)
        }
        isConfirmBtnLoading.value = false
    }

    return { isConfirmBtnLoading, handleSubmit, handleAdd, handleUpdate }
}