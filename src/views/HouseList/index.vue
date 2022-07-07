<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.back()">
      <template #title>
        <van-search
          v-model="value"
          show-action
          label="地址"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          ><template #label>
            <van-button type="primary" size="mini" to="address">{{
              $store.state.nowAddress.label
            }}</van-button>
          </template>
          <template #action>
            <van-icon name="location" size="24" />
          </template>
        </van-search>
      </template>
    </van-nav-bar>
    <van-sticky>
      <van-dropdown-menu>
        <van-dropdown-item title="区域" ref="item1">
          <van-picker
            ref="val1"
            :default-index="0"
            title="标题"
            :columns="areaList"
            @change="onArea"
          />
          <div class="box">
            <van-button type="primary" block @click="onConfirm1"
              >取消</van-button
            >
            <van-button color="#1cb676" @click="okFn1" type="primary" block
              >确认</van-button
            >
          </div>
        </van-dropdown-item>
        <van-dropdown-item title="方式" ref="item2">
          <van-picker
            ref="val2"
            :default-index="1"
            title="标题"
            :columns="allInfo.rentType"
            @change="onMode"
          />
          <div class="box">
            <van-button type="primary" block @click="onConfirm2"
              >取消</van-button
            >
            <van-button color="#1cb676" @click="okFn2" type="primary" block
              >确认</van-button
            >
          </div>
        </van-dropdown-item>
        <van-dropdown-item title="租金" ref="item3">
          <van-picker
            ref="val3"
            :default-index="1"
            title="标题"
            :columns="allInfo.price"
            @change="onPrice"
          />
          <div class="box">
            <van-button type="primary" block @click="onConfirm3"
              >取消</van-button
            >
            <van-button color="#1cb676" @click="okFn3" type="primary" block
              >确认</van-button
            >
          </div>
        </van-dropdown-item>
        <van-dropdown-item title="筛选" @open="show = true" ref="item4">
        </van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>
    <div class="sky" v-if="skyShow">
      <van-image
        src="http://liufusong.top:8080/img/not-found.png"
      />
      <p>暂无房源</p>
    </div>
    <div v-else class="cardlist">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <Card
          v-for="(obj, index) in houseList"
          :key="index"
          :houseData="obj"
        ></Card>
      </van-list>
    </div>

    <van-popup
      close-icon="close"
      v-model="show"
      position="right"
      :style="{ height: '100%', width: '80%' }"
    >
      <Popup :menuData="allInfo" @submit="submit"></Popup
    ></van-popup>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import Popup from './components/Popup.vue'
import { getHouseInfo, getHouseList } from '@/api/houseList'
export default {
  created () {
    this.getHouseInfo()
    this.getHouseList()
  },
  data () {
    return {
      loading: false,
      finished: false,
      skyShow: false,
      menuData: [],
      show: false,
      value: '',
      active: 0,
      allInfo: {}, // 全部数
      houseList: [],
      dataObj: {
        cityId: this.$store.state.nowAddress.value,
        start: 1,
        end: 20
      }
    }
  },
  methods: {
    onLoad () {
      this.dataObj.start += 20
      this.dataObj.end += 20
      this.getHouseList()
    },
    submit (obj) {
      this.show = false
      // console.log(obj)
      // console.log(this.dataObj)
      this.houseList = []
      this.dataObj.start = 1
      this.dataObj.end = 20
      this.dataObj.more = obj.join()
      this.getHouseList()
    },
    okFn1 () {
      this.onConfirm1()
      // console.log(1)
      this.houseList = []
      this.dataObj.start = 1
      this.dataObj.end = 20
      this.getHouseList()
    },
    okFn2 () {
      this.onConfirm2()
      // console.log(2)
      this.houseList = []
      this.dataObj.start = 1
      this.dataObj.end = 20
      this.getHouseList()
    },
    okFn3 () {
      this.onConfirm3()
      // console.log(3)
      this.houseList = []
      this.dataObj.start = 1
      this.dataObj.end = 20
      this.getHouseList()
    },
    onConfirm1 () {
      this.$refs.item1.toggle()
    },
    onConfirm2 () {
      this.$refs.item2.toggle()
    },
    onConfirm3 () {
      this.$refs.item3.toggle()
    },

    onArea () {
      const value = this.$refs.val1.getValues()
      console.log(value)
      // console.log(value[0].value)
      let area = null
      if (value[0].value !== 'area') {
        delete this.dataObj.area
        area = 'subway'
      } else {
        delete this.dataObj.subway
        area = 'area'
      }
      if (value[1].value !== 'null') {
        if (value[2].value === 'null') {
          // console.log(value[1].text)
          this.dataObj[area] = value[1].value
        } else {
          console.log(value[2].text)
          this.dataObj[area] = value[2].value
        }
      }
    },
    onMode () {
      const value = this.$refs.val2.getValues()
      delete this.dataObj.rentType
      // console.log(value)
      if (value[0].value !== 'null') {
        console.log(value[0].value)
        this.dataObj.rentType = value[0].value
      }
    },
    onPrice () {
      const value = this.$refs.val3.getValues()
      delete this.dataObj.price
      // console.log(value)
      if (value[0].value !== 'null') {
        console.log(value[0].value)
        this.dataObj.price = value[0].value
      }
    },

    onSearch () { },
    async getHouseList () {
      this.loading = true
      this.finished = false
      try {
        const res = await getHouseList(this.dataObj)
        this.houseList.push(...res.data.body.list)
        console.log(res)
        this.skyShow = false
        if (res.data.body.list.length < 1) {
          this.finished = true
          this.skyShow = true
        }
        this.loading = false
      } catch (error) {
        this.finished = true
        console.log(error)
      }
    },
    async getHouseInfo () {
      try {
        const res = await getHouseInfo()
        const josn = JSON.stringify(res.data.body).replace(/label/g, 'text').replace(/"null"/g, '"null","children":[""]')
        this.allInfo = JSON.parse(josn)
        // this.$store.commit('addDatas', this.allInfo)
        console.log(this.allInfo)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    areaList () { // 区域下拉菜单数据
      const allInfo = this.$store.state.allDatas
      const data = [allInfo.area, allInfo.subway]
      return data
    }
  },
  watch: {},
  filters: {},
  components: { Popup, Card }
}
</script>

<style scoped lang='less'>
.sky {
  text-align: center;
  .van-image {
    width: 150px ;
    margin: 20px auto 10px;
  }
  p {
    font-size: 14px;
    color: #333;
  }
}
.cardlist {
  overflow: hidden;
  padding-bottom: 50px;
  //   overflow: auto;
  //   height: calc(100vh - 100px);
}
.van-dropdown-item {
  .box {
    display: flex;
    border-top: 1px solid #e9e9e9;
    .van-button:nth-child(1) {
      flex: 1;
    }
    .van-button:nth-child(2) {
      flex: 2;
    }
  }
}
/deep/ .van-dropdown-menu__title--active {
  color: #1cb576;
}
/deep/.van-nav-bar__title {
  max-width: 100%;
}
.van-search {
  margin-left: 25px;
  width: 335px;
  .van-button {
    font-size: 14px;
    transform: translateY(-5px);
  }
}
.van-search__label {
  height: 16px;
  margin: 0;
  margin-top: 8px;
  padding: 0;
  padding-right: 10px;
  border-right: 1px solid #e5e5e5;
  margin-right: 10px;
  line-height: 16px;
}
/deep/.van-cell {
  i {
    color: #9c9fa1 !important;
  }
}
/deep/.van-dropdown-menu__bar {
  height: 40px !important;
}
</style>
