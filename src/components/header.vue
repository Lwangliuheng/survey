<style scoped>
  .headerText{
    color: #555555;
    font-size: 15px;
    margin-left: 15px;
    display: inline-block;
    margin-top: 25px;
    min-width: 210px;

  }
  .headerText span{
    padding-right:10px;
  }
  .header{
    display: flex;
    background: #fff;
    width:100%;
    padding:2px 10%;
    margin: 0 auto;
    /*height: 80px;*/
    justify-content: space-between;
  }
  .header img{
    height: 40px;
    width: 115px;
  }
  .headerLeft{
    font-size: 15px;
    color: #555;
    display: flex;
    margin-top: 20px;
  }
  .signOut{
    color: #2EAB3B;
    margin:0 10px;
    cursor: pointer;
    display: inline-block;
    width: 40px;
  }
  .creatCase{
    height: 35px;
    line-height: 35px;
    width: 80px;
    text-align: center;
    display: inline-block;
    color: #fff;
    background: #2EAB3B;
    cursor: pointer;
    margin-top: -6px;
  }

  .creatCaseDialog,.cityDialog,.AdressDialog{
    background: rgba(0,0,0,0.3);
    width:100%;
    position: fixed;
    min-height: 100vh;
    top: 0;
    left: 0;
    z-index: 100;
  }

  .creatCaseDialogBox, .cityDialogBox,.AdressDialogBox{
    width: 38%;
    margin: 3vh auto;
    background: #fff;
    padding: 20px;
    position: relative;
  }
  .creatCaseDialogBox{
    min-height: 620px;
  }
  .AdressDialogBox{
    width: 45%;
  }
  .cityDialogBox{
    margin-top: 20vh;
  }
  .dialogTitle{
    color: #232323;
    font-size:16px;
    font-weight: 600;
  }

  .creatCaseDialog .scrollBox{
    /*overflow-y: scroll;*/
   /* max-height: 60vh;*/
  }
  .imgBox img{
    height: 68px;
    width: 68px;
    margin:0 auto;
  }

  .carInfoBox p{
    line-height: 25px;
    font-weight: normal;
    font-style: normal;
  }
  .closCreatDiolag, .closeCityDiolag, .closeAdressDiolag{
    font-size: 42px;
    right: 15px;
    top: 0;
    position: absolute;
  }
  .creatCaseDialog{
    font-size: 42px;
    right: 15px;
    top: 0;
    position: absolute;
  }
  .creatCaseDialog .addinsitituteSure{
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
  .sureAdress{
    color: #fff;
    font-size: 15px;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 15px;
    padding: 6px 12px;
  }
  .addinsitituteInput{
    padding: 10px 0 5px 10%;
  }
  .addinsitituteInput .addinsitituteSpan{
    display: inline-block;
    min-width: 20%;
    font-size: 15px;
  }
  .addinsitituteInput .creatInput{
    height:35px;
    line-height:35px;
    padding-left: 6px;
    border: 1px solid #bbb;
    border-radius:4px;
    width: 200px;
  }
  .addinsitituteInput .creatInputNo{
    height:35px;
    line-height: 35px;
    border: 1px solid #bbb;
    border-radius:4px;
    width: 35px;
    background: #fff;
    border-right: none;
    text-align: center;
  }
  .cityDialogBox .cityNameBox{
    width: 85%;
    text-align: center;
    clear: both;
    margin-left: 30px;
  }
  .cityDialogBox .cityNameBox .citySimpleName{
    width: 10%;
    height: 35px;
    line-height: 35px;
    border: 1px solid #bbb;
    color: #232323;
    border-radius: 5px;
    text-align: center;
    margin-right: 10px;
    float: left;
    margin-top: 20px;
    cursor: pointer;
  }
  .inputadressBox{
    margin: 15px;
  }
  .inputadressBox span{
    margin-left: 15px;
  }
  .adressInput{
    border: 1px solid #bbb;
    height: 35px;
    border-radius: 5px;
    padding-left: 5px;
    margin-bottom: 15px;
  }
  .oneMonitor{
    font-size: 15px;
  }
  .el-icon-search{
    font-size:20px;
    margin-left: -25px;
    cursor: pointer;
  }
  #allmap{
    width: 100%;
    height:38vh;
  }
  .el-icon-location{
    font-size: 20px;
    color: #666;
    margin-left: -26px;
  }
  .radio__inner {
    position: relative;
    display: inline-block;
    border: 1px solid #d8dce5;
    border-radius: 100%;
    width: 14px;
    height: 14px;
    background-color: #fff;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-left: 20%;
  }
  .radio__inner::after {
    width: 4px;
    height: 4px;
    border-radius: 100%;
    background-color: #fff;
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%,-50%) scale(0);
    transform: translate(-50%,-50%) scale(0);
    -webkit-transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6);
    transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6);
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6);
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6), -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6);
  }
  .isChecked{
    border-color: #2EAB3B;
    background: #2EAB3B;
  }
  .isChecked::after{
    transform: translate(-50%,-50%) scale(1);
  }
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
  .intelligentMatch{
    border:1px solid green;
    border-radius: 10px;
    background-color: green;
    color:#fff;
    text-align: center;
    line-height: 28px;
    height:30px;
    cursor:pointer;
   margin-top:10px;
   float:right;
   font-size:13px !important;
  }
  .feed_textarea{
    width:100%;
    resize: none;
    height: 70px;
    max-height: 70px;
    border:1px solid #dddddd;
    border-radius: 10px;
    padding:3px 3px;
    text-indent:2px;
    font-size: 15px;
  }
  .addinsitituteInputTe{
    overflow: hidden;
  }
