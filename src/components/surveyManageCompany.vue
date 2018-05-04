<template>
  <div>
    <div class="insititutListDialog hide">
      <div class="insititutListDialogBox">
        <span @click="closinsititutMontor" class="closinsititutMontor">×</span>
        <div class="oneMonitor clear">
          <h4 class="dialogTitle">查勘员信息</h4>
          <div class="clear scrollBox">
            <div class="surveyInfo">
              <div class="imgBox">
               <img :src="surveyInfo.auHeadIcon"/>
                <span class="editorSurvey" @click="openEditor">
                  编辑
                </span>
              </div>
              <div class="addinsitituteInput">
                <span class="spanInfo">姓名:</span>
                <span class="infoDetail">{{surveyInfo.auUserName}}</span>
              </div>
              <div class="addinsitituteInput">
                <span class="spanInfo">电话:</span>
                <span class="infoDetail">{{surveyInfo.auPhone}}</span>
              </div>
              <div class="addinsitituteInput">
                <span class="spanInfo">职位:</span>
                <span class="infoDetail">{{surveyInfo.auPosition}}</span>
              </div>
              <div class="addinsitituteInput">
                <span class="spanInfo">编号:</span>
                <span class="infoDetail">{{surveyInfo.auJobnumber}}</span>
              </div>
              <div class="addinsitituteInput">
                <span class="spanInfo">所在城市:</span>
                <span class="infoDetail">{{surveyInfo.auCityName}}</span>
              </div>
              <div class="addinsitituteInput">
                <span class="spanInfo">所属公司:</span>
                <span class="infoDetail">{{surveyInfo.auCompanyName}}</span>
              </div>
              <div class="addinsitituteInput">
                <span class="spanInfo">账号状态:</span>
                <span class="infoDetail" v-if="surveyInfo.auIsLocked == 0">正常</span>
                <span class="infoDetail" v-else>锁定</span>
              </div>
              <div class="addinsitituteInput">
                <span class="spanInfo">接单次数:</span>
                <span class="infoDetail">{{orderTakeCount}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="surveyDialog hide">
      <div class="insititutListDialogBox">
        <span @click="closeSurvey" class="closinsititutMontor">×</span>
        <div class="oneMonitor clear">
          <h4 class="dialogTitle adddialogTitle">添加查勘员</h4>
          <div class="clear scrollBox">
            <div style="margin-top:20px;">
              <div class="addinsitituteInput">
                <span class="spanInfo">查勘员姓名</span>
                <input type="text" v-model="surveyor" class="inputBox"  placeholder="请输入查勘员姓名"/>
              </div>
              <div class="addinsitituteInput">
                <span class="spanInfo">查勘员手机号</span>
                <input type="tel" v-model="surveyorphone" class="inputBox"  maxlength="11" placeholder="请输入查勘员手机号"/>
              </div>
              <div class="addinsitituteInput">
                <span class="spanInfo">头像</span>
                <form style="margin-left:10%;">
                  <div class="file">
                    <span style="color:#2EAB3B;" v-if="imgUrl ==''"> 上传</span>
                    <span  style="color:#2EAB3B;" v-else> 重新上传</span>
                    <input class="fileInput" type="file" @change="getFile($event)">
                  </div>
                </form>
                  <div v-if="imgUrl !=''" style="margin-left:10%;">
                    <img style="height:85px;width:80px;" :src="imgUrl"/>
                  </div>
                  <div v-else style="margin-left:10%;">
                    <img style="height:85px;width:80px;" src="../images/file.png"/>
                  </div>
              </div>
              <div class="addinsitituteInput">
                <span class="spanInfo">所属省份</span>
                <select v-model="insurecode" class="selectBox">
                  <option value="">请选择所属省份</option>
                  <option v-for="item in addprovincesOption" :value="item.id">{{item.name}}</option>
                </select>
              </div>
              <div class="addinsitituteInput">
                <span class="spanInfo">所属城市</span>
                <select v-model="citycode" class="selectBox">
                  <option value="">请选择所属城市</option>
                  <option v-for="item in addCityOPtion" :value="item.id">{{item.name}}</option>
                </select>
              </div>
              <div class="addinsitituteInput">
                <span class="spanInfo">所属单位</span>
                <span style='font-size: 12px;'>{{companyename}}</span>
                <!-- <select v-model="compnaycode" class="selectBox">
                  <option value="">请选择所属单位</option>
                  <option v-for="item in addcompaneyOptions" :value="item.companyCode">{{item.companyName}}</option>
                </select> -->
              </div>
              <div class="addinsitituteInput">
                <span class="spanInfo">帐号状态</span>
                <select v-model="isvalid" class="selectBox">
                  <option value="0">正常</option>
                  <option value="1">锁定</option>
                </select>
              </div>
              <div class="addinsitituteInput">
                <span class="addinsitituteSure backColorGreen" @click="addSurvey">确定</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="caseList">
      <div class="insitutionTab">
        <span class="insitutionTitle" :class="{active: !isAudit}" @click='switchList'>查勘员管理</span>
        <span class="insitutionTitle" :class="{active: isAudit}" @click='switchList'>审核管理</span>
        <div class="lineBox"></div>
        <span class="addSurveyMember" v-show="!isAudit" @click="openSurvey">添加查勘员</span>
      </div>
      <div class="caseListHeader">
        <form>
          <span>姓名:</span>
          <input type="text" v-model="surveyUserName" placeholder="请输入查勘员姓名"/>
          <span>手机号:</span>
          <input type="tel" v-model="phone" placeholder="请输入手机号" maxlength="11"/>
          <span>开通省份</span>
          <el-select v-model="provinces" name="" placeholder="请选择开通省份">
            <el-option
              v-for="item in provincesOption"
              :key="item.name"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <span>所属城市:</span>
          <el-select v-model="affiliateCityCode" name="" placeholder="请选择城市">
            <el-option
              v-for="item in cityOptions"
              :key="item.name"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <span>所属单位:</span>
          <el-select v-model="affiliateCompanyCode" name="" placeholder="请选择单位">
            <el-option
              v-for="item in companeyOptions"
              :key="item.companyName"
              :label="item.companyName"
              :value="item.companyCode">
            </el-option>
          </el-select>
          <span>账号状态:</span>
          <el-select v-model="accountStatus"  name="case" placeholder="请选择账号状态">
            <el-option
              v-for="item in surveyOption"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
            <span class="caseListSure" @click="formSure">确定</span>
            <span class="caseListReset" @click="resetData">重置</span>
        </form>
      </div>
      <div class="caseListTable" v-if="tableActive">
        <div class="tableTitle">
          <div class="multiBtn" v-show="isAudit" @click="multiOperate('1')">批量同意</div>
          <div class="multiBtn" v-show="isAudit" @click="multiOperate('0')">批量拒绝</div>
          <div style="float:right; display:inline-block;">
            <span>共: {{pages}}页,</span>
            <span>{{totalCount}}条, </span>
            <span>当前页: {{currentCount}}条</span>
          </div>
        </div>
        <table class="table" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid #bbb;">
          <thead>
          <tr>
            <th style="border-left:1px solid #bbb;width:50px;">
              <input v-show="isAudit" type="checkbox" v-model="isAllChecked" @change="chooseAll">
              <span v-show="!isAudit">选择</span> 
            </th>
            <th>查勘员姓名</th>
            <th>查勘员手机号</th>
            <th>所属城市</th>
            <th style="width:16%;">所属单位</th>
            <th style="width:12%;">添加时间</th>
            <th style="width:8%;">账号状态</th>
            <th style="width:8%;">审核状态</th>
            <th>接单次数</th>
            <th style='width:13%'>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableData" :key="index">
            <td>
              <input v-show="isAudit" type="checkbox" v-model='item.isChecked' @change='onCheckboxChange($event,index)'>
              <span v-show="!isAudit">{{index+1}}</span>
            </td>
            <td>{{item.name}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.affiliateCity}}</td>
            <td>{{item.affiliateCompany}}</td>
            <td style="width:160px;">{{item.joinTime}}</td>
            <td>{{item.accountStatu}}</td>
            <td>{{item.areaflag == '2' ? '通过': '未通过'}}</td>
            <td>{{item.orderTakeCount}}</td>
            <td >
              <span class="listView" @click="goSurveyDetail(item.userId,item.orderTakeCount)">查看</span>
              <span v-show="isAudit" class="listView" @click="singleAudit(item.userId,'1')">同意</span>
              <span v-show="isAudit" class="listView" @click="singleAudit(item.userId,'0')">拒绝</span>
            </td>
          </tr>
          </tbody>
        </table>
        <div style="padding-bottom: 15px;">
          <el-pagination  @current-change="handleCurrentChange"
                          :current-page="page"
                          :page-size = "pageSize"
                          layout="prev,pager,next"
                          :total="totalCount">
          </el-pagination>
        </div>
      </div>
      <div class="caseListTable" v-else>
        <p style="text-align:center;padding: 15px 0;">暂无数据</p>
      </div>
      <case-detail v-if="caseDetailActive"></case-detail>
      <sign-Seats v-if="signSeatsActive"></sign-Seats>
      <!--&lt;!&ndash;layout="total,prev,pager, next,jumper"&ndash;&gt;layout="total,prev,pager, next,jumper"-->
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import caseDetail from '../components/caseDetail'
  import signSeats from '../components/signSeats'
  export default {
    data() {
      return {
        isAudit: false, // tab切换
        multiArr: [], //批量操作的数组
        headiconUrl:'',
        surveyor:'',
        surveyorphone:"",
        headicon:'',
        citycode:"",
        cityname:"",
        compnaycode:localStorage.riderCompanyCode,
        companyename:localStorage.riderCompanyName,
        isvalid:"0",
        addprovincesOption:[],
        addCityOPtion:[],
        addcompaneyOptions:[],
        userchinaname:"",
        userphone:"",
        insurecode:"",
        insurecodeOption:[],
        imageUrl: '',
        islocked: "0",
        provinces: '',
        tableActive: false,
        phone: "",
        surveyUserName: "",
        affiliateCityCode: '',
        affiliateCompanyCode:"",
        insuranceCompanyCode: '',
        accountStatus: '0',
        pageSize: 10,
        orderTakeCount:'',
        pages: '',
        imgUrl: '',
        isAllChecked: false, // 全选状态
        isEdit: false, // 编辑状态
        surveyOption:[
          {"name":"正常","code":"0"},
          {"name":"锁定","code":"1"}
        ],
        provincesOption:[],
        page: 1,
        currentCount: "",
        survey: "",
        tableData: [],
        totalCount: 0,
        companeyOptions: [],
        cityOptions: [],
        showCaseDetail: false,
        caseDetailActive: false,
        signSeatsActive: false,
        caseListActive: false,
        time: '',
        file:'',
        surveyInfo: {},
        addActive: false,
        number:0
      }
    },
    watch: {
      "insurecode": function(){
        if(this.number > 0){
          if(this.insurecode != ''){
            axios.get(this.ajaxUrl+"/pubsurvey/manage/department/v1/"+this.insurecode+"/citys")
              .then(response => {
                if(response.data.rescode == 200){
                  this.citycode = '';
                  this.addCityOPtion = response.data.data;

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
        "provinces": function(){
          if(this.provinces != 0){
            axios.get(this.ajaxUrl+"/pubsurvey/manage/department/v1/"+this.provinces+"/citys")
              .then(response => {
                if(response.data.rescode == 200){
                  this.affiliateCityCode = '';
                  this.cityOptions = response.data.data;
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
        },
      getUserIcons(val) {
        this.caseDetailActive = val;
      },
      getsignSeatsActive(val) {
        this.signSeatsActive = val;
      },
      getCaseListActive(val) {
        this.caseListActive = val;

        if(this.caseListActive){
          this.getCaseList()
        }
      },
      
    },

    created() {
      this.getCompaney();
      this.getCaseList();
    },
    mounted() {
      this.caseDetailActive = this.$store.state.caseDetailActive;  
    },

    methods: {
        // 查勘员管理
        switchList(){
          this.isAudit = !this.isAudit;
          // 清空搜索内容
          this.affiliateCompanyCode = "";
          this.affiliateCityCode = "";
          this.surveyUserName = "";
          this.phone = "";
          this.reportInsuranceNo = "";
          this.surveyStatus = "";
          // 刷新列表
          this.getCaseList();
          
        },

        // 当复选框发生变化时
        onCheckboxChange (ev,index) {
          // 先清空数组
          this.multiArr = [];

          let flag = 0;
          this.tableData.forEach(item => {
            if(item.isChecked){
              flag++;
              this.multiArr.push(item.userId); // 把选中的存进数组中
            }
          })
          console.log(this.multiArr);

          // 如果选中数量等于当前页
          if(flag == this.currentCount){
            this.isAllChecked = true;
          }else {
            this.isAllChecked = false;
          }
        },

        // 全选操作
        chooseAll () {
          // 审核管理 全选判断
          this.multiArr = [];
          if(this.isAllChecked) {
            
            this.tableData.forEach( item => {
              item.isChecked = true;
              this.multiArr.push(item.userId);
            })
          }else {
            this.tableData.forEach( item => {
              item.isChecked = false;
            })
          }
          
        },

        // 单行审核操作
        singleAudit(id,status) {
          const that = this;          
          this.auditAjax(Array.of(id),status,function(){
            // 刷新列表
            that.getCaseList();
          })
        },

        // 批量审核操作
        multiOperate (status) {
          const that = this;
          if(this.multiArr.length){
          
             this.auditAjax(this.multiArr,status,function(){
               // 刷新列表
               that.getCaseList();
             })
          }else {
            this.open4('请至少选择一项进行操作');
          }
        },

        // 审核操作
        auditAjax(ids,status,cb) {
          axios.post(this.ajaxUrl+ '/pubsurvey/surveyor/v1/rider/wholepickorder',{
            ids: ids,
            wholearea: status  // 是否开通 1开通 0 不开通
          })
          .then( res => {
              if(res.data.rescode == 200) {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
                if(cb) cb();
              }else {
                this.open4(res.data.resdes)
              }
          })
        },

        getFile(event) {
          this.file = event.target.files[0];
          console.log(this.file);
          event.preventDefault();
          let formData = new FormData();
          formData.append('file', this.file);
          formData.append('h', "h_150");
          formData.append('w', "w_120");
          formData.append('method', "post");
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          axios.post(this.ajaxUrl+"/pubsurvey/surveyor/v1/image/upload/survior/image",formData,config)
            .then(response => {
              console.log(response.status)
              if(response.status == 200){
                $('.addinsitituteInput').find('form')[0].reset();
                this.imgUrl = response.data;
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
        addSurvey(){
          if(this.surveyor == ''){
            this.open4("请输入查勘员姓名")
          }else if(this.surveyorphone == ''){
            this.open4("请输入查勘员手机号")
          }else if(this.imgUrl == ''){
            this.open4("请上传头像")
          }else if(this.insurecode == ''){
            this.open4("请选择省份")
          }else if(this.citycode == ''){
            this.open4("请选择城市")
          }else{
            for(let i in this.addCityOPtion){
              if(this.citycode == this.addCityOPtion[i].id){
                var cityname = this.addCityOPtion[i].name;
              }
            }
            // for(let i in this.addcompaneyOptions){
            //   if(this.compnaycode == this.addcompaneyOptions[i].companyCode){
            //     var companyename = this.addcompaneyOptions[i].companyName;
            //   }
            // }
            if(this.addActive){
              var paramData = {
                "surveyor": this.surveyor,
                "surveyorphone": this.surveyorphone,
                "headicon": this.imgUrl,
                "citycode": this.citycode,
                "cityname": cityname,
                "companycode": this.compnaycode,
                "companyname": companyename,
                "isvalid": this.isvalid
              };
              var url = '/pubsurvey/surveyor/v1/rider/surveyoradd'
            }else{
              var paramData = {
                "accesstoken": this.surveyInfo.auUserId,
                "surveyor": this.surveyor,
                "surveyorphone": this.surveyorphone,
                "headicon": this.imgUrl,
                "citycode": this.citycode,
                "cityname": cityname,
                "companycode": this.compnaycode,
                "companyname": companyename,
                "isvalid": this.isvalid
              };
              var url = '/pubsurvey/surveyor/v1/rider/surveyorupdate';
            }
            axios.post(this.ajaxUrl+ url,paramData)
              .then(response => {
                if(response.data.rescode == 200){
                  this.open2(response.data.resdes)
                  this.surveyor = '';
                  this.surveyorphone = '';
                  this.imgUrl = '';
                  this.citycode = '';
                  // this.compnaycode = ''; // 公司不用清空
                  this.isvalid = '0'
                  this.insurecode = '';
                  this.addCityOPtion = [];
                  this.addcompaneyOptions = [];
                  this.addprovincesOption = [];
                  $(".surveyDialog").addClass("hide");
                  $(".adddialogTitle").html("添加查勘员");
                  $(".insititutListDialog ").addClass("hide");
                  this.addActive = false;
                  this.number = '0';
                  this.getCaseList()
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

      openSurvey(){
        $(".surveyDialog").removeClass("hide");
        $(".adddialogTitle").html("添加查勘员");
        // 如果不是编辑状态 清空
        if(!this.isEdit){
          this.surveyor = '';
          this.surveyorphone = '';
          this.imgUrl = '';
          this.insurecode = '';
          this.citycode = '';
        }
        this.addActive = true;
        this.getProvince();
        this.number = 1;
      },
      openEditor(){
        this.isEdit = true;
        $(".surveyDialog").removeClass("hide");
        this.addActive = false;
        $(".adddialogTitle").html("编辑查勘员信息")
        this.surveyor = this.surveyInfo.auUserName;
        this.surveyorphone = this.surveyInfo.auPhone;
        this.imgUrl = this.surveyInfo.auHeadIcon;
        this.getProvince();
        this.number = 0;
      },
      getProvince(){
        // axios.get(this.ajaxUrl+"/pubsurvey/surveyor/v1/user/affiliate/company")
        //   .then(response => {
        //     if(response.data.rescode == 200){
        //       this.addcompaneyOptions = response.data.data;
        //       if(this.addActive == false){
        //         this.compnaycode = this.surveyInfo.auCompanyCode;
        //       }
        //     }else{
        //       this.open4(response.data.resdes)
        //       if(response.data.rescode == 300){
        //         this.$router.push({path:'/'})
        //       }
        //     }
        //   }, err => {
        //     console.log(err);
        //   })
        //   .catch((error) => {
        //     console.log(error)
        //   })
        axios.get(this.ajaxUrl+"/pubsurvey/manage/department/v1/provinceinsure")
          .then(response => {
            if(response.data.rescode == 200){
              this.addprovincesOption = response.data.data.provinces;
              if(this.addActive == false){
                this.insurecode = this.surveyInfo.auCityCode.substring(0,2);

                console.log(this.f);
                axios.get(this.ajaxUrl+"/pubsurvey/manage/department/v1/"+this.insurecode+"/citys")
                  .then(response => {
                    if(response.data.rescode == 200){
                      this.addCityOPtion = response.data.data;
                      this.citycode = this.surveyInfo.auCityCode;
                      this.number = 1;
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
      closinsititutMontor(){//关闭查看遮盖层
        $(".insititutListDialog ").addClass("hide");
      },
      closeSurvey(){
        this.isEdit = false;
        $(".surveyDialog").addClass("hide");
        this.addActive = false;
        $(".adddialogTitle").html("添加查勘员")
      },
      open4(resdes) {
        this.$message.error(resdes);
      },
      open2(resdes) {
        this.$message.success(resdes);
      },
      signSeats(id){
        this.$store.commit('getsurveyOrderId',id);
        axios.get(this.ajaxUrl+'/web-surveyor/v1/list')
          .then(response => {
            if(response.data.rescode == 200){
              if(response.data.data.length != 0){
                localStorage.setItem("signSeatData",JSON.stringify(response.data.data))
                this.$store.commit('setSignSeatsActive', true);
                this.signSeatsActive = this.$store.state.signSeatsActive;
              }else{
                this.open2("暂无数据")
              }
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
      },
      getCompaney(){
        axios.get(this.ajaxUrl+"/pubsurvey/surveyor/v1/user/affiliate/company")
          .then(response => {
            if(response.data.rescode == 200){
              this.companeyOptions = response.data.data;
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
          axios.get(this.ajaxUrl+"/pubsurvey/manage/department/v1/provinceinsure")
            .then(response => {
              if(response.data.rescode == 200){
                this.provincesOption = response.data.data.provinces
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
      getCaseList() {
        var paramData = {
          "page": this.page,
          "size": this.pageSize,
          "affiliateCompanyCode": this.affiliateCompanyCode,
          "surveyUserName":this.surveyUserName,
          "phone": this.phone,
          "affiliateCityCode": this.affiliateCityCode,
          "accountStatus":this.accountStatus
        }
        // 如果当前是审核管理
        if(this.isAudit) paramData.areaflag = '1'; // areaflag=1 为待审核列表

        axios.post(this.ajaxUrl+"/pubsurvey/surveyor/v1/user/surveyors",paramData)
          .then(response => {
            if(response.data.rescode == 200){
              this.tableData = response.data.data.records;

              // 如果当前是审核管理
              if(this.isAudit){
                  // 初始化
                  this.isAllChecked = false;
                this.tableData.forEach( item => {
                  item.isChecked = false;
                });
              }

              this.$store.commit('getcaseListActive', false)//监听调用列表接口关闭
              if(response.data.data.records.length !=0){
                this.tableActive = true;
                this.totalCount = parseInt(response.data.data.total);
                this.currentCount = response.data.data.size;
                this.pages = response.data.data.pages;
                for(let i in this.tableData){
                  if(this.tableData[i].accountStatus == '0'){
                    this.tableData[i].accountStatu = "正常"
                  }else if(this.tableData[i].accountStatus == '1'){
                    this.tableData[i].accountStatu = "锁定"
                  }
                }
              }else{
                this.tableActive = false;
              }

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
      },
      handleClick(row) {
        console.log(row);
      },

      // 查询确定按钮
      formSure() {
        this.getCaseList()
      },
      resetData(){
        this.affiliateCompanyCode = "";
        this.affiliateCityCode = "";
        this.surveyUserName = "";
        this.phone = "";
        this.reportInsuranceNo = "";
        this.surveyStatus = "";
        this.getCaseList()
      },
      handleCurrentChange(currentPage) {//跳转
        //当前页改变调用接口  pageNo  pageSize
        this.page = currentPage;
        this.getCaseList()
      },
      goSurveyDetail(accesstoken,acceptordernum){
        this.orderTakeCount = acceptordernum;
        $(".insititutListDialog ").removeClass("hide");
        var paramData = {
          "accesstoken":accesstoken,
          "acceptordernum": acceptordernum
        }
        axios.post(this.ajaxUrl+"/pubsurvey/surveyor/v1/user/surveyorinfo",paramData)
          .then(response => {
            if(response.data.rescode == 200){
             this.surveyInfo = response.data.data;
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
    },
    computed: {
      getUserIcons(){
        return this.$store.state.caseDetailActive;
      },
      getsignSeatsActive() {
        return this.$store.state.signSeatsActive;
      },
      getCaseListActive(){
        return this.$store.state.caseListActive;
      }
    },
    destroyed () {

    },
  }

</script>
<style scoped>
  .file {
    cursor: pointer;
    width: 90px;
    text-align: center;
    position: relative;
    display: inline-block;
    background: #E2F8E4;
    border: 1px solid #2EAB3B;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;

  }
  .file .fileInput {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
  }
  .insititutListDialog,.surveyDialog{
    background: rgba(0,0,0,0.3);
    width:100%;
    position: fixed;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 100;
  }
  .insititutListDialogBox{
    width: 600px;
    margin: 8vh auto;
    background: #fff;
    padding: 20px;
    max-height: 77vh;
    position: relative;
  }
  .insititutListDialog .dialogTitle,.surveyDialog .dialogTitle{
    color: #232323;
    font-size:16px;
    font-weight: 600;
  }

  .insititutListDialog .scrollBox, .surveyDialo .scrollBox{
    height: 55vh;
  }
  .insititutListDialog .surveyInfo{
    width: 70%;
    margin: 15px auto;
    border: 1px solid #eee;
    border-radius: 6px;
    -webkit-box-shadow: 0px 0px 10px 5px #f4f4f4;
    -moz-box-shadow: 0px 0px 10px 5px #f4f4f4;
    box-shadow: 0px 0px 10px 5px #f4f4f4;
    padding-bottom: 15px;
  }
  .infoDetail{
    border-bottom: 1px solid #bbb;
    display: inline-block;
    max-width: 50%;
    min-width:50%;
    padding-bottom: 5px;
  }
  .imgBox img{
    height: 85px;
    width: 80px;
    margin:0 auto;
  }
  .imgBox{
    text-align: center;
    padding: 10px;
    position: relative;
  }
  .imgBox .editorSurvey{
    position: absolute;
    right: 10px;
    top: 12px;
    color: #2EAB3B;
    font-size: 16px;
    border-radius: 5px;
    margin-left: 10px;
    padding: 6px 10px;
    display: inline-block;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .carInfoBox p{
    line-height: 25px;
    font-weight: normal;
    font-style: normal;
  }

 .closinsititutMontor{
    font-size: 42px;
    right: 15px;
    top: 0;
    position: absolute;
  }
  .surveyDialog .addinsitituteSure{
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
  .surveyDialog .addinsitituteInput{
    padding: 10px 0 10px 10%;
  }
 .surveyDialog .addinsitituteInput .spanInfo{
    display: inline-block;
    min-width:95px;
  }
  .surveyDialog .addinsitituteInput .inputBox,.surveyDialog .addinsitituteInput .selectBox{
    height:35px;
    line-height:35px;
    padding-left: 6px;
    border: 1px solid #bbb;
    border-radius:4px;
    width: 40%;
  }
  .insititutListDialog .addinsitituteInput{
    padding: 10px 0 10px 0;
    text-align: center;
  }
  .insititutListDialog .addinsitituteInput .spanInfo{
    display: inline-block;
    width: 20%;
  }
   .addSurveyMember{
    position: absolute;
    right: 10px;
    top: 12px;
    border: 1px solid #2EAB3B;
    color: #2EAB3B;
    font-size: 15px;
    border-radius: 5px;
    margin-left: 10px;
    padding: 6px 10px;
    display: inline-block;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .caseList .insitutionTab .insitutionTitle{
    cursor: pointer;
    display: inline-block;
    height: 45px;
    width: 100px;
    background: #fff;
    line-height: 45px;
    text-align: center;
    border: 1px solid #DFE4ED;
    font-size: 15px;
  }
  .caseList .insitutionTab .active{
    border-bottom: none;
    color: #2EAB3B;
  }

  .insitutionTab .lineBox{
    width: 90%;
    height: 1px;
    background: #DFE4ED;
    margin-top: -1px;
    margin-left: 100px;
  }
  .insitutionTab{
    width: 86%;
    margin: 15px auto;
    padding-top: 15px;
    position: relative;
  }
  .insitutionTab .insitutionTitle{
    cursor: pointer;
    display: inline-block;
    height: 45px;
    width: 100px;
    background: #fff;
    color: #232323;
    line-height: 45px;
    text-align: center;
    border: 1px solid #DFE4ED;
    border-bottom: none;
    font-size: 15px;
  }
  .caseList{
    width: 86%;
    background: #fff;
    font-size: 15px;
    margin: 0 auto;
  }
.caseListHeader{
  width: 88%;
  margin: 0 auto;
}
  .caseListHeader form{
    width: 100%;
    margin-left: 25px;
    padding-bottom: 10px;
  }
  .caseListHeader input, .caseListHeader select{
    width: 11%;
    background: #fff;
    border: 1px solid #bbb;
    height: 35px;
    margin: 10px 30px 2px 10px;
    padding-left: 5px;
    border-radius: 4px;
    color: #232323;
  }
  .caseListHeader select{
    border-radius: 6px;
  }
  .caseListHeader label{
    margin-left: 10px;
  }
  .caseListSure, .caseListReset{
    border: 1px solid #2EAB3B;
    font-size: 15px;
    border-radius: 5px;
    margin-left: 10px;
    padding: 8px 30px;
    display: inline-block;
    margin-bottom: 5px;
    cursor: pointer;
    margin-top: 15px;
  }
  .caseListSure{
    color: #fff;
    background: #2EAB3B;
  }
  .caseListTable{
    padding-top: 10px;
    border-top: 1px solid #bbb;
    width: 86%;
    margin: 0 auto;
  }
  .caseListTable .tableTitle{
    overflow: hidden;
    margin-bottom: 10px;
    padding-top: 10px;
  }
  .caseListTable .tableTitle .multiBtn {
    border: 1px solid #2EAB3B;
    font-size: 15px;
    border-radius: 5px;
    padding: 2px 10px;
    display: inline-block;
    cursor: pointer;
    color: #2EAB3B;
    background: #fff;
  }
  .caseListTable .tableTitle span{
    padding-right: 5px;
  }
  .caseListReset{
    color: #2EAB3B;
    background: #fff;
  }
  .table th{
    color: #2EAB3B;
    background: #ECF8F5;
    border: none;
  }
  .listAssign, .listView{
    color: #0D70D8;
    padding:6px;
    cursor: pointer;
  }

</style>
