/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-09-12 22:03:38
 * @LastEditors: mjqin
 * @LastEditTime: 2021-09-17 14:36:25
 */
import type { ComponentPublicInstance } from 'vue'
import { ref, watch } from 'vue';

interface CommonDialogProps {
    mode: 'add' | 'edit';
    modelValue: Boolean;
    curItem: any;
}

export function useShowDialog(
    ctx: ComponentPublicInstance,
    props: CommonDialogProps,
    emit: EmitType,
    showDialogCallback: Function,
    notShowDialogCallback: Function
) {
    const visible = ref<Boolean>(false)

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
        emit("update:modelValue", newValue)
    })

    return { visible }
}