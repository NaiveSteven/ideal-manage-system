/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-08-07 23:36:42
 * @LastEditors: mjqin
 * @LastEditTime: 2021-09-21 03:07:25
 */
import CategorySelector from "./CategorySelector.vue";
import DelDialog from "./DelDialog.vue";
import IlCol from "./il-col/IlCol.vue";
import IlContainer from "./il-container/IlContainer.vue";
import IlForm from "./il-form/IlForm.vue";
import IlInput from "./il-input/IlInput.vue";
import IlRadio from './il-radio/IlRadio.vue';
import IlSelect from "./il-select/IlSelect.vue";
import IlTable from './il-table/IlTable.vue';
import IlTableColumn from './il-table/IlTableColumn.vue';
import type { App } from "vue";

const components = [IlCol, IlContainer, IlForm, IlInput, IlSelect, IlRadio, IlTable, IlTableColumn];
const componentNames = ["IlCol", "IlContainer", "IlForm", "IlInput", "IlSelect", 'IlRadio', 'IlTable', 'IlTableColumn'];

const install = (app: App) => {
  components.forEach((component, index) => {
    app.component(componentNames[index], component);
  });
};
export { CategorySelector, DelDialog, install };

export default { install };
