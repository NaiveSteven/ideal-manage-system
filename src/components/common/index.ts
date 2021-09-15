/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-08-07 23:36:42
 * @LastEditors: mjqin
 * @LastEditTime: 2021-09-15 18:21:37
 */
import CategorySelector from "./CategorySelector.vue";
import DelDialog from "./DelDialog.vue";
import IlCol from "./il-col/IlCol.vue";
import IlContainer from "./il-container/IlContainer.vue";
import IlForm from "./il-form/IlForm.vue";
import IlInput from "./il-input/IlInput.vue";
import IlSelect from "./il-select/IlSelect.vue";
import type { Plugin, App } from "vue";

export type SFCWithInstall<T> = T & Plugin;

const components = [IlCol, IlContainer, IlForm, IlInput, IlSelect];
const componentNames = ["IlCol", "IlContainer", "IlForm", "IlInput", "IlSelect"];

// const _Col: SFCWithInstall<typeof Col> = Col as SFCWithInstall<typeof Col>
const install = (app: App) => {
  components.forEach((component, index) => {
    app.component(componentNames[index], component);
  });
};
export { CategorySelector, DelDialog, install };

export default { install };