</style>
<template>
  <div>
    <div class="creatCaseDialog hide">
      <div class="creatCaseDialogBox">
        <span @click="closCreatDiolag" class="closCreatDiolag">×</span>
        <div class="oneMonitor clear">
          <h4 class="dialogTitle" v-show="isFakeOrder">创建运营单</h4>
          <h4 class="dialogTitle" v-show="!isFakeOrder">创建案件</h4>
          <div class="clear scrollBox">
            <div style="margin-top:20px;">
              <div class="addinsitituteInput">
                <span class="addinsitituteSpan">报案人手机号</span>
                <input type="tel" class="creatInput" v-model="phoneno"  maxlength="11" placeholder="请输入报案人手机号"/>
              </div>
              <div class="addinsitituteInput">
                <span class="addinsitituteSpan">报案人车牌号</span>
                <input type="text" @click="openCityDialog" class="creatInputNo"  readonly :value="getCity" />
                <input class="creatInput" type="text" v-model="licensenoTwo" @keyup="upcase()" style="margin-left:-6px;width:165px;" placeholder="请输入报案人车牌号"/>
              </div>
              <div class="addinsitituteInput">
                <span class="addinsitituteSpan">报案人姓名</span>
                <input class="creatInput" v-model="person" type="text" placeholder="请输入报案人姓名"/>
              </div>
              <div class="addinsitituteInput">
                <span class="addinsitituteSpan">保险报案号</span>
                <input class="creatInput"  v-model="reportno" type="text" placeholder="请输入保险报案号"/>
              </div>
              <!--<div class="addinsitituteInput">-->
              <!--<span class="addinsitituteSpan" >保险公司</span>-->
              <!--<select class="creatInput" v-model="company" id="companyName">-->
              <!--&lt;!&ndash;<option value="">请选择保险公司</option>&ndash;&gt;-->
              <!--<option v-for="item in companeyOption" :value="item.code">{{item.name}}</option>-->
              <!--</select>-->
              <!--</div>-->

              <div class="addinsitituteInput" style="position: relative;">
                <span class="addinsitituteSpan" >保险公司</span>
                <input type="text" class="creatInput" v-model="companyModel" @focus="companyFocus" @input="checkCompany">
                <div class="tuiBox" :class="tuiCompanyArr.length!=0?'border1':''">
                  <span @click="chooseCompany(company.name,company.code)" v-for="company in tuiCompanyArr">{{company.name}}</span>
                </div>
              </div>
              <!--<div class="addinsitituteInput">-->
              <!--<span class="addinsitituteSpan">城市</span>-->
              <!--<select class="creatInput" id="cityName" v-model="city">-->
              <!--<option value="">请选择城市</option>-->
              <!--<option v-for="item in cityOption" :value="item.dcCitycode">{{item.dcCityName}}</option>-->
              <!--</select>-->
              <!--</div>-->

              <div class="addinsitituteInput" style="position: relative;">
                <span class="addinsitituteSpan">城市</span>
                <input type="text" class="creatInput" @focus="cityFocus" v-model="cityModel" @input="checkCity">
                <div class="tuiBox" :class="tuiCompanyArr.length!=0?'border1':''">
                  <span  @click="chooseCity(city.name,city.code)" v-for="city in tuiCityArr">{{city.name}}</span>
                </div>
              </div>


              <div class="addinsitituteInput">
                <span class="addinsitituteSpan">处理机构</span>
                <select class="creatInput" v-model="orgCode" v-if="zhongcheActive">
                  <option v-for="item in orgOption" :value="item.code">{{item.name}}</option>
                  <!--<option value="">请选择机构</option>-->
                </select>
                <select class="creatInput" v-model="orgCode" v-else>
                  <option v-for="item in orgOption" :value="item.code">{{item.name}}</option>
                  <!--<option value="">请选择机构</option>-->
                </select>

              </div>
              <div class="addinsitituteInput">
                <span class="addinsitituteSpan">查勘类型</span>
                <select class="creatInput" v-model="surveyType">
                  <option value="1" >视频</option>
                  <option value="0">照片</option>
                </select>
              </div>
              <div class="addinsitituteInput">
                <span class="addinsitituteSpan">事故地点</span>
                <input class="creatInput"  :value="accidentaddress" type="text" readonly @click="openAdressDialog" placeholder="请输入事故地点"/>
                <i class="el-icon-location" @click="openAdressDialog"></i>
              </div>
              <div class="addinsitituteInput">
                <span class="addinsitituteSpan">指派</span>
                <select class="creatInput" v-model="sign">
                  <option value="1" >坐席</option>
                  <option value="0">点我达</option>
                  <option value="2">顺丰</option>
                  <option value="3">闪送</option>
                </select>
              </div>
              <div class="addinsitituteInput" v-if="isFakeOrder">
                <span class="addinsitituteSpan">是否可抢</span>
                <input type="checkbox" v-model="isGetOrder">
              </div>
              <div class="addinsitituteInput addinsitituteInputTe">
                <textarea class="feed_textarea" v-model="textareaValue"  placeholder="请填写匹配信息" >
                </textarea>
                <span class="addinsitituteSpan intelligentMatch" @click="intelligentMatchClick">智能匹配</span>
              </div>
              <!--<div class="addinsitituteInput">-->
              <!--<span class="radio__inner" @click="checkRadio"></span>-->
              <!--<span style="margin-left:6px;">只派坐席</span>-->
              <!--</div>-->
              <div class="addinsitituteInput">
                <span class="addinsitituteSure backColorGreen" @click="creatNewCase">确定</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cityDialog hide">
      <div class="cityDialogBox">
        <span @click="closeCityDiolag" class="closeCityDiolag">×</span>
        <div class="cityNameBox clear">
          <span class="citySimpleName" v-for="item in cityData" @click="selectCity(item)">{{item}}</span>
        </div>
      </div>
    </div>
    <div class="AdressDialog hide">
      <div class="AdressDialogBox">
        <span @click="closeAdressDiolag" class="closeAdressDiolag">×</span>
        <div class="oneMonitor clear">
          <h4 class="dialogTitle">事故地点</h4>
          <div class="inputadressBox">
            <span @click="searchAdress">事故地点</span>
            <input class="adressInput" v-model="adressValue" id="text_" style="width: 166px;" type="text" placeholder="请输入事故地点"/><i @click="searchAdress" class="el-icon-search"></i>
            <span>经度</span>
            <input class="adressInput"  :value="lng" id="result_Lng" type="text" readonly placeholder="请输入经度"/>
            <span>纬度</span>
            <input class="adressInput" :value="lat" id="result_Lat" type="text" readonly placeholder="请输入纬度"/>
            <span class="sureAdress backColorGreen hide" @click="sureAdress">确定</span>
          </div>
          <div id="allmap">
          </div>
        </div>
      </div>
    </div>
    <div class="header" style="font-size: 85%;">
      <div style="display: flex;">
        <img style="margin-top:10px;" src="../images/logo.png"/>
        <span class="headerText"> <span>|</span>事故e处理-视频查勘定损管理平台</span>
        <div class="menu" v-if="headerActiveOne == 'true'">
          <el-tabs v-model="activeName" @tab-click="handleClick" >
            <el-tab-pane  label="案件管理" name="first">
            </el-tab-pane>
            <el-tab-pane  label="坐席管理" name="second">
            </el-tab-pane>
            <el-tab-pane  label="派单机构" name="five"  v-if="zcState == 'true'">
            </el-tab-pane>
            <el-tab-pane  label="理赔指引" name="eight" v-if="zcState == 'true'">
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="menu" v-if="headerActiveOne == 'false' && isChannel == 'false'" @click="goInsitituList">
          <el-tabs v-model="activeNameTwo" @tab-click="handleClick">
            <el-tab-pane  label="机构管理" name="third">
            </el-tab-pane>
              <!-- 暂时先注释  中车最高权限不添加此模块呢-->
            <el-tab-pane  label="查勘员管理" name="four">  
            </el-tab-pane>
            <el-tab-pane  label="渠道管理" name="six">
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="menu" v-if="isChannel == 'true'" @click="goInsitituList">
          <el-tabs v-model="activeNameThree" @tab-click="handleClick">
            <el-tab-pane  label="骑手管理" name="seven">
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="headerLeft">
        <span class="creatCase" v-if="headerActiveOne == 'true' && zcState == 'true'" @click="openCreatCase(1)" style="margin-right:5px;">创建运营单</span>
        <span class="userName">{{chinaName}}</span>
        <span class="userInsitu">({{userName}})</span>
        <span class="signOut" @click="clickSignOut">退出</span>
        <span class="creatCase" v-if="headerActiveOne == 'true'" @click="openCreatCase(2)">创建案件</span>
      </div>
    </div>
    <case-manage v-if="caseActive" v-bind:zc-state="zcState"></case-manage>
    <seat-manage v-if="seatActive"></seat-manage>
    <institution-manage v-if="insitituteActive"></institution-manage>
    <survey-manage v-if="surveyActive"></survey-manage>
    <single-agency v-if="agencyActive"></single-agency>
    <channelManage v-if="channelManageActive"></channelManage>
    <surveyManageCompany v-if="surveyCompanyActive"></surveyManageCompany>
    <claim-guide v-if="claimActive"></claim-guide>
  </div>

