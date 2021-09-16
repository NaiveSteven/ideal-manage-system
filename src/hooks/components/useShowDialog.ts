/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-09-12 22:03:38
 * @LastEditors: mjqin
 * @LastEditTime: 2021-09-16 14:21:19
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
    emit: any,
    showDialogCallback: Function,
    notShowDialogCallback: Function
) {
    const visible = ref<Boolean>(false)
    // const emits = defineEmits(["update:modelValue"])

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