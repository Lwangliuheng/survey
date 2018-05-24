<template>
  <div class="claim-guide">
    <form class="search-zone">
        <span>公司:</span>
        <el-select v-model="companyCode" name="" placeholder="请选择公司" size="small">
        <el-option
            v-for="item in companyOptions"
            :key="item.name"
            :label="item.name"
            :value="item.code">
        </el-option>
        </el-select>
        <span>省份:</span>
        <el-select v-model="provinceCode" name="" placeholder="请选择开通省份" size="small">
        <el-option
            v-for="item in provinceOptions"
            :key="item.name"
            :label="item.name"
            :value="item.id">
        </el-option>
        </el-select>
        <span>城市:</span>
        <el-select v-model="cityCode" name="" placeholder="请选择城市" size="small">
        <el-option
            v-for="item in cityOptions"
            :key="item.name"
            :label="item.name"
            :value="item.id">
        </el-option>
        </el-select>
        <span class="search-btn" @click="search(1)">搜索</span>
        <span class="search-btn2" @click="clearInput">清空</span>
        <span class="search-btn"  style="float:right;margin-top:15px;" @click="isCreate = true;">新增</span>              
    </form>

      <div class="caseListTable" v-if="totalCount">
        <table class="table" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid #bbb;">
          <thead>
          <tr>
            <th>序号</th>
            <th style="width: 45%">保险公司</th>
            <th>省份</th>
            <th>城市</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableData" :key='index'>
            <td>{{index+1}}</td>
            <td>{{item.insureName}}</td>
            <td>{{item.provName}}</td>
            <td>{{item.cityName}}</td>
            <td ><span class="listView" @click="goSurveyDetail(item.id,item.content)">编辑</span></td>
          </tr>
          </tbody>
        </table>
        <div style="padding-bottom: 15px;">
          <el-pagination  
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-size="pageSize"
            layout="total,prev,pager,next"
            :total="totalCount">
          </el-pagination>
        </div>
      </div>
      <div class="caseListTable" v-else>
        <p style="text-align:center;padding: 15px 0;">暂无数据</p>
      </div>
    <!-- 编辑弹窗 -->
    <div class="mask" v-show="isPopup">
        <div class="popup">
            <b class="el-icon-circle-close-outline" @click='isPopup = false;'></b>
            <h3>请确认理赔指引内容:</h3>
            <el-input
                type="textarea"
                :autosize="{ minRows: 8}"
                placeholder="请输入理赔指引内容"
                v-model.trim="textVal">
            </el-input>
            <div class="btns">
                <el-button type="success" @click='submit' :disabled="isDisabled">提交</el-button>
                <el-button @click='clear'>清空</el-button>
            </div>
        </div>
    </div>
    <!-- 新增弹窗 -->
    <div class="mask" v-show="isCreate">
        <div class="popup">
            <b class="el-icon-circle-close-outline" @click='close'></b>
            <form class="search-zone" style="width: 100%;">
                <span>公司:</span>
                <el-select v-model="companyCode1" name="" placeholder="请选择公司">
                <el-option
                    v-for="item in companyOptions1"
                    :key="item.name"
                    :label="item.name"
                    :value="item.code">
                </el-option>
                </el-select>
                <span>省份:</span>
                <el-select v-model="provinceCode1" name="" placeholder="请选择开通省份">
                <el-option
                    v-for="item in provinceOptions1"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id">
                </el-option>
                </el-select><br>
                <span>城市:</span>
                <el-select v-model="cityCode1" name="" placeholder="请选择城市">
                <el-option
                    v-for="item in cityOptions1"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id">
                </el-option>
                </el-select>            
            </form>
            <h3>请输入理赔指引内容:</h3>
            <el-input
                type="textarea"
                :autosize="{ minRows: 8}"
                placeholder="请输入理赔指引内容"
                v-model.trim="textVal1">
            </el-input>
            <div class="btns">
                <el-button type="success" @click='create' :disabled="isDisabled1">提交</el-button>
                <el-button @click='clear1'>清空</el-button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import phones from '../js/phoneData.js'
