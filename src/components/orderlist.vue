<template>
  <div class="caseList">
    <div class="caseListHeader">

      <form>
        <span>车牌号:</span>
        <input type="text" v-model="reporterCarLicenseNo" placeholder="请输入车牌号"/>
        <span>手机号:</span>
        <input type="tel" v-model="reporterPhoneNo" placeholder="请输入手机号" maxlength="11"/>
        <span>保险报案号:</span>
        <input type="text" v-model="reportInsuranceNo" placeholder="请输入保险报案号"/>
        <span>城市:</span>
        <el-select v-model="cityCode" name="city" placeholder="请选择城市">
          <el-option
            v-for="item in cityOption"
            :key="item.dcCitycode"
            :label="item.dcCityName"
            :value="item.dcCitycode">
          </el-option>
        </el-select>
        <span>保险公司:</span>
        <el-select v-model="insuranceCompanyCode" name="Companey" placeholder="请选择保险公司">
          <el-option
            v-for="item in companeyOptions"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>

        <span>机构:</span>
        <el-select v-model="orgCode" name="insititution" placeholder="请选择机构">
          <el-option
            v-for="item in organizations"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>

        <span >案件状态:</span>
        <el-select v-model="surveyStatus"  name="case" placeholder="请选择案件状态">
          <el-option
            v-for="item in surveyOption"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
        <span>事故时间:</span>
        <div class="" style="display:inline-block;padding-top:12px;">
          <el-date-picker
            v-model="value6"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <input type="hidden" placeholder="开始时间"  v-model="accidentStartTime" style="margin-right: 5px;" class="smInp" name="startDate" id="startTime" readonly="readonly">
        <input class="smInp" name="endDate" v-model="accidentEndTime" style="margin-left: 5px;" type="hidden" id="endTime" readonly="readonly" placeholder="结束时间">
        <span>处理时间:</span>
        <div class="" style="display:inline-block;padding-top:12px;">
          <el-date-picker
            v-model="value7"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <input type="hidden" v-model="handleStartTime" placeholder="开始时间" style="margin-right: 5px;" class="smInp" name="dealstartDate" id="dealstartTime" readonly="readonly"/>
        <input class="smInp" name="dealendDate" v-model="handleEndTime" style="margin-left: 5px;" type="hidden" id="dealendTime" readonly="readonly" placeholder="结束时间"/>
        <span >所属公司:</span>
        <el-select v-model="thirdplatform"  name="case" placeholder="请选择所属公司">
          <el-option
            v-for="item in platformOption"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
        <span class="caseListSure" @click="formSure">确定 </span>
        <span class="caseListReset" @click="resetData">重置</span>

      </form>
    </div>
    <div class="caseListTable" v-if="tableActive">
      <div class="tableTitle" style="height: 35px;">
        <span style="line-height: 35px;">共: {{pages}}页,</span>
        <span>{{totalCount}}条, </span>
        <span>当前页: {{currentCount}}条</span>
        <!-- <span class="caseListReset right" style="margin-right: 4%;" @click="downloadList">案件信息下载</span> -->
      </div>
      <table class="table" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid #bbb;">
        <thead>
        <tr>
          <th style="border-left:1px solid #bbb;">编号</th>
          <th>车牌号</th>
          <th>车主姓名</th>
          <th style="width:20%;">车主电话</th>
          <th style="width:16%;">精确位置</th>
          <th style="width:12%;">当前状态</th>
          <th style="width:12%;">骑手</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in tableData">
          <!-- <td>{{index+1}}</td>
          <td>{{item.reporterCarLicenseNo}}</td>
          <td>{{item.reporterName}}</td>
          <td>{{item.reporterPhoneNo}}</td>
          <td>{{item.insuranceCompanyName}}</td>
          <td style="width:160px;">{{item.accidentTime}}</td>
          <td>{{item.accidentAddress}}</td>
          <td>{{item.survey}}</td>
          <td>{{item.videoConnectRequestCount}}</td>
          <td ><span v-if="item.surveyStatus == '06'" class="listAssign" @click="signSeats(item.id)" >指派</span><i v-if="item.surveyStatus == '06'">|</i><span  class="listView" @click="goCaseDetail(item.id,item.surveyStatus)">查看</span></td> -->
          <td>{{index+1}}</td>
          <td>{{item.licenseNo}}</td>
          <td>{{item.reporterName}}</td>

          <td>{{item.reportPhone}} <p class="callPhone" @click="sendMessages($event,item.surveyNo)"><img src="../images/email.png" class="callPhone_img"></p><p class="callPhone" @click="callPhone($event,item.reportPhone)"><img src="../images/phone.png" class="callPhone_img"></p></td>

          <td class="green_word" v-if="item.isUploadedStatus">{{item.name}}<p class="callPhone" @click="sendPlace($event,item.surveyNo,item.lat,item.lng)"><img src="../images/have_location.png" class="callPhone_img"></p></td>
          <td class="gray_word" v-if="!item.isUploadedStatus">{{item.name}}<p class="callPhone" @click="sendPlace($event,item.surveyNo,item.lat,item.lng)"><img src="../images/no_location.png" class="callPhone_img"></p></td>
          <td style="width:160px;">{{item.survey}}</td>
          <td>{{item.surveyorName}}<p class="callPhone" @click="callPhone($event,item.surveyorPhone)"><img src="../images/phone.png" class="callPhone_img"></p></td>
          <td ><span v-if="item.status == '06'" class="listAssign" @click="signSeats(item.id)">指派</span><i v-if="item.status == '06'">|</i><span  class="listView" @click="goCaseDetail(item.surveyNo,item.status)">详情</span><i v-if="item.status == '07' || item.status == '06'">|</i><span  class="listView" @click="cancellationOrder(item.surveyNo,item.status)" v-if="item.status == '07' || item.status == '06'">取消订单</span></td>
        </tr>
        </tbody>
      </table>
      <div>
        <el-pagination  @current-change="handleCurrentChange"
                        :current-page="currentPageNo"
                        :page-size = "pageSize"
                        layout="prev,pager,next"
                        :total="totalCount">
        </el-pagination>
      </div>
    </div>
    <div class="caseListTable" v-else>
      <p style="text-align:center;margin-top: 15px;">暂无数据</p>
    </div>
   <!-- 详情 -->
    <div class="creatCaseDialog" v-if="detailsStatus">
      <div class="creatCaseDialogBox">
        <span class="closCreatDiolag" @click="closCreatDiolag">×</span>
        <ul class="map_wrap">
          <li class="item" v-show="caseDetail.finishTime">
            <div class="item-time">
              <span>{{caseDetail.finishTime.split(' ')[0]}}</span>
              <span>{{caseDetail.finishTime.split(' ')[1]}}</span>
            </div>
            <img class="item-icon" src="../images/detail_done.png" alt="">
            <div class="item-content">
              <span>【完成查勘】</span>
            </div>
          </li>
          <li class="item" v-show="caseDetail.connectTime">
            <div class="item-time">
              <span>{{caseDetail.connectTime.split(' ')[0]}}</span>
              <span>{{caseDetail.connectTime.split(' ')[1]}}</span>
            </div>
            <img class="item-icon" src="../images/detail_address.png" alt="">
            <div class="item-content">
              <span>【发起视频连接】</span>
              <span>累计次数：{{caseDetail.connectCount}}次</span>
            </div>
          </li>
          <li class="item" v-show="caseDetail.actualTime">
            <div class="item-time">
              <span>{{caseDetail.actualTime.split(' ')[0]}}</span>
              <span>{{caseDetail.actualTime.split(' ')[1]}}</span>
            </div>
            <img class="item-icon" src="../images/detail_address.png" alt="">
            <div class="item-content">
              <span>【到达现场】</span>
            </div>
          </li>
          <li class="item" v-show="caseDetail.contactTime">
            <div class="item-time">
              <span>{{caseDetail.contactTime.split(' ')[0]}}</span>
              <span>{{caseDetail.contactTime.split(' ')[1]}}</span>
            </div>
            <img class="item-icon" src="../images/detail_tel.png" alt="">
            <div class="item-content">
              <span>【已联系客户】</span>
              <span>拨打客户电话次数：{{caseDetail.contactCount}}次</span>
            </div>
          </li>
          <li class="item" v-show="caseDetail.singleTime">
            <div class="item-time">
              <span>{{caseDetail.singleTime.split(' ')[0]}}</span>
              <span>{{caseDetail.singleTime.split(' ')[1]}}</span>
            </div>
            <img class="item-icon" src="../images/detail_rider.png" alt="">
            <div class="item-content">
              <span>【骑手接单】</span>
              <span>姓名：{{caseDetail.surveyorName}}</span>
              <span>电话：{{caseDetail.surveyorPhone}}</span>
            </div>
          </li>
          <li class="item">
            <div class="item-time">
              <span>{{caseDetail.createTime.split(' ')[0]}}</span>
              <span>{{caseDetail.createTime.split(' ')[1]}}</span>
            </div>
            <img class="item-icon" src="../images/detail_flag.png" alt="">
            <div class="item-content">
              <span>【创建订单】</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <case-detail v-if="caseDetailActive"></case-detail>
    <!-- 指派 -->
    <sign-Seats v-if="signSeatsActive"></sign-Seats>
    <!-- 地图组件 -->
    <order-Map v-if="orderMapStatus" v-bind:survey-no="surveyNo" v-bind:lat="lat" v-bind:lng="lng"></order-Map>
    <!--&lt;!&ndash;layout="total,prev,pager, next,jumper"&ndash;&gt;layout="total,prev,pager, next,jumper"-->
  </div>
