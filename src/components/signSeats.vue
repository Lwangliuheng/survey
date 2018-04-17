<style scoped>
  .signSeats{
    background: rgba(0,0,0,0.3);
    width:100%;
    position: fixed;
    height: 100vh;
    top:0;
    left:0;
    z-index: 200;
  }
  .signSeatsBox{
    width: 54%;
    margin: 10vh auto 0;
    background: #fff;
    padding: 20px;
    max-height: 78vh;
    position: relative;
  }
  .closCaseDetail{
    font-size: 42px;
    position: absolute;
    right: 15px;
    top: 0;
  }

  .dialogTitle{
    color: #232323;
    font-size:16px;
    font-weight: 600;
  }
  .carInfoBox .orderTime{
    color: #232323;
  }
  .carInfoBox{
    min-width: 23%;
    margin: 10px 15px;
    padding: 10px;
    font-size: 14px;
    position: relative;
  }
  .statusBox{
    position: absolute;
    right:0;
    top: 0;
    z-index: 10;
    width:35px;
    height: 35px;
  }
  .statusBox img{
    width:32px;
    height: 32px;
    margin-top: 2px;
    margin-left: 2px;
  }
  .titleInfo{
    font-size: 15px;
    padding: 15px;
  }
  .carInfoBoxOne,.carInfoBoxTwo{
    background: #fff;
    min-height: 160px;
  }

  .carInfoBox p{
    line-height: 25px;
    font-weight: normal;
    font-style: normal;
    margin-top: 10px;
  }
  .scrollBox{
    overflow-y: scroll;
    max-height: 36vh;
  }
  .imgBox{
    text-align: center;
  }
  .kefuName{
    margin-top: 15px;
  }
  .imgBox img{
    height: 60px;
    width: 60px;
    margin-top: 30px;
  }
  .seatInfo{
    padding-left: 10px;
  }
  .flex{
    padding: 5px 0;
  }
  .newAddLine{
    padding-left: 15px;
  }
  .newAddLine .tip{
    line-height: 23px;
    padding:10px 0;
    margin-bottom: 8px;
  }
  .newAddLine .textTip{
    display: inline-block;
    height: 34px;
    line-height: 34px;
    font-size:14px;
    color: #101010;
  }
  .newAddLine .ckInput{
    width: 200px;
    margin-left: 9px;
    background: #fff;
    border: 1px solid #bbb;
    height: 35px;
    padding-left: 5px;
    border-radius: 4px;
    color: #232323;
    font-size:14px;
    margin-right: 36px;
  }
  .inputBox{
    padding-left: 44px;
  }
  .inputBox .searchBtn{
    border: 1px solid #2EAB3B;
    font-size: 15px;
    border-radius: 5px;
    margin-left: 10px;
    width:106px;
    text-align: center;
    padding:5px 0;
    display: inline-block;
    margin-bottom: 5px;
    cursor: pointer;
    color: #fff;
    background: #2EAB3B;
  }
  .inputBox .searchBtn.grey{
    background: #ccc;
  }
  .resultBox{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 77px;
    padding-top:28px;
  }
  .resultTable{
    width:640px;
    margin-bottom: 36px;
  }
  .resultTable td{
    text-align: center;
    height: 30px;
    width:25%;
  }
  .confirmBtn{
    border: 1px solid #2EAB3B;
    font-size: 15px;
    border-radius: 5px;
    display: block;
    width:202px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    cursor: pointer;
    color: #fff;
    margin-left: 220px;
    margin-bottom: 10px;
    background: #2EAB3B;
  }
.mh320{
  /*min-height: 320px;*/
}
  .personStatus.active{
    background:url("../images/signed.png") no-repeat center;
  }
  .personStatus.noactive{
    background:url("../images/nosign.png") no-repeat center;
  }
