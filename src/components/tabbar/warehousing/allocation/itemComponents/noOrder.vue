<template>
  <div class="no-order">
    <nosaomiao-header :title="detailStatus"></nosaomiao-header>
    <img src="@/assets/img/nosearch.png" />
    <p>{{tips}}</p>
  </div>
</template>

<script>
import nosaomiaoHeader from "@/multiplexing/nosaomiaoHeader.vue";
export default {
  props: {},
  data() {
    return {
      detailStatus: "扫描结果",
      tips: "",
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.$toast.clear();
    if (this.$route.query.type == 1) {
      this.tips = "该商品不存在,请重新扫描";
    } else if (this.$route.query.type == 2) {
      this.tips = "该商品无需入库,请重新扫描";
    } else if (this.$route.query.type == 3) {
      this.tips = "该单不存在,请重新扫描";
    } else if (this.$route.query.type == 4) {
      this.tips = "该单未入库,请先入库再上架";
    } else if (this.$route.query.type == 5) {
      this.tips = "该单已完成上架,无需重复操作";
    }
  },
  watch: {},
  methods: {},
  components: {
    nosaomiaoHeader,
  },
};
</script>

<style scoped lang="less">
.no-order {
  text-align: center;
  img {
    margin: 300px 0 50px;
    width: 380px;
  }
}
</style>
