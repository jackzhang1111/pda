<template>
  <!-- 上架 -->
  <div class="pick-up">
    <saomiao-header @search="search"></saomiao-header>
    <div class="pick-up-order">调拨入库单号：{{detailData.stockInOrderSn}}</div>
    <div class="order-detail">
      <div class="detail-header">
        <van-icon
          name="play"
          class="play-left"
          :color="playLeft ? '#DCDCDC':'#333'"
          @click="cliPlayLeft"
        />
        <div class="num-input">
          <input type="number" v-model="current" @change="changeInput" />
        </div>
        <span class="ma-35 header-font">/</span>
        <span class="header-font">{{listLength}}</span>
        <van-icon
          name="play"
          class="play-right"
          :color="playRight ? '#DCDCDC':'#333'"
          @click="cliPlayRight"
        />
      </div>
      <div class="order-product">
        <img :src="$webUrl+currentProduct.skuImg" />
        <div class="product">
          <p>{{currentProduct.skuName}}</p>
          <p class="guige">TSIN：{{currentProduct.tsinCode}}</p>
          <p class="c-666">FNSKU：{{currentProduct.fnskuCode}}</p>
          <p class="c-666">卖家SKU：{{currentProduct.skuCode}}</p>
        </div>
      </div>
      <div class="detailed">
        <div class="detailed-item" v-for="(detailedGuige,index) in detailedGuigeList" :key="index">
          <span class="c-999">{{detailedGuige.name}}</span>&nbsp;&nbsp;&nbsp;
          <span class="c-666">{{detailedGuige.value}}</span>
        </div>
        <div class="tiji">
          <div class="clearfix">
            <span class="pl-30">单位体积 长×宽×高(cm)</span>
            <div class="fl-right">
              <span class="kuang">{{currentProduct.unitLength}}</span>
              <span>X</span>
              <span class="kuang">{{currentProduct.unitWidth}}</span>
              <span>X</span>
              <span class="kuang">{{currentProduct.unitHeight}}</span>
            </div>
          </div>
          <div class="total">
            <span>体积:</span>
            <span class="tijitotal">{{currentProduct.unitSize}}</span>
            <span>m³</span>
          </div>
        </div>
        <div class="tiji">
          <div class="clearfix">
            <span class="pl-30">装箱体积 长×宽×高(cm)</span>
            <div class="fl-right">
              <span class="kuang">{{currentProduct.boxLength}}</span>
              <span>X</span>
              <span class="kuang">{{currentProduct.boxWidth}}</span>
              <span>X</span>
              <span class="kuang">{{currentProduct.boxHeight}}</span>
            </div>
          </div>
          <div class="total">
            <span>体积:</span>
            <span class="tijitotal">{{currentProduct.boxSize}}</span>
            <span>m³</span>
          </div>
        </div>
      </div>
    </div>
    <div class="goods-shelves">
      <div class="set-shelves">
        <span @click="showPicker = true">设置上架货位</span>
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="currentProduct.columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
            v-if="showPicker"
          />
        </van-popup>
        <van-icon name="play" />
      </div>
      <div
        class="shelves-item"
        v-for="(warehouse,index) in currentProduct.warehouselist"
        :key="index"
      >
        <div class="item-title">
          <span>{{warehouse.fuseName ? warehouse.fuseName : warehouse.regionName}}</span>
          <img src="@/assets/img/lajitong.svg" @click="detailWarehouse(index,warehouse)" />
        </div>
        <div class="item-number">
          <div>{{warehouse.volume}}/{{warehouse.volume-warehouse.takeVolume}}m³</div>
          <div>{{warehouse.upItemNum*currentProduct.unitSize ? accMul(warehouse.upItemNum,currentProduct.unitSize) : 0}}m³</div>
          <div class="item-input">
            <input
              type="number"
              v-model="warehouse.upItemNum"
              @change="changNum(warehouse,'upItemNum')"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="btns">
      <div class="btn-qbrk" @click="finishPicking">确认全部上架</div>
    </div>
    <div class="shelves-place"></div>
  </div>
</template>