</template>
<script>
  //  import baiduAdress from '@/components/baiduAdress'
  import caseManage from '@/components/caseManage'
  import seatManage from '@/components/seatManage'
  import institutionManage from '@/components/institutionManage'
  import surveyManage from '@/components/surveyManage'
  import surveyManageCompany from '@/components/surveyManageCompany' // 查勘机构登录只显示查勘管理
  import singleAgency from '@/components/SingleAgency'
  import channelManage from '@/components/channelManage'
  import claimGuide from '@/components/claimGuide'
  import axios from 'axios'
  //  import BMap from 'BMap'

  export default {
    data(){
      return{
        textareaValue:"",
        isGetOrder: false, // 是否可以抢到假单
        zcState:false,
        zhongcheActive: true,
        chinaName: '',
        userName: '',
        headerActiveOne: false,
        isChannel: false,
        isFakeOrder: false, // 创建真单还是假单
        orgCode: "",
        surveyType: "1",
        mark: "1",
        sign: "1",
        cityOption: [],
        companeyOption: [],
        orgOption: [],
        reportno: "",
        person: "",
        licensenoTwo: "",
        phoneno: "",
        company: "",
        city: "",
        lng: "",
        lat: "",
        cityName: "",
        adressValue: "",
        accidentaddress: "",
        insurecompanyCode: "",
        ajaxUrl: "/boot-pub-survey-manage",
        radio: '',
        getCity: "京",
        activeName: 'first',
        activeNameTwo: 'third',
        activeNameThree: 'seven',
        caseActive: true,
        seatActive: false,
        insitituteActive: true,
        surveyActive: false,
        agencyActive: false,
        channelManageActive: false,
        surveyCompanyActive: true,
        claimActive: false,
        cityData: ['京','津','冀','晋','蒙','辽','吉','黑','沪','苏','浙','皖','闽','赣','鲁','豫','鄂','湘','粤','贵','云','藏','陕','甘','青','宁','新','琼','渝','川','桂'],
        cityModel:'',
        tuiCityArr:[],
        tuiCompanyArr:[],
        companyModel:'',
        provinceName: '',
        districtName: ''
      }
    },
    mounted() {
    },
    created(){
      this.chinaName = localStorage.getItem('chinaName')
      this.userName = localStorage.getItem('userName')
      this.headerActiveOne = localStorage.getItem('setHeaderActive');
      this.isChannel = localStorage.getItem('isChannel');
      this.zcState = localStorage.getItem('zcState');
      // alert(this.zcState)
      this.insurecompanyCode = localStorage.getItem('orgcode'); // 去匹配orgCode
      if(this.headerActiveOne == 'true'){
        this.insitituteActive = false;
        this.surveyActive = false;
        this.caseActive = true;
        this.seatActive = false;
        this.agencyActive = false;
        this.channelManageActive = false;    
        this.surveyCompanyActive = false;
      }else if (this.headerActiveOne == 'false' && this.isChannel == 'false'){
        this.insitituteActive = true;
        this.surveyActive = false;
        this.caseActive = false;
        this.seatActive = false;
        this.agencyActive = false;
        this.channelManageActive = false;          
        this.surveyCompanyActive = false;              
      }else {
         this.insitituteActive = false;
        this.surveyActive = false;
        this.caseActive = false;
        this.seatActive = false;
        this.agencyActive = false;
        this.channelManageActive = false;          
        this.surveyCompanyActive = true;             
      }

    },
    watch:{
      "activeName" (){
        if(this.activeName == "first"){
          this.caseActive = true;
          this.seatActive = false;
          this.insitituteActive = false;
          this.surveyActive = false;
          this.agencyActive = false;
          this.channelManageActive = false;            
        this.surveyCompanyActive = false;                
          this.claimActive = false;
        }else if(this.activeName == "second"){
          this.caseActive = false;
          this.seatActive = true;
          this.insitituteActive = false;
          this.surveyActive = false;
          this.agencyActive = false;
          this.channelManageActive = false;     
        this.surveyCompanyActive = false;                       
          this.claimActive = false;          
        }else if(this.activeName == 'five'){
          this.caseActive = false;
          this.seatActive = false;
          this.insitituteActive = false;
          this.surveyActive = false;
          this.agencyActive = true;
          this.channelManageActive = false;         
        this.surveyCompanyActive = false;                   
          this.claimActive = false;     
        }else if(this.activeName == 'eight'){
          this.claimActive = true;
          this.caseActive = false;
          this.seatActive = false;
          this.insitituteActive = false;
          this.surveyActive = false;
          this.agencyActive = false;
        }
      },
      "activeNameTwo"(){
        if(this.activeNameTwo == 'third'){
          this.caseActive = false;
          this.seatActive = false;
          this.insitituteActive = true;
          this.surveyActive = false;
          this.agencyActive = false;
          this.channelManageActive = false;          
        this.surveyCompanyActive = false;
        }else  if(this.activeNameTwo == 'four'){
          this.caseActive = false;
          this.seatActive = false;
          this.insitituteActive = false;
          this.surveyActive = true;
          this.agencyActive = false;
          this.channelManageActive = false; 
        this.surveyCompanyActive = false;                   
        }else if(this.activeNameTwo == 'six') {
          this.caseActive = false;
          this.seatActive = false;
          this.insitituteActive = false;
          this.surveyActive = false;
          this.agencyActive = false;
          this.channelManageActive = true;
        this.surveyCompanyActive = false;          
        }
      },
      'activeNameThree'() {
        if(this.activeNameThree == 'seven'){
          this.caseActive = false;
          this.seatActive = false;
          this.insitituteActive = false;
          this.surveyActive = false;
          this.agencyActive = false;
          this.channelManageActive = false;
          this.surveyCompanyActive = true;    
        }
      }

    },
    methods: {
      //获取经纬度
      getLogLat(value){
        const that = this;
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(value, function(point){
          if (point) {
            console.log(point,"获取经纬度")
            that.lng = point.lng;
            that.lat = point.lat;
          }else{
            alert("您选择地址没有解析到结果!");
          }
        });
      },
      //智能匹配事件
      intelligentMatchClick(e){
        if(this.textareaValue.length == 0){
            this.open4("请输入智能匹配信息")
            return
        };
        var paramData = {
          content:this.textareaValue
        }
       console.log(this.textareaValue)
          axios.post(this.ajaxUrl+"/intelligent_match/v1/match",paramData)
          .then(response => {
            if(response.data.rescode == 200){
               this.phoneno = response.data.data.phoneno;
               this.licensenoTwo = response.data.data.licenseno;
               this.person = response.data.data.person;
               this.reportno = response.data.data.reportno;
               //事故地点详情
               this.accidentaddress = response.data.data.accidentaddress;
               //获取经纬度
               this.getLogLat(this.accidentaddress);
               this.city = response.data.data.city;
               this.cityModel = response.data.data.cityName;
               this.cityName = response.data.data.cityName;
               this.company = response.data.data.company;
               this.companyModel = response.data.data.companyName;
               this.companyName = response.data.data.companyName;
               console.log(response.data)
            }else{
             
            }
          }, err => {
            console.log(err);
          })
          .catch((error) => {
            console.log(error)
          })
      },
      cityFocus(){
        this.cityOption.forEach((i,n)=>{

          if(i.dcCityName.indexOf(this.cityModel) != '-1'){
            this.tuiCityArr.push({
              name:i.dcCityName, code:i.dcCitycode
            });
          }
        })
      },
      chooseCity(cityname,citycode){
        this.tuiCityArr = [];
        this.cityModel = cityname;
        this.city = citycode;
        this.cityName = cityname;
      },
      checkCity(){
        this.tuiCityArr = [];
        this.cityOption.forEach((i,n)=>{

          if(i.dcCityName.indexOf(this.cityModel) != '-1'){
            this.tuiCityArr.push({
              name:i.dcCityName, code:i.dcCitycode
            });
          }
        })
      },
      companyFocus(){
        this.companeyOption.forEach((i,n)=>{

          if(i.name.indexOf(this.companyModel) != '-1'){
            this.tuiCompanyArr.push({
              name:i.name, code:i.code
            });
          }
        })
      },
      chooseCompany(companyname,companycode){
        this.tuiCompanyArr = [];
        this.companyModel = companyname;
        this.company = companycode;
        this.companyName = companyname;
      },
      checkCompany(){
        this.tuiCompanyArr = [];
        this.companeyOption.forEach((i,n)=>{

          if(i.name.indexOf(this.companyModel) != '-1'){
            this.tuiCompanyArr.push({
              name:i.name, code:i.code
            });
          }
        })
      },
      handleSelect(item) {
        console.log(item);
      },
      upcase(){
        this.licensenoTwo = this.licensenoTwo.toUpperCase();
        console.log(this.licensenoTwo)
      },
      goInsitituList() {
        this.$store.commit('setInsititutEditorActive', false);
        this.$store.commit('setIsChannelList', true);
      },
      //退出
      clickSignOut() {
        axios.post(this.ajaxUrl+"/pubsurvey/manage/login/v1/logout")
          .then(response => {
            if(response.data.rescode == 200){
              this.$store.commit('setCaseDetailActive', false);
              this.$store.commit('setInsititutEditorActive', false);
              this.$store.commit('setIsChannelList', true);
              this.$store.commit('setHeaderActive', false);
              this.$store.commit('setSignSeatsActive', false);
              this.$store.commit('getsurveyOrderId', "");
              this.$store.commit('getcaseListActive', false);
              this.$store.commit('getclickEditorActive', false);
              this.$store.commit('getsubmitCreateActive', false);
              this.$store.commit('getinsitituPageno', 1);
              localStorage.removeItem('insititutEditorData');//机构编辑
              localStorage.removeItem('caseDetailData');//详情信息
              localStorage.removeItem("setHeaderActive");
              localStorage.removeItem("orgcode");//登录信息
              localStorage.removeItem("insitituData");//机构信息
              localStorage.removeItem("signSeatData");//坐席信息
              localStorage.removeItem("insurecompanyCode");//坐席信息
              localStorage.removeItem("userName");//坐席信息
              localStorage.removeItem('institutionInfo'); // 渠道机构信息
              localStorage.removeItem('isChannel'); // 渠道机构信息
              // localStorage.clear();
              //清除缓存
              this.$router.push({path:"/"})
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
      open4(resdes) {
        this.$message.error(resdes);
      },
      open2(resdes) {
        this.$message.success(resdes);
      },

      initMap() {
        // 添加百度地图
        this.map = new BMap.Map("allmap");
      },
      handleClick(tab, event) {
      },
      removeArr(_arr,_obj){
        var length = _arr.length;
        for(var i = 0; i < length; i++)
        {
          if(_arr[i] == _obj)
          {
            if(i == 0)
            {
              _arr.shift(); //删除并返回数组的第一个元素
              return;
            }
            else if(i == length-1)
            {
              _arr.pop();  //删除并返回数组的最后一个元素
              return;
            }
            else
            {
              _arr.splice(i,1); //删除下标为i的元素
              return;
            }
          }
        }
      },
      openCreatCase(n){//打开创建案件
        if(n == 1){   // n 为1 创建假单  2为创建真单
          this.isFakeOrder = true;
        }else if(n == 2){
          this.isFakeOrder = false;
        }

        this.cityModel = '';
        this.tuiCityArr = [];
        this.tuiCompanyArr = [];
        this.companyModel = '';
        document.getElementsByClassName('scrollBox')[0].scrollTop = '100px';
        // console.log( document.getElementsByClassName('scrollBox')[0].scrollTop)
        $(".radio__inner").addClass("isChecked");
        this.mark = "1";
        this.surveyType = "1";
        $(".creatCaseDialog").removeClass('hide');
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

              // 把当前登录机构排到第一位
              let defaultCompany = '';
              // console.log('ssssssssssßßß',this.insurecompanyCode)
              this.orgOption.forEach( (item,index,arr) => {
                  if(item.code == this.insurecompanyCode){
                    defaultCompany = arr.splice(index,1);
                  }
              });
              console.log('defaultCompany',defaultCompany);
              this.orgOption.unshift(defaultCompany[0]);
              
              // 默认选中当前登录机构
              this.orgCode = this.insurecompanyCode;
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
      closCreatDiolag(){
        $(".creatCaseDialog").addClass('hide');

        // 清空输入框
            this.phoneno = '';
            this.getCity= '京';
            this.licensenoTwo = '';
            this.person = '';
            this.reportno = '';
            this.company = '';
            this.companyName = '';
            this.city = '';
            this.cityName = '';
            this.orgCode = '';
            this.surveyType = '1';
            this.accidentaddress = '';
            this.lng = '';
            this.lat = '';
            this.sign = '1';
            this.textareaValue = '';
            // this.adressValue = '';
            this.isGetOrder = false;
      },
      creatNewCase() {//确定创建案件
        //this.companyName = $("#companyName").find("option:selected").text();
        //this.cityName = $("#cityName").find("option:selected").text();
        this.licensenoTwo = this.licensenoTwo.replace(/\s|\xA0/g,"");
        this.phoneno = this.phoneno.replace(/\s/g,"");
        var reg = new RegExp("^[0-9]*$");
        if(!reg.test(this.phoneno)){
          this.open4("请输入正确手机号")
        }else if(this.phoneno.length<11){
          this.open4("请输入正确手机号")
        }else if(this.phoneno == ""){
          this.open4("请输入手机号")
        }else if(this.licensenoTwo == ""){
          this.open4("请输入车牌号")
        }else if(this.person == ""){
          this.open4("请输入报案人姓名")
        }else if(this.reportno == ""){
          this.open4("请输入保险报案号")
        }else if(this.company == ""){
          this.open4("请选择保险公司")
        }else if(this.city == ""){
          this.open4("请选择城市")
        }else if(this.orgCode == ""){
          this.open4("请选择处理机构")
        }else if(this.surveyType == ""){
          this.open4("请选择查勘类型")
        }
        else if(this.accidentaddress == ""){
          this.open4("请输入事故地点")
        }else {
          var paramData = {
            "action": "push",
            "phoneno": this.phoneno,
            "licenseno": this.getCity+this.licensenoTwo,
            "person": this.person,
            "reportno": this.reportno,
            "company": this.company,
            "companyName": this.companyName,
            "city": this.city,
            "cityName": this.cityName,
            "groupid": this.orgCode,
            "surveyType": this.surveyType,
            "accidentaddress": this.accidentaddress,
            "lng": this.lng,
            "lat": this.lat,
            "mark": this.sign,
            provinceName: this.provinceName,
            districtName: this.districtName
          }
          // 如果是创建假单
          if(this.isFakeOrder){ 
            paramData.promotionFlag = 0;
            // 是否可以抢到单
            if(this.isGetOrder){ // 可以抢到
              paramData.getFlag = 1;
            }else {
              paramData.getFlag = 0;              
            }

          }else { // 如果是创建真单
            paramData.promotionFlag = 1;
            paramData.getFlag = 0;            
          }
          console.log('啊啊啊啊啊啊啊啊',paramData);

          axios.post(this.ajaxUrl+"/pub/survey/v1/action",paramData)
            .then(response => {
              if(response.data.rescode == 200){
                this.phoneno = '';
                this.licensenoTwo = "",
                  this.cityOption = [];
                this.companeyOption = [];
                this.orgOption = [];
                this.reportno = "";
                this.person = "";
                this.city = "";
                this.orgCode = "";
                this.company = "";
                this.lat = "";
                this.lng = "";
                this.adressValue = "";
                this.accidentaddress = "";
                $(".radio__inner").addClass("isChecked");
                this.mark = "1";
                this.sign = '1';
                this.surveyType = '1';
                this.getCity = "京";
                this.cityName = "";
                this.open2("创建成功");
                $(".creatCaseDialog").addClass('hide');
                this.$store.commit('getcaseListActive', true)//调用case列表接口
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
        }

      },
      openCityDialog(){//打开城市
        $(".cityDialog").removeClass("hide")
      },
      closeCityDiolag(){//关闭城市遮盖层
        $(".cityDialog").addClass("hide")
      },
      selectCity(city){
        this.getCity = city;
        $(".cityDialog").addClass("hide")
      },
      openAdressDialog(){
        $(".AdressDialog").removeClass("hide")
      },
      closeAdressDiolag(){
        $(".AdressDialog").addClass("hide")
      },
      //获取详细地址
      searchAdress(){
        const that = this;        
        if(this.adressValue!=''){
          var map = '';
          map = new BMap.Map("allmap");
          map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
          map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
          map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
          map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件
          map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT }));   //右下角，打开
          map.clearOverlays();//清空原来的标注
          var keyword = this.adressValue;
          var localSearch = new BMap.LocalSearch(map);
          localSearch.enableAutoViewport(); //允许自动调节窗体大小
          localSearch.setSearchCompleteCallback(function (searchResult) {
            var poi = searchResult.getPoi(0);
            if(poi === undefined){
              alert('请输入合法地址')
            }else{

              //              $("#container").removeClass('none');
              $(".sureAdress").removeClass('hide')
              document.getElementById("result_Lng").value = poi.point.lng ;
              document.getElementById("result_Lat").value = poi.point.lat;
              map.centerAndZoom(poi.point, 13);
              var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat));  // 创建标注，为要查询的地方对应的经纬度
              var geoc = new BMap.Geocoder();
              var pt = poi.point;
              geoc.getLocation(pt, function(rs){
                  var addComp = rs.addressComponents;
                  that.provinceName = addComp.province;
                  that.districtName = addComp.district;
                  // alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
              });
              map.addOverlay(marker);
              marker.enableDragging();  //设置可拖拽
              marker.addEventListener("dragend", function(e){  //拖动事件
                var pt = e.point;
                var dizhi;
                geoc.getLocation(pt, function(rs){
                  var addComp = rs.addressComponents;
                  dizhi = addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                  document.getElementById('text_').value = dizhi;//更新地址数据
                  this.adressValue = dizhi;
                  var content = dizhi + "<br/><br/>经度：" + e.point.lng + "<br/>纬度：" + e.point.lat;
                  var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + content + "</p>");
                  marker.openInfoWindow(infoWindow,map.getCenter());//将经纬度信息显示在提示框内
                });
                document.getElementById("result_Lng").value = e.point.lng;
                document.getElementById("result_Lat").value = e.point.lat;

              });
              var content = document.getElementById("text_").value + "<br/><br/>经度：" + poi.point.lng + "<br/>纬度：" + poi.point.lat;
              var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + content + "</p>");
              marker.addEventListener("click", function () { this.openInfoWindow(infoWindow); });
              // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            }
          });
          localSearch.search(keyword);
        }else{
          alert("请输入地址")
        }
      },
      sureAdress() {
        if(this.adressValue == ""){
          alert("请输入地址")
        }else{
          var lng = document.getElementById("result_Lng").value;
          if(lng.length == 0){
             alert("没有获取到您的经纬度");
             return
          };
          this.accidentaddress = this.adressValue;
          this.lng = document.getElementById("result_Lng").value;
          this.lat = document.getElementById("result_Lat").value;
          $(".AdressDialog").addClass("hide")
          $(".sureAdress").addClass('hide')
          document.getElementById("result_Lng").value = "";
          document.getElementById("result_Lat").value = "";
          // this.adressValue = '';
        }
      },
      checkRadio(){
        $(".radio__inner").toggleClass("isChecked");
        if($(".radio__inner").attr("class").indexOf("isChecked")>0){
          this.mark = "1";
        }else{
          this.mark = "0";
        }
      }
    },
    components: {
      caseManage,
      seatManage,
      institutionManage,
      surveyManage,
      singleAgency,
      channelManage,
      surveyManageCompany,
      claimGuide
    },
  }

</script>

