<template>
  <div>
    <div class="surveyDialog hide">
      <div class="insititutListDialogBox">
        <span @click="closeSurvey" class="closinsititutMontor">×</span>
        <div class="oneMonitor clear">
          <h4 class="dialogTitle adddialogTitle">添加订单</h4>
          <div class="clear scrollBox">
            <div style="margin-top:20px;">
              <div class="addinsitituteInput">
                <span class="spanInfo">保险公司</span>
                <select class="selectBox" v-model="company" id="companyName">
                  <option value="">请选择保险公司</option>
                  <option v-for="item in companeyOption" :value="item.code">{{item.name}}</option>
                </select>
              </div>
              <div class="addinsitituteInput">
                <span class="spanInfo">城市</span>
                <select v-model="citycode" class="selectBox">
                  <option value="">请选择城市</option>
                  <option v-for="item in cityOptions" :value="item.cityCode">{{item.cityName}}</option>
                </select>
              </div>
              <div class="addinsitituteInput">
                <span class="spanInfo">机构</span>
                <select v-model="compnaycode" class="selectBox">
                  <option value="">请选择机构</option>
                  <option v-for="item in addcompaneyOptions" :value="item.orgCode">{{item.orgName}}</option>
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
        <span class="insitutionTitle active">订单管理</span>
        <div class="lineBox"></div>
        <span class="addSurveyMember" @click="openSurvey">添加订单</span>
      </div>
      <div class="caseListHeader">
      </div>
      <div class="caseListTable" v-if="tableActive">
        <div class="tableTitle">
          <span>共: {{pages}}页,</span>
          <span>{{totalCount}}条, </span>
          <span>当前页: {{currentCount}}条</span>
        </div>
        <table class="table" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid #bbb;width:100%;">
          <thead>
          <tr>
            <th style="border-left:1px solid #bbb;">
              编号
            </th>
            <th>
              保险公司
            </th>
            <th>
              城市
            </th>
            <th>
             处理机构
            </th>
            <th>
              创建时间
            </th>
            <th>
              操作
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableData">
            <td>{{index+1}}</td>
            <td>{{item.insuranceCompanyName}}</td>
            <td>{{item.cityName}}</td>
            <td>{{item.orgName}}</td>
            <td>{{item.createTime}}</td>
            <td ><span class="listView" @click="deletItem(item.recordId)">删除</span></td>
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
      <!--&lt;!&ndash;layout="total,prev,pager, next,jumper"&ndash;&gt;layout="total,prev,pager, next,jumper"-->
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        cityOrgsOption: '',
        companyModel:'',
        headiconUrl:'',
        surveyorphone:"",
        headicon:'',
        citycode:"",
        cityname:"",
        compnaycode:"",
        companyename:"",
        isvalid:"0",
        addprovincesOption:[],
        addCityOPtion:[],
        addcompaneyOptions:[],
        userchinaname:"",
        userphone:"",
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
        surveyOption:[
          {"name":"正常","code":"0"},
          {"name":"锁定","code":"1"}
        ],
        companeyOption: [],
        company: '',
        provincesOption:[],
        page: 1,
        currentCount: "",
        survey: "",
        tableData: [],
        totalCount: 0,
        companeyOptions: [],
        cityOptions: [],
        showCaseDetail: false,
        caseListActive: false,
        time: '',
        file:'',
        surveyInfo: {},
        addActive: false,
        number:0,
        citysOption: []
      }
    },
    watch: {
      "company": function(){
        this.cityOptions = '';
        this.cityOrgsOption = '';
        this.citycode = '';
        this.compnaycode = '';
        if(this.company != ''){
          axios.get(this.ajaxUrl+"/selfhelp/org/v1/city/org/list/"+this.company)
            .then(response => {
              if(response.data.rescode == 200){
                console.log(response.data)
                console.log(response.data.data.cityOrgs,"机构")
                this.cityOptions = response.data.data.citys;
                this.cityOrgsOption = response.data.data.cityOrgs;
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
      'citycode': function(){
        if(this.citycode != ''){
          this.addcompaneyOptions = '';
          this.compnaycode = '';
            this.cityOrgsOption.forEach((i,n)=>{
              if(i.cityCode == this.citycode){
                this.addcompaneyOptions = i.orgs;
              }
            })
        }
      },


      getCaseListActive(val) {
        this.caseListActive = val;

        if(this.caseListActive){
          this.getCaseList()
        }
      },
    },

    created() {
      this.getCaseList()
    },
    mounted() {
    },
    methods: {
      addSurvey(){
        if(this.company == ''){
          this.open4("请选择保险公司")
        }else if(this.citycode == ''){
          this.open4("请选择城市")
        }else if(this.compnaycode == ''){
          this.open4("请选择机构")
        }else{
          for(let i in this.companeyOption){
            if(this.company == this.companeyOption[i].code){
              var insuranceCompanyName = this.companeyOption[i].name;
            }
          }
          for(let i in this.cityOptions){
            if(this.citycode == this.cityOptions[i].cityCode){
              var cityName = this.cityOptions[i].cityName;
            }
          }
          for(let i in this.cityOrgsOption){
            if(this.citycode == this.cityOrgsOption[i].cityCode){
              for(let j in this.cityOrgsOption[i].orgs){
      
                if(this.compnaycode == this.cityOrgsOption[i].orgs[j].orgCode){
                  var orgName = this.cityOrgsOption[i].orgs[j].orgName;
                }
              }
            }
          }
            var paramData = {
              "insuranceCompanyCode": this.company,
              "insuranceCompanyName": insuranceCompanyName,
              "cityCode": this.citycode,
              "cityName": cityName,
              "citycode": this.citycode,
              "orgCode": this.compnaycode,
              "orgName": orgName
          };
           var url = '/selfhelp/org/v1/save';
          axios.post(this.ajaxUrl+ url,paramData)
            .then(response => {
              if(response.data.rescode == 200){
                this.open2(response.data.resdes)
                this.insuranceCompanyCode = '';
                insuranceCompanyName = '';
                cityName = '';
                this.citycode = '';
                this.orgCode = '';
                orgName = '0';
                this.companeyOption = [];
                this.cityOptions = [];
                this.addcompaneyOptions = [];
                $(".surveyDialog").addClass("hide");
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
        this.addActive = true;
        this.getProvince();
        this.number = 1;
      },
      openEditor(){
        $(".surveyDialog").removeClass("hide");
        this.addActive = false;
        $(".adddialogTitle").html("编辑查勘员信息")
        this.surveyorphone = this.surveyInfo.auPhone;
        this.imgUrl = this.surveyInfo.auHeadIcon;
        this.getProvince();
        this.number = 0;
      },
      getProvince(){
        var paramData = {
          "action": "detail"
        }
        axios.post(this.ajaxUrl+"/pub/survey/v1/orgcity",paramData)
          .then(response => {
            if(response.data.rescode == 200){
              this.cityOption = response.data.data.city;
              this.companeyOption = response.data.data.company ;
              for(let i in this.companeyOption){
                if(i == 0){
                  this.company = this.companeyOption[0].code
                }
              }
              this.orgOption= response.data.data.org;
              var zhognche = {}
              if(this.insurecompanyCode == 111111111111){
                this.zhongcheActive = false;
                for(let i in this.orgOption){
                  if(this.orgOption[i].insurecompanyCode == 111111111111){
                    zhognche = this.orgOption[i];
                    this.removeArr(this.orgOption,this.orgOption[i])
                    this.orgOption.unshift(zhognche)
                  }
                }
                console.log(this.orgOption)
              }
              for(let i in this.orgOption){
                if(i== 0){
                  this.orgCode = this.orgOption[i].code;
                }
              }
            }else{
              if(response.data.rescode == "300"){
                this.$router.push({path:"/"})
              }
              this.open4(response.data.resdes);
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

      getCaseList() {
        var paramData = {
          "pageNo": this.page,
          "pageSize": this.pageSize
        }
        axios.post(this.ajaxUrl+"/selfhelp/org/v1/lsit",paramData)
          .then(response => {
            if(response.data.rescode == 200){
              this.tableData = response.data.data.records;
              if(response.data.data.records.length !=0){
                this.tableActive = true;
                this.totalCount = parseInt(response.data.data.total);
                this.currentCount = response.data.data.size;
                this.pages = response.data.data.pages;
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
      deletItem(accesstoken){
        console.log(accesstoken)
        axios.delete(this.ajaxUrl+"/selfhelp/org/v1/remove/"+accesstoken)
          .then(response => {
            if(response.data.rescode == 200){
              this.open2(response.data.resdes);
              this.getCaseList()
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
      getCaseListActive(){
        return this.$store.state.caseListActive;
      }
    },
    destroyed () {

    },
  }

</script>
<style scoped>
  .tuiBox{
    position: absolute;
    top: 45px;
    left: 29%;
    max-height:400px;
    overflow-y:scroll;
    z-index: 20;
  }
  .tuiBox.border1{
    border:1px solid #ccc;
  }
  .tuiBox span {
    display: block;
    font-size:12px;
    width:194px;
    height:30px;
    line-height: 30px;
    padding-left: 6px;
    cursor:pointer;
    background:#fff;
    border-bottom: 1px solid #ccc;
  }
  .tuiBox span:hover{
    color:#fff;
    background:#2EAB3B;
  }
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
    margin: 15vh auto;
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
    border-bottom: none;
    font-size: 15px;
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
    padding-top: 20px;
    /*border-top: 1px solid #bbb;*/
    width: 86%;
    margin: 0 auto;
  }
  .caseListTable .tableTitle{
    margin-bottom: 10px;
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
