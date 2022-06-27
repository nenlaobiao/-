<template>
  <div>
    <van-nav-bar title="账号登录" left-arrow placeholder  @click-left="onClickLeft" />
    <van-form @submit="onSubmit" >
      <van-field
      size=""
        v-model="username"
        center
        label-align='left'
        name="username"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
        v-model="password"
        center
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button  block type="info" native-type="submit"
          >登 录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onClickLeft () { },
    onSubmit (values) {
      console.log('submit', values)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
// .van-form{
  // margin: 20px;
// }
.van-form{
  margin-top: 45px;
.van-field{
  width: 690px;
  font-size: 36px;
  height: 125px;
  line-height: 38px;
   border-bottom:1px solid rgb(231, 231, 231);
  margin:10px 30px  ;
  padding:8px 0px ;
}
.van-button{
  margin-top: 50px;
  height: 100px;
  font-size: 36px;
}
}
</style>
