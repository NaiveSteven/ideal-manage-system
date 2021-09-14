/*
 * @Description: description
 * @Author: mjqin
 * @Date: 2021-09-14 19:21:27
 * @LastEditTime: 2021-09-14 19:26:30
 * @LastEditors: mjqin
 */
import { ref, inject } from "vue";
export const useBrandList = () => {
  const $api = inject("$api") as { [index: string]: Function };
  const brandList = ref([]);

  const getBrandList = async () => {
    try {
      const params = { page: 1, limit: 1000 };
      const { rows } = await $api.getBrandList(params);
      brandList.value = rows;
    } catch (error) {
      console.log(error, "getBrandList error");
    }
  };

  getBrandList();

  return { brandList };
};