<script>
import saomiaoHeader from "@/multiplexing/saomiaoHeader.vue";
import { Dialog, Toast } from "vant";
import { transferinstockdowmproshelvesApi } from "@/api/warehousing/allocation/index.js";
import {
  stockInToShelvesAllApi,
  getwarehouseregionIDApi,
} from "@/api/warehousing/warehousSupplied/index.js";
export default {
  props: {},
  data() {
    return {
      listLength: 0,
      current: 1,
      detailData: {},
      currentProduct: {},
      detailedGuigeList: [
        { name: "规格属性", value: "" },
        { name: "供应商", value: "" },
        { name: "批次号", value: "" },
        { name: "调拨入库数量", value: "" },
        { name: "FNSKU", value: "" },
        { name: "装箱数量", value: "" },
        { name: "国际码", value: "" },
        { name: "上架数量", value: "" },
        { name: "入库类型", value: "" },
        { name: "单位重量(kg)", value: "" },
        { name: "入库仓库", value: "" },
        { name: "装箱重量(kg)", value: "" },
      ],
      removeData: {
        productlist: [],
        shelfDownOrderId: "",
        sourceType: 2,
      },
      shelvesData: {
        shelvesOrderId: 0,
        sourceType: 2,
        productlist: [],
      },
      paraObj: {
        typeId: 1,
        paramId: "",
      },
      productArray: [],
      showPicker: false,
      columns: [],
      goodsShelves: [], //接口货架货位
    };
  },
  computed: {
    playLeft() {
      return this.current == 1;
    },
    playRight() {
      return this.current == this.listLength;
    },
  },
  created() {},
  mounted() {
    this.paraObj.paramId = this.$route.query.orderid;
    this.transferinstockdowmproshelves(this.paraObj);
  },
  watch: {
    currentProduct: {
      handler: function (newVal) {
        this.setCurrentProduct();
      },
    },
  },
  methods: {
    //搜索框
    search(val) {
      this.productArray.forEach((item, index) => {
        if (item.fnskuCode == val) {
          this.current = index + 1;
          this.currentProduct = this.detailData.productList[index];
        }
      });
    },
    //上一个
    cliPlayLeft() {
      if (this.current <= 1) return;
      this.current--;
      this.currentProduct = this.detailData.productList[this.current - 1];
    },
    //下一个
    cliPlayRight() {
      if (this.current >= this.listLength) return;
      this.current++;
      this.currentProduct = this.detailData.productList[this.current - 1];
    },
    //上架详情
    transferinstockdowmproshelves(data) {
      transferinstockdowmproshelvesApi(data).then((res) => {
        if (res.code == 0) {
          this.detailData = res.Data;
          this.currentProduct = res.Data.productList[this.current - 1];
          this.listLength = res.Data.productList.length;
          this.productArray = res.Data.productList;

          this.removeData.shelfDownOrderId = this.detailData.shelfDownOrderId;
          this.shelvesData.shelvesOrderId = res.Data.shelvesOrderId;

          this.setCurrentProduct();

          if (!res.Data.shelvesOrderId) {
            this.getwarehouseregionID(
              { warehouseId: res.Data.warehouseId },
              true
            );
          } else {
            this.getwarehouseregionID(
              { warehouseId: res.Data.warehouseId },
              false
            );
            res.Data.productList.forEach((ele) => {
              ele.warehouselist.forEach((item) => {
                item.text = "wms";
              });
            });
          }
        }
      });
    },
    //当前商品基本属性
    setCurrentProduct() {
      this.detailedGuigeList[0].value = this.currentProduct.skuValuesTitle;
      this.detailedGuigeList[1].value = this.currentProduct.businessName;
      this.detailedGuigeList[2].value = this.currentProduct.batchNo;
      this.detailedGuigeList[3].value = this.currentProduct.detailNum;
      this.detailedGuigeList[4].value = this.currentProduct.fnskuCode;
      this.detailedGuigeList[5].value = this.currentProduct.goodnumPerBox;
      this.detailedGuigeList[6].value = this.currentProduct.intCode;
      this.detailedGuigeList[7].value = this.currentProduct.hasInDetailNum;
      this.detailedGuigeList[8].value = this.currentProduct.stockIntype;
      this.detailedGuigeList[9].value = this.currentProduct.unitWeight;
      this.detailedGuigeList[10].value = this.currentProduct.stockInWarehouse;
      this.detailedGuigeList[11].value = this.currentProduct.boxWeight;
    },
    //全部上架
    finishPicking() {
      let arr = [];
      this.productArray.forEach((ele) => {
        let obj = {
          batchNo: ele.batchNo,
          skuId: ele.skuId,
          stockInOrderType: 2,
          orderDetailId: ele.orderDetailId,
          unitSize: ele.unitSize,
          proRegion: [],
        };
        ele.warehouselist.forEach((item) => {
          if (Number(item.upItemNum) > 0) {
            let proRegionObj = {
              regionId: item.regionId,
              orderDetailId: ele.orderDetailId,
              stockInOrderType: 2,
              upItemNum: Number(item.upItemNum),
            };
            obj.proRegion.push(proRegionObj);
          }
        });
        if (obj.proRegion.length > 0) {
          arr.push(obj);
        }
        this.shelvesData.productlist = arr;
      });
      Dialog.confirm({
        title: "温馨提示",
        message: "您确定要“确认全部上架”操作吗?",
      })
        .then(() => {
          let productIndex,
            proRegionIndex,
            flag = true;
          if (this.productArray.length != this.shelvesData.productlist.length) {
            flag = false;
          }
          if (flag) {
            for (
              productIndex = 0;
              productIndex < this.shelvesData.productlist.length;
              productIndex++
            ) {
              let num = 0,
                allNum = 0;
              for (
                proRegionIndex = 0;
                proRegionIndex <
                this.shelvesData.productlist[productIndex].proRegion.length;
                proRegionIndex++
              ) {
                num += this.shelvesData.productlist[productIndex].proRegion[
                  proRegionIndex
                ].upItemNum;
              }
              if (this.productArray[productIndex].hasInDetailNum != num) {
                flag = false;
              }
            }
          }
          if (!flag) {
            Toast("全部上架数量不正确");
            return;
          }
          if (this.shelvesData.productlist.length == 0) {
            Toast("请选择库区上架");
            return;
          }
          this.stockInToShelvesAll(this.shelvesData);
        })
        .catch(() => {});
    },
    //小数点计算
    accMul(arg1, arg2) {
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
      try {
        m += s1.split(".")[1].length;
      } catch (e) {}
      try {
        m += s2.split(".")[1].length;
      } catch (e) {}
      return (
        (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
        Math.pow(10, m)
      );
    },
    onConfirm(value, valueIndexs) {
      let threeShel = null,
        twoShel = null,
        currIndex = null,
        isOne = null;
      if (this.currentProduct.columns.length == 0) return;
      twoShel = this.currentProduct.columns[valueIndexs[0]].children[
        valueIndexs[1]
      ];
      threeShel = this.currentProduct.columns[valueIndexs[0]].children[
        valueIndexs[1]
      ].children[valueIndexs[2]];
      this.currentProduct.warehouselist.push(this.$fn.copy(threeShel));

      this.showPicker = false;

      this.currentProduct.columns.forEach((one, oneIndex) => {
        let oneId = one.regionId;
        one.children.forEach((two, twoIndex) => {
          two.children.forEach((three, threeIndex) => {
            if (three.regionId == threeShel.regionId) {
              currIndex = threeIndex;
              if (three.regionId == oneId) {
                //只有库区
                isOne = true;
              }
            }
          });
        });
      });
      if (currIndex != null && !isOne) {
        //货架货区
        twoShel.children.splice(valueIndexs[2], 1);
      } else {
        //只有货区
        this.currentProduct.columns.splice(valueIndexs[0], 1);
      }
    },
    //全部上架
    stockInToShelvesAll(data) {
      stockInToShelvesAllApi(data).then((res) => {
        if (res.code == 0) {
          Toast("上架成功");
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500);
        } else if (res.code == 1) {
          Toast(
            "本次上架商品数量超过当前最大可上架商品数量（入库单入库商品数量-已创建上架单商品数量）"
          );
        } else if (res.code == 2) {
          Toast("存在重复的入库单");
        } else if (res.code == 3) {
          Toast("入库单入库仓库不一致");
        } else if (res.code == 4) {
          Toast("该入库单已上架，无需重复操作");
        } else if (res.code == 5) {
          Toast("存在本次上架数总数等于0的入库单");
        } else if (res.code == 6) {
          Toast(
            "本次上架商品体积超过库区最大可上架体积（库区空闲体积-已创建上架单待上架商品体积）"
          );
        } else if (res.code == 7) {
          Toast("该上架单不是待上架状态，不能修改");
        } else if (res.code == 8) {
          Toast("上架位置必须为无货架库区或者货位");
        } else if (res.code == 9) {
          Toast("商品不能上架到非站点仓库的正品库区");
        } else if (res.code == 11) {
          Toast("传入的源入库单明细不存在");
        } else if (res.code == 12) {
          Toast("上架数量不能小于0");
        } else if (res.code == 13) {
          Toast("目标位置的商品正在盘点中，不能进行此操作 ");
        }
      });
    },
    //垃圾桶
    detailWarehouse(index, item) {
      Dialog.confirm({
        title: "温馨提示",
        message: "您确定要删除该货位吗?",
      })
        .then(() => {
          this.currentProduct.warehouselist.splice(index, 1);
          let onecolumnIndex = null,
            twocolumnIndex;
          if (item.parentRegionId) {
            this.currentProduct.columns.forEach((column, columnIndex) => {
              column.children.forEach((two, twoIndex) => {
                if (two.regionId == item.parentRegionId) {
                  onecolumnIndex = columnIndex;
                  twocolumnIndex = twoIndex;
                  item.upItemNum = 0;
                  if (item.text == "wms") return;
                  two.children.push(item);
                }
              });
            });
            this.currentProduct.columns[onecolumnIndex].children[
              twocolumnIndex
            ].children.sort(this.$fn.compare("regionId"));
          } else {
            let ele = null;
            this.goodsShelves.forEach((good) => {
              if (good.regionId == item.regionId) {
                ele = good;
                ele.upItemNum = 0;
              }
            });
            if (item.text == "wms") return;
            this.currentProduct.columns.push(ele);
          }
        })
        .catch(() => {});
    },
    //更改页数
    changeInput() {
      this.current = Math.ceil(this.current);
      if (this.current > this.listLength) {
        this.current = this.listLength;
      } else if (this.current < 1) {
        this.current = 1;
      }
      this.currentProduct = this.detailData.productList[this.current - 1];
    },
    //修改数量
    changNum(val, name) {
      //大于0
      val[name] < 0 ? (val[name] = 0) : val[name];
      //取整
      val[name] = Math.ceil(val[name]);
    },
    //PDA获取所有库位信息接口
    getwarehouseregionID(data, flag) {
      getwarehouseregionIDApi(data).then((res) => {
        if (res.code == 0) {
          res.Data.forEach((one, oneIndex) => {
            one.text = one.regionName;
            //货区不可摆放
            if (one.canShelf == 0) {
              if (one.children.length > 0) {
                one.children.forEach((two, twoIndex) => {
                  two.text = two.regionName;
                  if (two.children.length > 0) {
                    two.children.forEach((three, threeIndex) => {
                      three.text = three.regionName;
                      three.fuseName =
                        one.regionName +
                        "-" +
                        two.regionName +
                        "-" +
                        three.regionName;
                    });
                    if (twoIndex == one.children.length - 1) {
                      this.goodsShelves.push(one);
                    }
                  }
                });
              }
            } else {
              let obj = {
                canShelf: one.canShelf,
                children: null,
                isShelf: one.isShelf,
                parentRegionId: one.parentRegionId,
                regionId: one.regionId,
                regionName: one.regionName,
                regionNo: one.regionNo,
                regionType: one.regionType,
                text: one.regionName,
                takeVolume: one.takeVolume,
                upItemNum: one.upItemNum,
                useStatus: one.useStatus,
                volume: one.volume,
                warehouseId: one.warehouseId,
                warehouseNo: one.warehouseNo,
                warehouseType: one.warehouseType,
              };
              one.children.push({
                children: [obj],
                regionName: one.regionName,
                text: one.regionName,
              });
              this.goodsShelves.push(one);
            }
          });
          this.productArray.forEach((ele) => {
            if (flag) {
              ele.warehouselist = new Array();
            }
            ele.columns = this.$fn.copy(this.goodsShelves);
          });
        }
      });
    },
  },
  components: {
    saomiaoHeader,
  },
};
</script>

