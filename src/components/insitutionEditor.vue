<style scoped>
  .insitutionEditorBottom{
    width: 90%;
    margin: 0 auto;
  }
 .insitutionEditorBottom .insitutionMinute{
    cursor: pointer;
    width: 20%;
    text-align:  center;
    border-radius: 6px;
    margin-right: 30px;
    min-height: 250px;
    margin-bottom: 20px;
    margin-top: 10px;
  }
 .insitutionEditorBottom .insitutionEditorBox{
   margin-left: 5%;
 }
 .insitutionEditorBottom .insitutionMinute h3{
    margin-top: 5px;
    font-size: 16px;
   font-weight: 600;

  }
  .insitutionMinute .minuterdetail{
    color:#555;
    font-size:15px;
    text-align: left;
    margin-bottom: 15px;
    padding-left: 7%;
  }

  .insitutionEditorBottom .imgBox img{
    height: 68px;
    width: 68px;
    margin:0 auto;
  }
  .insitutionEditorBottom .imgBox{
    text-align: center;
    padding: 10px;
  }
  .insititueEditorTop{
    padding: 5px 25px;
    width: 85%;
    margin: 0 auto;
    border-bottom: 1px solid #bbb;
    padding-bottom: 10px;
  }
  .insititueEditorTop .insitituteEditor{
    margin-right: 5%;
    margin-top: 15px;
    cursor: pointer;
  }
  .insititueEditorTop .insitituName{
    font-weight: 600;
    padding: 15px 0;
    display: inline-block;
    font-size: 18px;
  }
  .insittituLeft,.insitituRight{
    padding: 0 15px;
  }
  .insitituRight{
    border-left: 1px solid #bbb;
    width: 62%;
  }
  .insittituLeft{
    width: 35%;
    padding-top: 30px
  }
  .infoInsitute{
    padding-left: 40px;
    padding-bottom: 12px;
    display: flex;
    line-height: 30px;
  }
  .insittituLeft .infoInsituteItem{
    width: 50%;
  }
  .infoInsitute input, .infoInsitute select{
    height: 35px;
    line-height: 35px;
    padding-left:5px;
    border: 1px solid #bbb;
    border-radius: 4px;
    width: 23%;
    margin-right: 10%;
    margin-left: 6px;
    margin-top: -3px;
  }
</style>
<template>
  <div>

    <div class="insititueEditorTop clear ">
      <h3 class="insitituName">中车定损中心</h3>
      <div class="right insitituteEditor colorGreen">
        <img @click="goBackInsititionList" class="" src="../images/editor.png"/>
        <span @click="goBackInsititionList" class="insitituteButton">编辑</span>
      </div>
      <div class="flex">
        <div class="insittituLeft">
          <p class="infoInsitute">
            <span class="infoInsituteItem">坐席数: {{seatCount}}</span>
            <span class="infoInsituteItem">未处理案件:{{insitituData.todaynotprocess}}</span>
          </p>
          <p class="infoInsitute">
            <span class="infoInsituteItem">今日已处理案件: {{insitituData.todayprocess}}</span>
            <span class="infoInsituteItem">累计处理案件: {{insitituData.totalprocess}}</span>
          </p>
        </div>
        <div class="insitituRight">
          <div class="infoInsitute">
            <span style="width:70px;">机构帐号: </span><input type="text" v-model="userName"/>
            <span style="width:70px;">帐号密码: </span><input type="text" v-model="password">
          </div>
          <div class="infoInsitute"><span style="width:70px;">联系人:</span> <input type="text" v-model="chinaName"/>
          <span style="width:70px;">手机号: </span><input type="tel" maxlength="11" v-model="telephone">
          </div>
          <div class="infoInsitute"><span style="width:70px;">当前状态:</span>
            <select v-model="editorLocked">
               <option value="0">正常</option>
              <option value="1">锁定</option>
            </select>
            </div>
        </div>
      </div>
    </div>
    <div class="insitutionEditorBottom">
      <div class="insitutionEditorBox clear" v-if="seatListActive">
        <div class="insitutionMinute bordercolorRed left" v-for="item in insitituEdirorList" v-if="item.sysUserStatus == 2">
          <div class="imgBox">
            <img src="../images/kefuBlue.png">
            <h3 class="minuteNuber">{{item.chinaName}}</h3>
          </div>
          <p class="minuterdetail" style="padding-left:5%;">当前状态: 繁忙<span class="colorRed">(处理中-未连线)</span></p>
          <p class="minuterdetail" style="padding-left:5%;">未处理案件:{{item.totalWaitingCaseCount}}</p>
          <p class="minuterdetail" style="padding-left:5%;">今日已处理案件:{{item.handleCaseCount}}</p>
          <p class="minuterdetail" style="padding-left:5%;">今日登陆时间: {{item.loginTime}}</p>
          <p class="minuterdetail" style="padding-left:5%;">累计处理案件: {{item.totalHandleCaseCount}}</p>
        </div>
        <div class="insitutionMinute bordercolorGreen left" v-for="item in insitituEdirorList"  v-if="item.sysUserStatus == 0">
          <div class="imgBox">
            <img src="../images/kefuBlue.png">
            <h3 class="minuteNuber">{{item.chinaName}}</h3>
          </div>
          <p class="minuterdetail">当前状态: 空闲</p>
          <p class="minuterdetail">未处理案件:{{item.totalWaitingCaseCount}}</p>
          <p class="minuterdetail">今日已处理案件:{{item.handleCaseCount}}</p>
          <p class="minuterdetail">今日登陆时间: {{item.loginTime}}</p>
          <p class="minuterdetail">累计处理案件: {{item.totalHandleCaseCount}}</p>
        </div>
        <div class="insitutionMinute bordercolorGray left" style="background:#F8F8F9;" v-for="item in insitituEdirorList"  v-if="item.sysUserStatus == 1 || item.sysUserStatus == null">
          <div class="imgBox">
            <img src="../images/kefuBlue.png">
            <h3 class="minuteNuber">{{item.chinaName}}</h3>
          </div>
          <p class="minuterdetail">当前状态: 未在线</p>
          <p class="minuterdetail">未处理案件:{{item.totalWaitingCaseCount}}</p>
          <p class="minuterdetail">今日已处理案件:{{item.handleCaseCount}}</p>
          <p class="minuterdetail">今日登陆时间: {{item.loginTime}}</p>
          <p class="minuterdetail">累计处理案件: {{item.totalHandleCaseCount}}</p>
        </div>
      </div>
      <div v-else style="text-align: center;margin-top: 20px;">
        <p>暂无数据</p>
      </div>

    </div>
    <!--<div id="insitituEditor">-->
        <!--<el-pagination   @current-change="handleCurrentChange"-->
        <!--:current-page="pageno"-->
        <!--:page-size = "pagesize"-->
        <!--layout="prev,pager, next"-->
        <!--:total="totalcount">-->
        <!--</el-pagination>-->
    <!--</div>-->


  </div>

