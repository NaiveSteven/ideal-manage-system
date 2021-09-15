/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-09-12 22:03:38
 * @LastEditors: mjqin
 * @LastEditTime: 2021-09-15 18:36:05
 */
import type { ComponentPublicInstance } from 'vue'
import { ref, watch } from 'vue';
import { DIALOG_MODE_ADD, DIALOG_MODE_EDIT } from "@/const"

interface CommonDialogProps {
    mode: DIALOG_MODE_ADD | DIALOG_MODE_EDIT;
    modelValue: Boolean;
    curItem: any;
}

export function useShowDialog(
    ctx: ComponentPublicInstance,
    props: CommonDialogProps,
    emit: any,
    showDialogCallback: Function,
    notShowDialogCallback: Function
) {
    const visible = ref<Boolean>(false)
    const emits = defineEmits(["update:modelValue"])

    watch(
        () => props.modelValue,
        (newValue) => {
            visible.value = newValue
        }
    )

    watch(visible, (newValue) => {
        if (!newValue) {
            notShowDialogCallback()
        } else {
            showDialogCallback()
        }
        emits("update:modelValue", newValue)
    })

    return { visible }
}