<style scoped lang="less">
.pick-up {
  .pick-up-order {
    height: 68px;
    line-height: 68px;
    padding: 0 30px;
    font-size: 26px;
    color: #333;
    background-color: #fff;
    margin-bottom: 20px;
  }
  .order-detail {
    background-color: #fff;
    .detail-header {
      height: 88px;
      line-height: 88px;
      text-align: center;
      border-bottom: 1px solid #f2f3f5;
      .play-left {
        transform: rotate(180deg);
        margin-right: 30px;
      }
      .play-right {
        margin-left: 30px;
      }
      .num-input {
        width: 120px;
        height: 60px;
        display: inline-block;
        border: 1px solid #dcdcdc;
        text-align: center;
        line-height: 60px;
        input {
          width: 85%;
          height: 70%;
          border: 0;
          text-align: center;
          font-size: 34px;
        }
      }
      .ma-35 {
        margin: 0 35px;
      }
      .header-font {
        font-size: 34px;
        color: #999;
      }
    }
    .order-product {
      padding: 30px 40px 50px 30px;
      img {
        width: 140px;
        height: 140px;
        vertical-align: top;
        margin-right: 21px;
      }
      .product {
        display: inline-block;
        width: 500px;
        font-size: 26px;
        line-height: 39px;
        color: #333333;
        .guige {
          margin-top: 29px;
          font-size: 22px;
          color: #666;
        }
      }
    }
    .detailed {
      font-size: 18px;
      display: flex;
      flex-wrap: wrap;
      .detailed-item {
        width: 46%;
        padding: 20px 0px 20px 30px;
        border-bottom: 1px solid #999;
      }
      .tiji {
        width: 100%;
        padding: 20px 30px 20px 0;
        overflow: hidden;
        color: #999;
        border-bottom: 1px solid #999;
        &:nth-last-child(1) {
          border: 0;
        }
        .kuang {
          display: inline-block;
          width: 80px;
          height: 40px;
          line-height: 40px;
          // border: 2px solid #dcdcdc;
          border-radius: 6px;
          vertical-align: middle;
          text-align: center;
        }
        .total {
          width: 100%;
          text-align: right;
          margin-top: 25px;
          .tijitotal {
            font-size: 22px;
            color: #333;
          }
        }
      }
    }
  }
  .goods-shelves {
    margin-top: 20px;
    padding: 30px 0 0;
    background-color: #fff;
    margin-bottom: 100px;
    .set-shelves {
      margin: 0 30px;
      background-color: #dddddd;
      height: 68px;
      line-height: 68px;
      text-align: center;
      font-size: 30px;
      color: #333;
      margin-bottom: 20px;
      .van-icon-play {
        transform: rotate(90deg);
      }
    }
    .shelves-item {
      padding: 30px;
      border-bottom: 1px solid #999;
      &:nth-last-child(1) {
        border: 0;
      }
      .item-title {
        padding-top: 10px;
        font-size: 26px;
        color: #333;
        text-align: center;
        overflow: hidden;
        margin-bottom: 26px;
        img {
          width: 40px;
          vertical-align: middle;
          float: right;
        }
      }
      .item-number {
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        color: #333;
        .item-input {
          width: 140px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border: 1px #dcdcdc solid;
          padding-top: 2px;
          input {
            width: 90%;
            height: 85%;
            border: 0;
            text-align: center;
          }
        }
      }
    }
  }
  .btns {
    width: 100vw;
    height: 110px;
    line-height: 110px;
    text-align: center;
    font-size: 40px;
    position: absolute;
    bottom: 0;
    color: #fff;
    display: flex;
  }
  .shelves-place {
    height: 110px;
  }
  .btn-qbrk {
    width: 100vw;
    background-color: #333;
  }
}
.fs-18 {
  font-size: 18px;
}
.pl-30 {
  padding-left: 30px;
}
</style>