</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return{
        seatListActive: true,
        seatCount: "",
        userId: "",
        editorLocked: '',
        telephone: '',
        chinaName: '',
        password: '',
        userName:"",
        insititutEditorActive: '',
        insitituEdirorList: [],
        insititutEditorData: [],
        insitituData: {}
      }
    },
    created(){
      this.insitituData = JSON.parse(localStorage.getItem("insitituData"))
      this.insititutEditorData = JSON.parse(localStorage.getItem("insititutEditorData"));
      this.seatCount = this.insititutEditorData.list.length;

      if(this.seatCount == 0){
        this.seatListActive = false
      }else{
        this.seatListActive = true
      }
      this.insitituEdirorList = this.insititutEditorData.list;
      for(let i in this.insitituEdirorList){
        if(this.insitituEdirorList[i].loginTime !== null){
          this.insitituEdirorList[i].loginTime = this.insitituEdirorList[i].loginTime.substring(10,(this.insitituEdirorList[i].loginTime.length+1))
        }
      }
      this.userName =  this.insititutEditorData.userInfo.userName;
      if(this.insititutEditorData.userInfo.password == null){
        this.password = "••••••••"
      }else{
        this.password = this.insititutEditorData.userInfo.password;
      }
      this.chinaName = this.insititutEditorData.userInfo.chinaName;
      this.telephone = this.insititutEditorData.userInfo.telephone;
      this.userId = this.insititutEditorData.userInfo.userId;
      if(this.insititutEditorData.userInfo.isLocked == 0){
        this.editorLocked = "0"
      }else{
        this.editorLocked = "1"
      }
    },
    watch: {

    },
    methods: {
      open4(resdes) {
        this.$message.error(resdes);
      },
      open2(resdes) {
        this.$message.success(resdes);
      },
      goBackInsititionList(){//保存编辑
        if(this.userName == ""){
          this.open4("请输入机构帐号")
        }else if(this.userName.length > 80){
          this.open4("请输入合理机构帐号")
        }else if(this.password == ""){
          this.open4("请输入帐号密码")
        }else if(this.telephone == ""){
          this.open4("请输入手机号")
        }else  if(!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.telephone))){
          this.open4("请输入合理手机号")
        }else if(this.chinaName == ""){
          this.open4("请输入联系人姓名")
        }else{
          if(this.password == '••••••••'){
            this.password = ''
          }
          var paramData = {
            "userName": this.userName,
            "chinaName": this.chinaName,
            "password": this.password,
            "telephone": this.telephone,
            "isLocked": this.editorLocked,
            "userId": this.userId
          }
          axios.post(this.ajaxUrl+"/pub/survey/v1/custom/service/update", paramData)
            .then(response => {
              if(response.data.rescode == 200){
                this.$store.commit('setInsititutEditorActive', false);
//                clickEditorActive
                this.$store.commit('getclickEditorActive', true);
                this.open2(response.data.resdes)
              }else{
                this.open4(response.data.resdes)
              }
            }, err => {
              console.log(err);
            })
            .catch((error) => {
              console.log(error)
            })
        }

      }
    },
    components: {
    },
  }

</script>

