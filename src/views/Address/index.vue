<template>
  <div>
    <van-nav-bar
      title="账号登录"
      left-arrow
      placeholder
      @click-left="onClickLeft"
    />
    <van-index-bar :index-list="addressIndex">
      <van-index-anchor index="#">#</van-index-anchor>
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="热">热</van-index-anchor>
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-index-anchor
        :index="obj.num"
        v-for="(obj, index) in allAddress"
        :key="index"
        >{{ obj.num }}
        <van-cell
          :index="obj.num"
          :title="item.label"
          v-for="(item, index) in obj"
          :key="index"
        />
      </van-index-anchor>
    </van-index-bar>
  </div>
</template>

<script>
import { getAddressList } from '@/api/address'
export default {
  created () {
    this.getAddressList()
  },
  data () {
    return {
      allAddress: [],
      addressIndex: [],
      abc: []
    }
  },
  methods: {
    async getAddressList () {
      const res = await getAddressList(1)
      console.log(res)
      this.addressIndex = res.data.body.map((value) => {
        return value.short.slice(0, 1)
      })
      this.addressIndex = this.$arr.uniq(this.addressIndex).sort()
      this.addressIndex.forEach((val, index) => {
        this.allAddress.push(res.data.body.filter(value => {
          const a = value.short.slice(0, 1)
          return a === val
        }))
        this.allAddress[index].num = val.toUpperCase()
        console.log()
      })
      this.addressIndex = this.addressIndex.map(value => value.toUpperCase())
      console.log(this.allAddress)
      console.log(this.addressIndex)
      this.addressIndex.unshift('#', '热')
    },
    onClickLeft () {
      this.$router.go(-1)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