import axios from 'axios'
export default {
    name: 'claimGuide',
  data (){
      return {
            isCreate: false, // 是不是新增
            phone: '',
            textVal: '',
            textVal1: '', // 新增
            isPopup: false, // 弹窗是否显示
            code: localStorage.insurecompanyCode,
            isDisabled: true,
            isDisabled1: true,
            ajaxUrl: "/boot-pub-survey-manage",
            content: '',
            tableData: [],
            companyCode: '', // 搜索内容以下
            provinceCode: '',
            cityCode: '',
            companyOptions: [],
            provinceOptions: [],
            cityOptions: [],
            companyCode1: '', // 新增弹窗以下
            provinceCode1: '',
            cityCode1: '',
            companyOptions1: [],
            provinceOptions1: [],
            cityOptions1: [],
            page: 1,
            pageSize: 10,
            totalCount: 0,
            currentId: '',
            searchPage: 1,

      }
  },

  mounted (){
        // 加载列表
        this.search();

        // 加载公司列表
        var paramData = {
          "action": "detail"
        }
        axios.post(this.ajaxUrl+"/pub/survey/v1/orgcity",paramData)
        .then( res => {
            console.log('公司',res.data.data.company)
            this.companyOptions = res.data.data.company;
            this.companyOptions1 = res.data.data.company;
        })

        // 加载省份
        axios.get(this.ajaxUrl+"/pubsurvey/manage/department/v1/provinceinsure")
        .then(response => {
            if(response.data.rescode == 200){
                this.provinceOptions = response.data.data.provinces
                this.provinceOptions1 = response.data.data.provinces
            }else{
                this.$message({
                    showClose: true,
                    message: response.data.resdes,
                    type: 'warning'
                });
            }
        }, err => {
            console.log(err);
        })
  },
  watch: {
      textVal (){
          if(this.textVal){
            this.isDisabled = false;
          }else {
              this.isDisabled = true;
          }
      },
      textVal1 (){
          if(this.textVal1){
            this.isDisabled1 = false;
          }else {
              this.isDisabled1 = true;
          }
      },
        provinceCode(){
            this.cityCode = '';
          if(this.provinceCode){
            axios.get(this.ajaxUrl+"/pubsurvey/manage/department/v1/"+this.provinceCode+"/citys")
              .then(response => {
                if(response.data.rescode == 200){
                  this.cityOptions = response.data.data;
                }else{
                    this.$message({
                        showClose: true,
                        message: response.data.resdes,
                        type: 'warning'
                    });
                }
              }, err => {
                console.log(err);
              })
            }
        },
        provinceCode1(){
            this.cityCode1 = '';
          if(this.provinceCode1){
            axios.get(this.ajaxUrl+"/pubsurvey/manage/department/v1/"+this.provinceCode1+"/citys")
              .then(response => {
                if(response.data.rescode == 200){
                  this.cityOptions1 = response.data.data;
                }else{
                    this.$message({
                        showClose: true,
                        message: response.data.resdes,
                        type: 'warning'
                    });
                }
              }, err => {
                console.log(err);
              })
            }
        },
  },
  methods:{
      // 加载列表
        // init () {
        //     axios.post(this.ajaxUrl+'/claims_guidelines/v2/page',{
        //         currentPageNo: this.page,
        //         pageSize: this.pageSize
        //     }).then( res => {
        //         console.log(res.data)
        //         if(res.data.rescode == 200){
        //             this.totalCount = res.data.data.total;
        //             this.tableData = res.data.data.records;
        //         }else {
        //             this.$message({
        //                 showClose: true,
        //                 message: res.data.resdes,
        //                 type: 'warning'
        //             });
        //         }
        //     })
        // },
      // 搜索
      search(n) {
        //   if(this.companyCode || this.provinceCode || this.cityCode){
            const data = {
                "insureCode": this.companyCode,
                "cityCode": this.cityCode,
                "provCode": this.provinceCode,
                "currentPageNo": n ? n : this.searchPage,
                "pageSize": 10
            };
            axios.post(this.ajaxUrl+'/claims_guidelines/v2/page',data)
            .then(res => {
                console.log(res.data);
                if(res.data.rescode == 200){
                    this.tableData = res.data.data.records;
                    this.totalCount = res.data.data.total;
                }else {
                    this.$message({
                    showClose: true,
                    message: res.data.resdes,
                    type: 'warning'
                    });
                }
            }) 
        //   }
      },

      // 清空并刷新
      clearInput (){
          this.cityCode = '';
          this.companyCode = '';
          this.provinceCode = '';
          this.cityOptions = [];
          this.textVal1 = '';
        //   this.page = 1;
          this.searchPage = 1;
          this.search();
      },

    // 点击编辑
    goSurveyDetail(id,content) {
        this.isPopup = true;
        this.currentId = id;
        this.textVal = content;
    },

    handleCurrentChange (val) {
        // this.page = val;
        this.searchPage = val;
        this.search();
    },
    // 新增
    create (){
        if(!this.companyCode1){
            return this.$message.error('请选择公司')
        }
        if(!this.provinceCode1){
            this.$message.error("请选择公司所在省份");            
        }
        if(!this.cityCode1){
            this.$message.error('请选择公司所在城市');            
        }

        axios.post(this.ajaxUrl+'/claims_guidelines/v2/add',{
            "insureCode": this.companyCode1,
            "cityCode": this.cityCode1,
            "provCode": this.provinceCode1,
            content: this.textVal1
        }).then (res => {
            if(res.data.rescode == 200){
                this.clearInput();

                this.$message({
                showClose: true,
                message: '创建成功',
                type: 'success'
                });
                this.close();

            }else {
                this.$message.error(res.data.resdes);
            }
        })
    },
    // 关闭弹窗
    close (){
          this.cityCode1 = '';
          this.companyCode1 = '';
          this.provinceCode1 = '';
          this.cityOptions1 = [];
          this.textVal1 = '';
          this.isCreate = false;
    },
    // 提交编辑
    submit(){
        axios.post(this.ajaxUrl+'/claims_guidelines/v2/modify',{
            id: this.currentId,
            content: this.textVal
        })
        .then(res => {
            console.log(res.data);
            if(res.data.rescode == 200){
                // 回到搜索装态
                this.search();
                this.$message({
                showClose: true,
                message: '提交成功',
                type: 'success'
                });
                this.isPopup = false;
            }else {
                this.$message.error(res.data.resdes);
            }
        })
    },
    clear() {
        this.textVal = '';
    },
    // 新增的清空
    clear1(){
        this.textVal1 = '';
        this.cityCode1 = '';
        this.companyCode1 = '';
        this.provinceCode1 = '';
        this.cityOptions1 = [];
    }
  }
}
</script>
<style scoped>
  .claim-guide {
      background: #fff;
      margin: 15px auto;
      width: 80%;
      overflow-y: scroll;
      height: 82vh;
      padding: 20px;
  }

  .claim-guide .mask {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, .3);
      z-index: 99;
      
  }

  .claim-guide .mask .popup {
      width: 700px;
      padding: 20px;
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }

  .claim-guide .popup b {
      font-size: 28px;
      padding: 6px;
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      color: #666;
  }

  .claim-guide .popup h3 {
      font-size: 16px;
      line-height: 40px;
  }

  .popup .el-button--success span {
      color: #fff;
  }

  .popup .btns {
      margin-top: 20px;
      display: flex;
      justify-content: center;
  }

  .popup .btns button {
      margin: 0 30px;
  }
  .search-zone {
      width: 90%;
      margin: 0 auto;
      padding-bottom: 20px;
  }
    .el-select {
        margin: 0;
    }
    .search-btn {
        display: inline-block;
        font-size: 15px;
        color: #fff;
        border-radius: 5px;
        background: #2eab3b;
        padding: 7px 20px;
        margin-left: 5px;
        cursor: pointer;
    }
    .search-btn2 {
        display: inline-block;
        font-size: 15px;
        color: #2eab3b;
        border-radius: 5px;
        border: 1px solid #2eab3b;
        padding: 7px 20px;
        margin-left: 5px;
        cursor: pointer;
    }
.caseListTable{
    padding-top: 20px;
    border-top: 1px solid #bbb;
    width: 90%;
    margin: 0 auto;
  }
.caseListTable table {
    width: 100%;
}
  .table th{
    color: #2EAB3B;
    background: #ECF8F5;
    border-top: none;
  }
  .listView {
      color: #0d70d8;
      cursor: pointer;
  }
</style>