</style>
<template>
  <div class="signSeats">
    <div class="signSeatsBox">
      <span @click="closSignSeat" class="right closCaseDetail">×</span>
      <div class="oneMonitor clear">
        <h4 class="dialogTitle">订单指派</h4>
        <p class="titleInfo">请选择要指派的坐席</p>
        <div class="clear scrollBox">
          <div v-for="item in signSeatData">
            <div  class="left carInfoBoxTwo bordercolorGreen carInfoBox" @click="assignThis(item.userId)" v-if="item.currentStatusAuto == 0 && item.currentStatusManual == 0">
              <div class="statusBox" v-if="item.userId == curWebSurveyorId">
                <img src="../images/active.png" alt="">
              </div>
              <div class="flex">
                <div class="imgBox">
                  <img src="../images/kefuBlue.png">
                </div>
                <div class="seatInfo">
                  <h3 class="kefuName">{{item.webSurveyorName}}</h3>
                  <p class="carInfoOne" >当前状态：空闲
                  </p>
                  <p class="carInfoOne">待处理案件：{{item.waitForProcessOrderCount}}单</p>
                </div>
              </div>
            </div>
            <div  class="left bordercolorRed carInfoBoxTwo carInfoBox" @click="assignThis(item.userId)" v-if="item.currentStatusAuto == 2 || item.currentStatusManual  == 2">
              <div class="statusBox" v-if="item.userId == curWebSurveyorId">
                <img src="../images/active.png" alt="">
              </div>
                <div class="flex">
                  <div class="imgBox">
                    <img src="../images/kefuBlue.png">
                  </div>
                  <div class="seatInfo">
                    <h3 class="kefuName">{{item.webSurveyorName}}</h3>
                    <p class="carInfoOne">当前状态：<span class="orderTime">繁忙</span>
                    </p>
                    <p class="carInfoOne">待处理案件：{{item.waitForProcessOrderCount}}单</p>
                  </div>
                </div>
              </div>
            <div  class="left bordercolorGray carInfoBoxTwo carInfoBox" @click="assignThis(item.userId)" v-if="((item.currentStatusAuto == null || item.currentStatusAuto  == 1)&&(item.currentStatusManual != 2))">
              <div class="statusBox" v-if="item.userId == curWebSurveyorId">
                <img src="../images/active.png" alt="">
              </div>
              <div class="flex">
                <div class="imgBox">
                  <img src="../images/kefuBlue.png">
                </div>
                <div class="seatInfo">
                  <h3 class="kefuName">{{item.webSurveyorName}}</h3>
                  <p class="carInfoOne" >当前状态：离线
                  </p>
                  <p class="carInfoOne">待处理案件：{{item.waitForProcessOrderCount}}单</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mh320">
          <div class="newAddLine">
            <p class="tip">请选择要指派的查勘员</p>
            <div class="clear inputBox">
              <span class="textTip">手机号：</span>
              <input type="tel" maxlength="11" minlength="11" class="ckInput" v-model="phoneNum" placeholder="请输入手机号查询" />
              <span class="textTip">姓名：</span>
              <input type="text" class="ckInput" v-model="nameInput" placeholder="请输入姓名查询" />
              <span class="searchBtn" :class="searchFlag?'':'grey'" @click="search">查询</span>
            </div>
          </div>

          <div class="resultBox" >
            <table border="0" cellspacing="0" cellpadding="0" class="resultTable" v-show="curSurveyor.name!=''">
              <tr>
                <td>姓名</td>
                <td>电话</td>
                <td>历史接单</td>
                <td>是否指派</td>
              </tr>
              <tr>
                <td>{{curSurveyor.name}}</td>
                <td>{{curSurveyor.phone}}</td>
                <td>{{curSurveyor.surveyNum}}</td>
                <td class="personStatus" :class="signActive?'active':'noactive'" @click="signActiveOrNot"></td>
              </tr>
            </table>
            <a class="confirmBtn" href="javascript:void(0);" @click="confirmSign">确定</a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return{
        signSeatData: [],
        pageData:{},
        curSurveyor:{
          name:'',
          phone:'',
          surveyNum:'',
          jobNumber:''
        },
        jobNumberCopy:'',
        phoneNum:'',
        nameInput:'',
        curWebSurveyorId:'',
        curWebSurveyorIdCopy:'',
        searchFlag:true,
        signActive:false
      }
    },
    created(){
      this.pageData = JSON.parse(localStorage.getItem("signSeatData"));
      this.signSeatData = this.pageData.webSurveyorList;
      this.curWebSurveyorIdCopy  = this.curWebSurveyorId = this.pageData.curWebSurveyorId;
      console.log(this.signSeatData);
      if(!this.pageData.curSurveyor && typeof(this.pageData.curSurveyor)!= 'undefined' && this.pageData.curSurveyor!=0){ //curSurveyor为null

      }else{
        this.curSurveyor = this.pageData.curSurveyor;
        this.jobNumberCopy = this.curSurveyor.jobNumber;
        this.signActive = true;
      }
    },
    methods: {
      confirmSign(){
        // if(this.curWebSurveyorId == -1){
        //   this.$message.error('请选择要指派的坐席');
        //   return
        // }
        // if(!this.signActive){
        //   this.$message.error('请选择要指派的查勘员');
        //   return
        // }
        if(this.curWebSurveyorId == -1&&!this.signActive){
          this.$message.error('请选择要指派的坐席或者查勘员');
          return
        }
        if(this.jobNumberCopy == this.curSurveyor.jobNumber && this.curWebSurveyorId == this.curWebSurveyorIdCopy){
          this.$store.commit('getcaseListActive', true)//调用列表接口
          this.$store.commit('setSignSeatsActive', false);//关闭组件
          return
        }
        var surveyOrderId = this.$store.state.surveyOrderId;
        var paramData;
        if(!this.signActive){
          paramData = {
            "surveyOrderId" : surveyOrderId,
            "webSurveyorId": this.curWebSurveyorId==-1?'':this.curWebSurveyorId,
            "jobNumber": ''
          }
        }else{
          paramData = {
            "surveyOrderId" : surveyOrderId,
            "webSurveyorId": this.curWebSurveyorId==-1?'':this.curWebSurveyorId,
            "jobNumber": this.curSurveyor.jobNumber
          }
        }
        axios.post(this.ajaxUrl+"/web-surveyor/v2/assign",paramData)
          .then(response => {
            console.log(response);
            if(response.data.rescode == 200){
              this.open2(response.data.resdes)
              this.$store.commit('getcaseListActive', true)//调用列表接口
              this.$store.commit('setSignSeatsActive', false);//关闭组件
            }else{
              this.open4(response.data.resdes)
              this.$store.commit('getcaseListActive', true)//调用列表接口
              if(response.data.rescode == 300){
                this.$router.push({path:'/'})
                this.$store.commit('setSignSeatsActive', false);
              }
            }
          }, err => {
            console.log(err);
          })
          .catch((error) => {
            console.log(error)
          })

      },
      signActiveOrNot(){
        this.signActive = !this.signActive;
      },
      isPoneAvailable(phone) {
        var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (!myreg.test(phone)) {
          return false;
        } else {
          return true;
        }
      },
      search(){
        if(!this.searchFlag){ //如果还没查询完，serachFlag为false,查询完为true
          return false;
        }
        this.searchFlag = false;
        if(this.phoneNum==''&&this.nameInput==''){
          this.$message.error('请至少输入一项搜索内容');
          this.searchFlag = true;
          return false;
        }
        if(this.phoneNum != ''){//如果手机号不为空
          if(this.isPoneAvailable(this.phoneNum)){ //验证手机号，通过

          }else{
            this.searchFlag = true;
            this.$message.error('请输入正确格式的手机号');
            return;
          }
        }


        var queryParams = {
          "name":this.nameInput,
          "phone":this.phoneNum
        }
        axios.post(this.ajaxUrl+'/web-surveyor/v2/querySurveyor',queryParams)
          .then(response => {
            this.searchFlag = true;
            console.log(response.data);
            if(response.data.rescode == 200){
              var xx = response.data.data;
              this.signActive = false;
              if(!xx && typeof(xx)!= 'undefined' && xx!=0){ //curSurveyor为null
                this.curSurveyor = {
                  name:'',
                  phone:'',
                  surveyNum:'',
                  jobNumber:''
                };
              }else{
                this.curSurveyor = xx;
                this.open2(response.data.resdes)
              }
              if(response.data.rescode == 300){
                this.$router.push({path:'/'})
              }
            }
          }, err => {
            console.log(err);
          })
          .catch((error) => {
            console.log(error)
          })
      },
      open4(resdes) {
        this.$message.error(resdes);
      },
      open2(resdes) {
        this.$message.success(resdes);
      },
      assignThis(webSurveyorId){
        this.curWebSurveyorId = webSurveyorId;
      },
      closSignSeat(){
        this.$store.commit('setSignSeatsActive', false);
        //清除本地存
      }
    },
    components: {
    },
  }
</script>
