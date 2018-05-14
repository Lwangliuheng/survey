<template>
  <div class="claim-guide">
    <h3>请输入理赔指引内容:</h3>
      <el-input
        type="textarea"
        :autosize="{ minRows: 8}"
        placeholder="请输入理赔指引内容"
        v-model="textVal">
      </el-input>
      <div class="btns">
        <el-button type="success" @click='submit' :disabled="isDisabled">提交</el-button>
        <el-button @click='clear'>清空</el-button>
      </div>
  </div>
</template>

<script>
import phones from '../js/phoneData.js'
export default {
    name: 'claimGuide',
  data (){
      return {
          phone: '',
          code: localStorage.insurecompanyCode,
          isDisabled: true
      }
  },
  computed: {
      textVal(){
        return `1、前往就近或熟悉的修理厂（4s店）进行定损
2、定损时拨打保险公司电话 ${phones[this.code]} 进行定损咨询
3、确定事故损失后，出具机动车辆保险车辆损失情况确认书等索赔材料
4、将索赔材料递交我司
5、我司完成材料审核后，支付赔款。并在支付赔款后，进行通知及回访
如有疑问可拨打： ${phones[this.code]} 进行咨询`
         
      }
  },
  watch: {
      textarea (){
          if(this.textarea){
            this.isDisabled = false;
          }else {
              this.isDisabled = true;
          }
      }
  },
  methods:{
    submit(){

    },
    clear() {
        this.textarea = '';
    }
  }
}
</script>
<style scoped>
  .claim-guide{
    background: #fff;
    margin: 15px auto;
    width: 80%;
    overflow-y: scroll;
    height: 82vh;
    padding: 20px;
  }
  .claim-guide h3 {
      font-size: 16px;
      line-height: 30px;
  }
  .claim-guide .el-textarea{
      width: 50%;
  }
    .el-button--success span {
      color: #fff;
  }
  .btns {
      width: 50%;
      padding: 20px;
      display: flex;
      justify-content: center;
  }
  .btns button {
      margin: 0 30px;
  }
</style>


