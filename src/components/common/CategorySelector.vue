<template>
  <div>
    <span class="tag-group__title mr-2">Dark:</span>
    <el-tag
      v-for="(item, index) in tagList"
      :key="item.value"
      class="mx-1 my-2 cursor-pointer"
      @click="clickTag(index)"
      :effect="item.select === true ? 'dark' : 'light'"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>
<script>
export default {
  name: "CategorySelector",
  props: {
    tagList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isShowmore: false,
    };
  },
  methods: {
    clickTag(index) {
      this.tagList.forEach((item, ind) => {
        item.select = index === ind ? true : false;
      });
    },
  },
};
</script>
