<style scoped>
  .insitutionList{
    width: 90%;
    margin: 0 auto;
  }
 .insitutionList .insitutionMinute{
    cursor: pointer;
    width: 20%;
    text-align:  center;
    border-radius: 6px;
    margin-right: 30px;
    max-height: 260px;
    overflow: scroll;
    margin-bottom: 20px;
    border: 1px solid #bbb;
    margin-top: 10px;
  }
  .insitutionList .insitutionMinute h3{
    margin-top: 5px;
    font-size: 24px;
  }
  .insitutionList .insitutionMinute .minuterdetail{
    color:#555;
    font-size:15px;
    text-align: left;
    margin-bottom: 15px;
    padding-left: 7%;
  }
  .insitutionList .insitutionMinute  .minuteNuber{
    font-size: 16px;
    font-weight: 600;
  }
  .insititutListDialog{
    background: rgba(0,0,0,0.3);
    width:100%;
    position: fixed;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 100;
  }
  .insititutListDialogBox{
    width: 38%;
    margin: 10vh auto;
    background: #fff;
    padding: 20px;
    max-height: 70vh;
    position: relative;
  }
  .insititutListDialog .dialogTitle{
    color: #232323;
    font-size:16px;
    font-weight: 600;
  }

  .insititutListDialog .scrollBox{
    overflow-y: scroll;
    max-height: 60vh;
  }
  .imgBox img{
    height: 68px;
    width: 68px;
    margin:0 auto;
  }
  .imgBox{
    text-align: center;
    padding: 10px;
  }
  .carInfoBox p{
    line-height: 25px;
    font-weight: normal;
    font-style: normal;
  }

  .insitutionList .addFont{
    margin: 90px auto;
  }
  .insitutionList .addFont img{
    height: 50px;
    width: 50px;
  }
  .insititutListDialog .closinsititutMontor{
    font-size: 42px;
    right: 15px;
    top: 0;
    position: absolute;
  }
  .insititutListDialog .addinsitituteSure{
    color: #fff;
    font-size: 15px;
    display: inline-block;
    line-height: 35px;
    height: 35px;
    width: 100px;
    text-align: center;
    border-radius: 5px;
    margin-left: 18%;
    cursor: pointer;
  }
  .addinsitituteInput{
    padding: 10px 0 10px 10%;
  }
  .addinsitituteInput span{
    display: inline-block;
    min-width:20%;
  }
  .addinsitituteInput input,.addinsitituteInput select{
    height:35px;
    line-height:35px;
    padding-left: 6px;
    border: 1px solid #bbb;
    border-radius:4px;
    width: 40%;
  }