</template>
<script>
  import axios from 'axios'
  import caseDetail from '../components/caseDetail'
  import signSeats from '../components/signSeats'
  import orderMap from '../components/orderMap'
  import Bus from "../../static/bus.js"
  export default {
    data() {
      return {
        detailsStatus:false,
        surveyNo:"",
        lat:"",
        lng:"",
        orderMapStatus:false,//地图状态
        cityCode: "",
        cityOption: [],
        thirdplatform: "",
        platformOption: [],
        tableActive: false,
        reporterPhoneNo: "",
        reporterCarLicenseNo: "",
        reportInsuranceNo: "",
        orgCode: '',
        accidentStartTime:"",
        accidentEndTime: "",
        handleStartTime: "",
        handleEndTime: "",
        insuranceCompanyCode: '',
        surveyStatus: '',
        pageSize: 10,
        pages: '',
        surveyOption:[
          {"name":"待查勘","code":"06"},
          {"name":"查勘中","code":"07"},
          {"name":"已查勘","code":"08"},
          {"name":" 已取消","code":"11"}
        ],
        currentPageNo: 1,
        currentCount: "",
        survey: "",
        tableData: [],
        totalCount: 0,
        companeyOptions: {},
        caseDetail: {},
        organizations: [],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value6: '',
        value7: '',
        ajaxUrl: "/boot-pub-survey-manage",
        showCaseDetail: false,
        caseDetailActive: false,
        signSeatsActive: false,
        caseListActive: false,
        time: '',
      }
    },
    watch: {
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
      //获取城市列表
      this.getCityList();
      //获取保险公司列表
      this.getCompaney();
      //获取主要信息列表
      this.getCaseList();
      //获取所属公司列表
      this.getThirdPlate();
      //注册事件
      Bus.$on('orderMapStatusChange', () => { //Hub接收事件
        this.orderMapStatus = false;
    });
    },
    mounted() {
      this.caseDetailActive = this.$store.state.caseDetailActive;
    },
      methods: {
          //关闭详情按钮
         closCreatDiolag(){
           this.detailsStatus = false;
        },
        //取消订单
        cancellationOrder(id,orderStatus){
            var paramData = {
              "action": "cancel",
              "surveyno": id,
              "mark": "1"
            }
            axios.post(this.ajaxUrl+"/pub/survey/v1/action",paramData)
              .then(response => {
                if(response.data.rescode == 200){
                  this.open2(response.data.resdes);
                  this.getCaseList();
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
        //精确位置
        sendPlace(e,surveyNo,lat,lng){
          this.surveyNo = surveyNo;
          this.lat = lat;
          this.lng = lng;
          this.orderMapStatus = true;
          // alert(id)
        },
        //打电话
        callPhone(e,phone){
          alert(phone)
        },
        //发短信
        sendMessages(e,phone){
           var paramData = {
            "surveyNo": phone
          }
          // var paramData = {
          //   "surveyNo": "133db7fb63594e91b6a3573bcf36949d"
          // }
          axios.post(this.ajaxUrl+"/published_order/v1/sendMsg",paramData)
            .then(response => {
              if(response.data.rescode == 200){
                 this.open2("操作成功！");
              }else{
                 this.open4("操作失败！");
              }
            }, err => {
              console.log(err);
            })
            .catch((error) => {
              console.log(error)
            });
        },
//      城市列表
        getCityList(){
          var paramData = {
            "action": "detail"
          }
          axios.post(this.ajaxUrl+"/pub/survey/v1/orgcity",paramData)
            .then(response => {
              if(response.data.rescode == 200){
                this.cityOption = response.data.data.city;
                console.log(this.cityOption)
              }else{
                if(response.data.rescode == "300"){
                  this.$router.push({path:"/login"})
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
      //所属公司
        getThirdPlate(){
            axios.get(this.ajaxUrl+'/pub/survey/v1/third/platform')
              .then(response => {
                if(response.data.rescode == 200){
                 this.platformOption =  response.data.data;
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
        open4(resdes) {
          this.$message.error(resdes);
        },
        open2(resdes) {
          this.$message.success(resdes);
        },
        signSeats(id){
          this.$store.commit('getsurveyOrderId',id);
          // axios.get(this.ajaxUrl+'/web-surveyor/v1/list')
          //   .then(response => {
          //     if(response.data.rescode == 200){
          //       if(response.data.data.length != 0){
          //         localStorage.setItem("signSeatData",JSON.stringify(response.data.data))
          //         this.$store.commit('setSignSeatsActive', true);
          //         this.signSeatsActive = this.$store.state.signSeatsActive;
          //       }else{
          //         this.open2("暂无数据")
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

          //新改动接口
          var queryParams = {
            "surveyOrderId":parseInt(id)
          }
          axios.post(this.ajaxUrl+'/web-surveyor/v2/getAssInfo',queryParams)
            .then(response => {
              console.log(response.data);
              if(response.data.rescode == 200){
                if(response.data.data.webSurveyorList.length != 0){
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
          var paramData = {
            "action": "detail"
          }
          axios.post(this.ajaxUrl+"/pub/survey/v1/orgcity",paramData)
            .then(response => {
              if(response.data.rescode == 200){
                console.log(response.data.data.company)
                this.companeyOptions = response.data.data.company ;

                this.organizations= response.data.data.org;

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
      //搜索确定按钮
        getCaseList() {
          if(this.value6){
            for(let i in this.value6){
              if(i == 0){
                this.accidentStartTime = new Date(this.value6[0]);
              }else if(i == 1){
                this.accidentEndTime = new Date(this.value6[1])
                this.accidentEndTime = new Date(this.accidentEndTime.getTime()+24*60*60*1000-1);
              }
            }
            this.accidentStartTime = this.accidentStartTime.getFullYear() + '-' + (this.accidentStartTime.getMonth() + 1) + '-' + this.accidentStartTime.getDate()+ " 00:00:00";
            this.accidentEndTime = this.accidentEndTime.getFullYear() + '-' + (this.accidentEndTime.getMonth() + 1) + '-' + this.accidentEndTime.getDate()+" "+ this.accidentEndTime.getHours() + ":" + this.accidentEndTime.getMinutes() + ":" + this.accidentEndTime.getSeconds();
          }else{
            this.accidentStartTime = "";
              this.accidentEndTime = "";
          }
          if(this.value7){
            for(let i in this.value7){
              if(i == 0){
                this.handleStartTime = new Date(this.value7[0]);
              }else if(i == 1){
                this.handleEndTime = new Date(this.value7[1])
                this.handleEndTime =  new Date(this.handleEndTime.getTime()+24*60*60*1000-1)
              }
            }
            this.handleStartTime = this.handleStartTime.getFullYear() + '-' + (this.handleStartTime.getMonth() + 1) + '-' + this.handleStartTime.getDate()+ " " + this.handleStartTime.getHours() + ":" + this.handleStartTime.getMinutes() + ":" + this.handleStartTime.getSeconds();
            this.handleEndTime = this.handleEndTime.getFullYear() + '-' + (this.handleEndTime.getMonth() + 1) + '-' + this.handleEndTime.getDate()+ " " + this.handleEndTime.getHours() + ":" + this.handleEndTime.getMinutes() + ":" + this.handleEndTime.getSeconds();
          }else{
            this.handleStartTime = "";
            this.handleEndTime = "";
          }
          var paramData = {
            "thirdPartyPlatformCode": this.thirdplatform,
            "currentPageNo": this.currentPageNo,
            "pageSize": this.pageSize,
            "insuranceCompanyCode": this.insuranceCompanyCode,
            "orgCode": this.orgCode,
            "reporterCarLicenseNo":this.reporterCarLicenseNo,
            "reporterPhoneNo": this.reporterPhoneNo,
            "reportInsuranceNo": this.reportInsuranceNo,
            "surveyStatus":this.surveyStatus,
            "accidentStartTime": this.accidentStartTime,
            "accidentEndTime": this.accidentEndTime,
            "handleStartTime":this.handleStartTime,
            "handleEndTime":this.handleEndTime,
            "cityCode": this.cityCode
          }
          axios.post(this.ajaxUrl+"/published_order/v1/list",paramData)
            .then(response => {
              if(response.data.rescode == 200){
                console.log(response.data.data.records,5646564645654465)
                this.tableData = response.data.data.records;
                this.$store.commit('getcaseListActive', false)//监听调用列表接口关闭
                if(response.data.data.records.length !=0){
                  //条数出现隐藏状态
                  this.tableActive = true;
                  //第几条
                  this.totalCount = parseInt(response.data.data.total);
                  //当前条数
                  this.currentCount = response.data.data.size;
                  //共多少页
                  this.pages = response.data.data.pages;
                  for(let i in this.tableData){
                    //定位状态
                    if(this.tableData[i].isUploaded == 1){
                           this.tableData[i].name = "已上传";
                           this.tableData[i].isUploadedStatus = true;
                    }else{
                         this.tableData[i].name = "未上传";
                         this.tableData[i].isUploadedStatus = false;
                    }
                    if(this.tableData[i].status == '06'){
                      this.tableData[i].survey = "新案件"
                    }else if(this.tableData[i].status == '07'){
                      this.tableData[i].survey = "查勘中"
                    }else if(this.tableData[i].status == '08'){
                      this.tableData[i].survey = "已查勘"
                    }else if(this.tableData[i].status == '11'){
                      this.tableData[i].survey = "查勘订单已取消"
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
      //案件信息下载
        // downloadList(){
        //   if(this.value6){
        //     for(let i in this.value6){
        //       if(i == 0){
        //         this.accidentStartTime = new Date(this.value6[0]);
        //       }else if(i == 1){
        //         this.accidentEndTime = new Date(this.value6[1])
        //         this.accidentEndTime = new Date(this.accidentEndTime.getTime()+24*60*60*1000-1);
        //       }
        //     }
        //     this.accidentStartTime = this.accidentStartTime.getFullYear() + '-' + (this.accidentStartTime.getMonth() + 1) + '-' + this.accidentStartTime.getDate()+ " 00:00:00";
        //     this.accidentEndTime = this.accidentEndTime.getFullYear() + '-' + (this.accidentEndTime.getMonth() + 1) + '-' + this.accidentEndTime.getDate()+" "+ this.accidentEndTime.getHours() + ":" + this.accidentEndTime.getMinutes() + ":" + this.accidentEndTime.getSeconds();
        //   }else{
        //     this.accidentStartTime = "";
        //     this.accidentEndTime = "";
        //   }
        //   if(this.value7){
        //     for(let i in this.value7){
        //       if(i == 0){
        //         this.handleStartTime = new Date(this.value6[0]);
        //       }else if(i == 1){
        //         this.handleEndTime = new Date(this.value6[1])
        //         this.handleEndTime =  new Date(this.handleEndTime.getTime()+24*60*60*1000-1)
        //       }
        //     }
        //     this.handleStartTime = this.handleStartTime.getFullYear() + '-' + (this.handleStartTime.getMonth() + 1) + '-' + this.handleStartTime.getDate()+ " " + this.handleStartTime.getHours() + ":" + this.handleStartTime.getMinutes() + ":" + this.handleStartTime.getSeconds();
        //     this.handleEndTime = this.handleEndTime.getFullYear() + '-' + (this.handleEndTime.getMonth() + 1) + '-' + this.handleEndTime.getDate()+ " " + this.handleEndTime.getHours() + ":" + this.handleEndTime.getMinutes() + ":" + this.handleEndTime.getSeconds();
        //   }else{
        //     this.handleStartTime = "";
        //     this.handleEndTime = "";
        //   }
        //   window.open(this.ajaxUrl+"/pub/survey/v1/exportexcel?insuranceCompanyCode="+this.insuranceCompanyCode+"&orgCode="+this.orgCode+"&reporterCarLicenseNo="+this.reporterCarLicenseNo+"&reportInsuranceNo="+this.reportInsuranceNo+"&reporterPhoneNo="+this.reporterPhoneNo+"&surveyStatus="+this.surveyStatus+"&accidentStartTime="+this.accidentStartTime+"&accidentEndTime="+this.accidentEndTime+"&handleStartTime="+this.handleStartTime+"&handleEndTime="+this.handleEndTime+"&cityCode="+this.cityCode)
        // },
        handleClick(row) {
          console.log(row);
        },
        formSure() {
          this.getCaseList()
        },
        resetData(){
          this.thirdplatform = ''
          this.insuranceCompanyCode = "";
          this.orgCode = "";
          this.cityCode = '';
          this.cityOption = [];
          this.reporterCarLicenseNo = "";
          this.reporterPhoneNo = "";
          this.reportInsuranceNo = "";
          this.surveyStatus = "";
          this.accidentStartTime = "";
          this.accidentEndTime = "";
          this.handleStartTime = "";
          this.handleEndTime = "";
          this.value6 = "";
          this.value7 = "";
          this.getCaseList();
          this.getCompaney();
          this.getCityList();
        },

        handleCurrentChange(currentPage) {//跳转
          //当前页改变调用接口  pageNo  pageSize
          this.currentPageNo = currentPage;
          this.getCaseList()
        },
        goCaseDetail(id,orderStatus){
            var paramData = {
              "surveyNo": id
            }
            axios.post(this.ajaxUrl+"/published_order/v1/detail",paramData)
              .then(response => {
                if(response.data.rescode == 200){
                  console.log("详情",response.data.data)
                  this.caseDetail = response.data.data;
                  // 显示弹窗
                  this.detailsStatus = true;

                  if(response.data.data != null){
                    var data = JSON.stringify(response.data.data)
                    localStorage.setItem("caseDetailData",data);
                    // this.$store.commit('setCaseDetailActive', true);
                    // this.caseDetailActive = this.$store.state.caseDetailActive;
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
    components: {
      caseDetail,
      orderMap,
      signSeats,
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
      clearInterval(this.time);
    },
  }

</script>
<style scoped>
.caseList{
  width: 95%;
  background: #fff;
  font-size: 15px;
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
    padding: 6px 15px;
    display: inline-block;
    margin-bottom: 5px;
    cursor: pointer;
  }
.caseListSure{
  color: #fff;
  background: #2EAB3B;
}
.caseListTable{
  padding-top: 10px;
  border-top: 1px solid #bbb;
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
  .callPhone{
   float:right;
   margin-right:10px;
  }
  .callPhone_img{
    width:18px;
    height:19px;
    margin-left: 5px;
  }
  .gray_word{
    color:#666666;
  }
  .green_word{
    color:#000000;
  }


  .creatCaseDialog{
    background: rgba(0,0,0,0.3);
    width:100%;
    position: fixed;
    min-height: 100vh;
    top: 0;
    left: 0;
    z-index: 100;
  }
  .map_wrap{
    margin-top: 40px;
    margin-left: 125px;
    border-left: 1px solid #ccc;
  }
  .map_wrap .item{
    width: 100%;
    display: flex;
    position: relative;
    margin-left: -125px;
    margin-top: 20px;
  }

  .map_wrap .item .item-time {
    width: 100px;
    text-align: center;
  }
  .map_wrap .item .item-time span{
    display: block;
    font-size: 15px;
    line-height: 15px;
  }
  .map_wrap .item .item-content span{
    display: block;
    font-size: 15px;
    line-height: 30px;
  }

  .map_wrap .item img{
    width: 30px;
    height: 30px;
    margin: 0 20px 0 10px;
    position: relative;
    z-index: 99;
  }

  .creatCaseDialogBox{
    width: 40%;
    margin: 3vh auto;
    background: #fff;
    padding: 20px;
    position: relative;
    min-height: 450px;
  }
 .closCreatDiolag{
    font-size: 40px;
    line-height: 40px;
    right: 15px;
    top: 0;
    float:right;
  }
</style>
