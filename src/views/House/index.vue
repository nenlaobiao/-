<template>
  <div>
    <van-nav-bar
      :title="data.community"
      left-arrow
      placeholder
      @click-left="$router.back()"
    />
    <div class="house-news">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(arr, index) in data.houseImg" :key="index"
          ><van-image :src="'http://liufusong.top:8080' + arr"
        /></van-swipe-item>
      </van-swipe>
      <div class="title">
       <div class="shang">
         <h2 v-if="false">暂无标题</h2>
        <h2 v-else>{{data.community }}</h2>
        <div class="tags">
          <span v-for="(arr, index) in data.tags" :key="index">
            {{ arr }}
          </span>
        </div>
       </div>
       <div class="zhong">

       </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHouseNews } from '@/api/houseNew'
export default {
  props: {
  },
  created () {
    this.getHouseNews()
  },
  data () {
    return {
      data: {}
    }
  },
  methods: {
    async getHouseNews () {
      try {
        const res = await getHouseNews(this.$route.params.houseid)
        console.log(res)
        this.data = res.data.body
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.house-news {
  .van-swipe{
    .van-image{
      width: 100%;
    }
  }
  .title {
    padding: 0 10px;
      h2 {
      font-size: 16px;
      font-weight: 400;
      color: #333;
    }
    .tags {
      span {
        display: inline-block;
        font-size: 12px;
        border-radius: 3px;
        padding: 4px 5px;
        margin-right: 5px;
        line-height: 12px;
      }
      span:nth-child(2n + 1) {
        color: #39becd;
        background: #e1f5f8;
      }
      span:nth-child(2n) {
        color: #3fc28c;
        background: #e1f5ed;
      }
    }
    }
    .zhong{
      margin: 15px 0;
      padding: 15px 0;
      border-top:1px solid #cecece;
      border-bottom:1px solid #cecece;
  }
}
</style>