</style>
<template>
  <div>
    <div class="insititutListDialog hide">
      <div class="insititutListDialogBox">
        <span @click="closinsititutMontor" class="closinsititutMontor">×</span>
        <div class="oneMonitor clear">
          <h4 class="dialogTitle">添加机构</h4>
          <div class="clear scrollBox">
            <div style="margin-top:20px;">
              <div class="addinsitituteInput">
                <span>机构名称</span>
                <input v-model="orgname" placeholder="请输入机构名称" type="text"/>
              </div>
              <div class="addinsitituteInput">
                <span>机构帐号</span>
                <input type="text" v-model="username" placeholder="请输入坐席帐号"/>
              </div>
              <div class="addinsitituteInput">
                <span>帐号密码</span>
                <input type="text" v-model="userpwd" placeholder="请输入坐席帐号密码"/>
              </div>
              <div class="addinsitituteInput">
                <span>联系人</span>
                <input type="text" v-model="userchinaname" placeholder="请输入坐席姓名"/>
              </div>
              <div class="addinsitituteInput">
                <span>联系人手机号</span>
                <input type="tel" v-model="userphone" maxlength="11" placeholder="请输入坐席手机号"/>
              </div>
              <div class="addinsitituteInput">
                <span>所属保险公司</span>
                <select v-model="insurecode">
                  <option value="">请选择保险公司</option>
                  <option v-for="item in insurecodeOption" :value="item.code">{{item.name}}</option>
                </select>
              </div>
              <div class="addinsitituteInput">
                <span>开通省份</span>
                <select v-model="provinces">
                  <option value="">请选择开通省份</option>
                  <option  v-for="item in provincesOption" :value="item.id">{{item.name}}</option>
                </select>
              </div>
              <div class="addinsitituteInput" style="display: flex;">
                <span>开通城市</span>
                <el-checkbox-group v-model="cl" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city.id" :key="city.name">{{city.name}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="addinsitituteInput">
                <span>帐号状态</span>
                <select v-model="islocked">
                  <option value="0">正常</option>
                  <option value="1">锁定</option>
                </select>
              </div>
              <div class="addinsitituteInput">
                <span class="addinsitituteSure backColorGreen" @click="addInsititution">确定</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="insitutionList">
      <div class="insitutionBox clear">
        <div class="insitutionMinute left" v-for="item in seatsList"  @click="goInsititionEditor(item.userid,item.orgcode,item.todaynotprocess,item.todayprocess,item.totalprocess)">
          <div class="imgBox">
            <img src="../images/kefuBlue.png">
            <h3 class="minuteNuber">{{item.orgname}}</h3>
          </div>
          <p class="minuterdetail">当前状态: {{item.islockedText}}</p>
          <p class="minuterdetail">未处理案件: {{item.todaynotprocess}}</p>
          <p class="minuterdetail">今日已处理案件: {{item.todayprocess}}</p>
          <p class="minuterdetail">累计处理案件: {{item.totalprocess}}</p>
        </div>
        <div class="insitutionMinute left" style="background:#F8F8F9;min-height:260px;"  @click="addInsitituDialog">
          <div class="addFont">
            <img src="../images/add.png">
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-pagination  @current-change="handleCurrentChange"
                      :current-page="pageno"
                      :page-size = "pagesize"
                      layout="prev,pager,next"
                      :total="totalcount">
      </el-pagination>
    </div>

  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return{

        provinces: '',
        seatsListActive: false,
        checkAll: false,
        cities: [],
        isIndeterminate: true,
        orgname: "",
        username: "",
        userpwd: "",
        userchinaname: "",
        userphone: "",
        islocked: "",
        cl: [],
        insurecode: '',
        insurecodeOption : [],
        provincesOption: [],
        insititutEditorActive: '',
        totalcount: 0,
        editorActive: false,
        seatsList: [],
        pageno: 1,
        pagesize: 7,
        clickEditorActive: false
      }
    },
    watch: {
        "provinces": function(){
          axios.get(this.ajaxUrl+"/pubsurvey/manage/department/v1/"+this.provinces+"/citys")
            .then(response => {
              if(response.data.rescode == 200){
                this.cities = response.data.data
              }else{
                this.open4(response.data.resdes)
              }
            }, err => {
              console.log(err);
            })
            .catch((error) => {
              console.log(error)
            })
        },
      getUserIcons(val) {
        this.clickEditorActive = val;
        if(this.clickEditorActive){
          this.getInsitituList();
          console.log(this.$store.state.insitituPageno)
          console.log(this.pageno)
        }
      },
      getinsitituPage(val){
          this.pageno = val;
      }
    },
    props: {
      insititutActive: Boolean
    },
    created(){
      this.getInsitituList();
      this.pageno = this.$store.state.insitituPageno;
      console.log(this.pageno)
    },
    methods: {
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      open4(resdes) {
        this.$message.error(resdes);
      },
      open2(resdes) {
        this.$message.success(resdes);
      },
      getInsitituList(){
        this.pageno = this.$store.state.insitituPageno;
        var paramData = {
          "pageno": this.pageno,
          "pagesize": this.pagesize
        }
        axios.post(this.ajaxUrl+"/pubsurvey/manage/department/v1/orglist",paramData)
          .then(response => {
            if(response.data.rescode == 200){
              this.totalcount = parseInt(response.data.data.totalcount);
              this.seatsList = response.data.data.departs;
              if(response.data.data.departs.length !=0){
                this.seatsListActive = true;
                for(let i in this.seatsList){
                  if(this.seatsList[i].islocked == '0'){
                    this.seatsList[i].islockedText = "正常"
                  }else{
                    this.seatsList[i].islockedText = "锁定"
                  }
                }
              }else{
                this.seatsListActive = false;
              }
            }else{
              if(response.data.rescode == 215){
                this.open2(response.data.resdes)
              }else if(response.data.rescode == 300){
                this.$router.push({path:'/'})
              }else{
                this.open4(response.data.resdes)
              }
            }
          }, err => {
            console.log(err);
          })
          .catch((error) => {
            console.log(error)
          })
      },
      handleCurrentChange(pageno) {//
        //当前页改变调用接口  pageNo  pageSize
        this.pageno = pageno;
        this.$store.commit('getinsitituPageno', this.pageno);
        this.getInsitituList()
      },

      goInsititionEditor(userId,orgcode,todaynotprocess,todayprocess,totalprocess){//打开机构信息编辑
        var insitituData = {
          "todaynotprocess":todaynotprocess,
          "todayprocess":todayprocess,
          "totalprocess":totalprocess,
        }
        var paramData = {
          "userId": userId,
          "orgcode": orgcode
        }
        $(".seatListDialog").removeClass("hide");
        this.editorActive = true;
        axios.post(this.ajaxUrl+"/pub/survey/v1/org/service/list", paramData)
          .then(response => {
            if(response.data.rescode == 200){
                this.$store.commit('setInsititutEditorActive', true);
                localStorage.setItem("insititutEditorData",JSON.stringify(response.data.data))
                localStorage.setItem("insitituData",JSON.stringify(insitituData))
            }else{
              alert(response.data.resdes)
              if(response.data.rescode == 300){
                this.$router.push({path:'/'})
              }
            }
          }, err => {
            this.$router.push({path:'/'})
            console.log(err);
          })
          .catch((error) => {
            console.log(error)
          })
      },
      addInsitituDialog(){//打来添加机构遮盖层 获取保险公司和开通省份
        this.editorActive = false;
        $(".insititutListDialog").addClass("insititutListDialogBoxAdd");
        $(".insititutListDialog").removeClass("hide");
        axios.get(this.ajaxUrl+"/pubsurvey/manage/department/v1/provinceinsure")
          .then(response => {
            if(response.data.rescode == 200){
              this.insurecodeOption = response.data.data.insures;
              this.provincesOption = response.data.data.provinces
              console.log(response.data)
            }else{
              this.open4(response.data.resdes)
            }
          }, err => {
            console.log(err);
          })
          .catch((error) => {
            console.log(error)
          })
      },
      addInsititution(){//添加机构
        if(this.orgname == ''){
          this.open4("请输入机构名称")
        }else if(this.username == ''){
          this.open4("请输入机构帐号")
        }else if(this.userpwd == ''){
          this.open4("请输入帐号密码")
        }else if(this.userchinaname == ''){
          this.open4("请输入联系人")
        }else if(this.userphone == ''){
          this.open4("请输入联系人手机号")
        }else if(!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.userphone))){
          this.open4("请输入合理手机号")
        }else if(this.insurecode == ''){
          this.open4("请选择保险公司")
        }else if(this.cl.length == 0){
          this.open4("请选择开通省份和城市")
        }else if(this.islocked == ''){
          this.open4("请选择帐号状态")
        }else{
          var cityData = new Array();
          for(let j in this.cl){
            var obj = {}
            for(let i in this.cities){
              if(this.cl[j] == this.cities[i].id){
                obj.name = this.cities[i].name;
                obj.id = this.cities[i].id;
                cityData.push(obj)
              }
            }
          }
          console.log(cityData)
          var paramData={
            "orgname": this.orgname,
            "username": this.username,
            "userpwd": this.userpwd,
            "userchinaname": this.userchinaname,
            "userphone": this.userphone,
            "islocked": this.islocked,
            "cl": cityData,
            "insurecode": this.insurecode,
          }
          axios.post(this.ajaxUrl+"/pubsurvey/manage/department/v1/orgadd",paramData)
            .then(response => {
              if(response.data.rescode == 200){
                this.open2(response.data.resdes)
                this.cl = [];
                this.cities = []
                $(".insititutListDialog").addClass("hide");
                this.getInsitituList();
              }else{
                this.open4(response.data.resdes)
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
        }
      },
      closinsititutMontor(){//关闭添加机构遮盖层
        this.cl = [];
        this.cities = [];
        $(".insititutListDialog ").addClass("hide");
      }
    },
    components: {
    },
    computed: {
      getUserIcons(){
        return this.$store.state.clickEditorActive;
      },
      getinsitituPage(){
        return this.$store.state.insitituPageno;
      }
    }
  }

</script>

