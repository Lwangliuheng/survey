<template>
  <div class="create-child-institution">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
    <el-form-item label="机构名称" prop="name">
        <el-input v-model.trim="ruleForm.name" placeholder="请输入机构名称"></el-input>
    </el-form-item>
    <el-form-item label="所属公司" prop="company">
        <el-select v-model="ruleForm.company" value-key="companyCode" placeholder="请选择所属公司">
            <el-option
            v-for="item in companys"
            :key="item.companyCode"
            :label="item.companyName"
            :value="item">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="开通省份" prop="province">
        <el-select v-model="ruleForm.province" value-key="id" placeholder="请选择开通省份">
            <el-option
            v-for="item in provinces"
            :key="item.id"
            :label="item.name"
            :value="item">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="联系人" prop="person">
        <el-input v-model.trim="ruleForm.person" placeholder="请输入联系人名称"></el-input>
    </el-form-item>
    <el-form-item label="联系人手机" prop="phone" ref='phone'>
        <el-input v-model="ruleForm.phone" placeholder="请输入联系人手机" maxlength="11"></el-input>
    </el-form-item>
    <el-form-item label="所在城市" prop="city">
        <el-select v-model="ruleForm.city" value-key="id" placeholder="请选择开通城市">
            <el-option
            v-for="item in citys"
            :key="item.id"
            :label="item.name"
            :value="item">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="账号" prop="account">
        <el-input v-model.trim="ruleForm.account" placeholder="请输入机构账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input type="password" v-model.trim="ruleForm.password" placeholder="请输入机构密码"></el-input>
    </el-form-item>
    <el-form-item label="账号状态" prop="status">
        <el-select v-model="ruleForm.status" value-key="value" placeholder="请选择账号状态">
            <el-option
            v-for="item in statuss"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="结算方式" prop="paymean">
        <el-select v-model="ruleForm.paymean" placeholder="请选择结算方式">
            <el-option
            v-for="item in paymeans"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="渠道价格" prop="price">
        <el-input v-model.trim="ruleForm.price" placeholder="请输入渠道价格" style="width:92%;"></el-input>&nbsp;元
    </el-form-item>
    <el-form-item label="邀请码" prop="code" style="float:right;" v-if="!userid">
        <el-input readonly v-model="ruleForm.code" style="width:70%" placeholder="点击生成机构代码"></el-input>
        <el-button @click="setCode" style="width:28%" type="success">生成</el-button>
    </el-form-item>
    <div style="width:100%;overflow:hidden;">    
        <el-form-item prop='qrcode' style="float:right;overflow:hidden;text-align:center;">
            <div class="image">
                <span class="el-icon-picture-outline" v-show="!ruleForm.qrcodeUrl"></span>
                <img :src="ruleForm.qrcodeUrl" alt="">
            </div>
            <div class="noQRcode">{{noQRcode}}</div>
            <div style="text-align:center;">
                <el-button @click="setQRcode" type="success" v-if="!userid">生成二维码</el-button>
                <el-button ref="downloadBtn" @click="downloadQRcode" type="success">下载二维码</el-button>
                <!-- <a :href="ruleForm.qrcodeUrl" @click="downloadQRcode($event,ruleForm.qrcodeUrl,ruleForm.code)" :download="ruleForm.qrcodeUrl" target="_blank" class="downloadBtn">下载二维码</a> -->
            </div>
        </el-form-item>
    </div>
    <el-form-item style="float:right; width: 100%;text-align:center;" class="form-btn">
        <el-button type="success" @click="back">取消</el-button>
        <el-button type="success" @click="submitForm('ruleForm')">提交</el-button>
    </el-form-item>
    </el-form>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        <span>点击确定，所做修改将不会保存。</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="confirm">确定</el-button>
            <el-button type="success" @click="dialogVisible = false">我再想想</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入联系人手机号'));
        }else if(!(/^1[34578]\d{9}$/g).test(value)) {
            callback(new Error('手机号输入有误'));
        } else {
            callback();
        }
        
      };
      var checkPassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入密码'));
        }else {
            if (!(/^[0-9a-zA-Z]{6,25}$/g).test(value)) {
                callback(new Error('长度在6到25个字符,只能包含数字和英文大小写'));
            } else {
                callback();
            }
        }
      };

       var checkAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入账号'));
        }else {
            if (!(/^[0-9a-zA-Z]{4,20}$/g).test(value)) {
                callback(new Error('长度在4到20个字符,只能包含数字和英文大小写'));
            } else {
                callback();
            }
        }
      };

    return {
        ajaxUrl: '/boot-pub-survey-manage',        
        noQRcode: '',
      companys: [],
      provinces: [],
      citys: [],
      paymeans: [
        {
          value: "0",
          label: "总公司"
        },
        {
          value: "1",
          label: "分公司"
        },{
          value: "2",
          label: "个人"
        }],
      statuss: [
        {
          value: "0",
          label: "正常"
        },
        {
          value: "1",
          label: "锁定"
        }
      ],
      dialogVisible: false,
        userid: '',  // 用户id
        orgcode: '',  // 机构代码
      ruleForm: {
        name: "",
        company: {},
        province: {},
        address: "",
        person: "",
        phone: "",
        city: {},
        account: "",
        password: "",
        status: "",
        code: "",
        qrcodeUrl: '',
        price: '',
      },
      rules: {
        name: [
          { required: true, message: "请输入机构名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在3到20个字符", trigger: "blur" }
        ],
        company: [
          { required: true, message: "请选择所属公司", trigger: "change" }
        ],
        province: [
          { required: true, message: "请选择开通省份", trigger: "change" }
        ],
        price: [
          { required: true, message: "请输入渠道价格", trigger: "blur" }
        ],
        person: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2到10个字符", trigger: "blur" }
        ],
        phone: [
            {required: true, validator: checkPhone, trigger: 'blur' }
        ],
        city: [
          { required: true, message: "请选择开通城市", trigger: "change" }
        ],
        paymean: [
          { required: true, message: "请选择结算方式", trigger: "change" }
        ],
        status: [
          { required: true, message: "请选择账号状态", trigger: "change" }
        ],
        account: [
            // { required: true, message: "请输入机构账号", trigger: "blur" }      
            {required: true, validator: checkAccount, trigger: 'blur' }                            
        ],
        password: [
            {required: true, validator: checkPassword, trigger: 'blur' }            
        ],
        code: [
          { required: true, message: "请生成机构代码", trigger: "change" }
        ]
      }
    };
  },

  computed:{
    //   watchProvince (){
    //       return this.ruleForm.province
    //   }
  },
  mounted() {
      // 如果有值。代表是列表查看详情
      const that = this;
      if(localStorage.institutionInfo) {
          let info = JSON.parse(localStorage.institutionInfo);
            this.ruleForm.name = info.orgname;
            this.ruleForm.account = info.username
            this.ruleForm.password = '000000';  // 初始化密码，如果没有修改传空值，修改则穿修改值
            this.ruleForm.person = info.userchinaname;
            this.ruleForm.phone = info.userphone;
            this.ruleForm.status = (info.islocked == '正常')? '0' : '1';
            this.ruleForm.paymean = info.balancetype;
            this.ruleForm.price = info.channelprice;
            this.ruleForm.code = info.invitecode;
            this.ruleForm.qrcodeUrl = info.inviteqrcodeurl;
            this.userid = info.userid;
            this.orgcode = info.orgcode;

            //获取公司列表 
          this.getCompanys().then (res => {
              this.companys = res;
            this.ruleForm.company.companyCode = info.ridercomcode;
            this.ruleForm.company.companyName = info.ridercomname;
          });

        // 获取省份列表
          this.getProvinces().then( res => {
              this.provinces = res;
            this.ruleForm.province.id = info.provincecode;
            this.ruleForm.province.name = info.provincename;

            this.getCitys(info.provincecode).then( res => {
                that.citys = res;
                that.ruleForm.city.id = info.citycode
                that.ruleForm.city.name = info.cityname
            })
          })

      }else {
          //获取公司列表 
          this.getCompanys().then (res => {
              this.companys = res;
          });

          // 获取省份列表
          this.getProvinces().then( res => {
              this.provinces = res;

          });
      }
  },

  watch: {
      // 如果修改了省份
      'ruleForm.province':function(newval,oldval) {
          const that = this;
          // 先清空 城市列表
          // TODO 不知道为什么paymean第一次选择时会调用一次
          if(this.ruleForm.paymean == undefined){
            this.ruleForm.citys = [];
            this.ruleForm.city = {};
            this.getCitys(newval.id).then ( res => {
                this.citys = res;
            })
          }
      }
  },

  methods: {
      // 获取公司列表
        getCompanys() {
            const that = this;
            return new Promise( (resolve,reject) => {

                axios.get(this.ajaxUrl+ '/pubsurvey/surveyor/v1/user/affiliate/company').then ( res => {
                    // console.log(res.data.data);
                    if(res.data.rescode == 200) {
                        // that.companys = res.data.data;
                        resolve(res.data.data);
                    }else {
                        that.$message.error('获取公司列表失败:'+res.data.resdes)
                    }
                }, err => {
                    console.log(err);
                })
            })
        },

      // 获取省份列表
      getProvinces () {
        const that = this;
        return new Promise( (resolve,reject) => {
            axios.get(this.ajaxUrl+"/pubsurvey/manage/department/v1/provinceinsure")
            .then(res => {
                // console.log(res.data.data);
                if(res.data.rescode == 200){
                    // this.provinces = res.data.data.provinces;
                    resolve(res.data.data.provinces);
                }else {
                    that.$message.error('获取省份列表失败:'+res.data.resdes)            
                }
            }, err => {
                console.log(err);
            })
        })
      },

        // 获取城市列表
        getCitys (code) {
            const that = this;
            return new Promise( (resolve,reject) => {
                axios.get(this.ajaxUrl+"/pubsurvey/manage/department/v1/"+code+"/citys")
                .then(response => {
                  if(response.data.rescode == 200){
                  
                    // this.citys = response.data.data;
                    resolve(response.data.data);
                  }else{
                    that.$message.error('获取城市列表失败:'+response.data.resdes)
                  }
                }, err => {
                  console.log(err);
                })
            })
        },

    // 随机生成机构代码
    setCode() {

        // 生成全局唯一标识 当前日期到毫秒
        function guid() {
            let now = new Date();
            let year = now.getFullYear();
            let month = (now.getMonth() +1) > 9 ? (now.getMonth() +1) : '0' + (now.getMonth() +1);
            let day = (now.getDay() +1) > 9 ? (now.getDay() +1) : '0' + (now.getDay() +1);
            let hour = now.getHours() > 9 ? now.getHours() : '0' + now.getHours();
            let minute = now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes();
            let second = now.getSeconds() > 9 ? now.getSeconds() : '0' + now.getSeconds();
            let millisecond = now.getMilliseconds() > 9 ? now.getMilliseconds() : '0' + now.getMilliseconds();
            return year+month+day+hour+minute+second+millisecond;
        }
        this.ruleForm.code = guid();
    },


    // 生成二维码
    setQRcode() {
        if(!this.ruleForm.code) {
            return this.$message({
                message: '需要生成机构代码',
                type: 'warning'
            });

        }else {
            axios.post(this.ajaxUrl+ '/pubsurvey/manage/rider/department/v1/generateqrcode',{
                invitecode: this.ruleForm.code
            }).then ( res => {
                if(res.data.rescode == 200){
                    this.ruleForm.qrcodeUrl = res.data.data.qrcodeurl;
                }else {
                    this.$message.error('生成二维码失败:'+res.data.resdes)
                }
            })
        }
    },

    // 下载二维码
    downloadQRcode(ev,url,name) {
        // 判断是否生成二维码了
        if(!this.ruleForm.qrcodeUrl){
            this.$message({
                message: '需要生成二维码',
                type: 'warning'
            });
            return;
        }else {
            window.open(this.ajaxUrl+'/pubsurvey/manage/rider/department/v1/exportqrcode?qrcodeurl='+this.ruleForm.qrcodeUrl);

        }
    },

    // 取消
    back() {
      this.dialogVisible = true;
    },

    // 确定返回
    confirm () {
        this.$store.commit('setIsChannelList', true);
        this.$store.commit('getsubmitCreateActive', true);

    },

    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            if(!this.ruleForm.qrcodeUrl) {
                return this.$message({
                    message: '请生成二维码再提交',
                    type: 'warning'
                });
            }else {
                let ruleForm = this.ruleForm;
                let data = {
                    orgname: ruleForm.name,
                    username: ruleForm.account,
                    userchinaname: ruleForm.person,
                    userphone: ruleForm.phone,
                    ridercomcode: ruleForm.company.companyCode,
                    ridercomname: ruleForm.company.companyName,
                    islocked: ruleForm.status,
                    provincecode: ruleForm.province.id,
                    provincename: ruleForm.province.name,
                    citycode: ruleForm.city.id,
                    cityname:  ruleForm.city.name,
                    balancetype: ruleForm.paymean,
                    channelprice: ruleForm.price,
                    invitecode: ruleForm.code,
                    inviteqrcodeurl: ruleForm.qrcodeUrl
                };
                console.log(this.ruleForm.status)
                // 如果是修改
                if(this.userid) {
                    // 如果点击提交时，password 为初始值，则未修改，传空值，否则为修改密码，传对应值
                    data.userpwd = this.ruleForm.password == '000000' ?data.userpwd = '' :data.userpwd = this.ruleForm.password;
                    data.userid = this.userid;
                    data.orgcode = this.orgcode;
                    axios.post(this.ajaxUrl+ '/pubsurvey/manage/rider/department/v1/orgupdate',data)
                    .then ( res => {
                    
                        if(res.data.rescode == 200){
                            
                            this.$store.commit('setIsChannelList', true);
                            this.$store.commit('getsubmitCreateActive', true);
                        }else {
                            this.$message.error('提交失败:'+res.data.resdes)                        
                        }
                    })  
                }else {
                    // 新增
                    data.userpwd = this.ruleForm.password;
                    
                    axios.post(this.ajaxUrl+ '/pubsurvey/manage/rider/department/v1/orgadd',data)
                    .then ( res => {
                    
                        if(res.data.rescode == 200){
                            
                            this.$store.commit('setIsChannelList', true);
                            this.$store.commit('getsubmitCreateActive', true);
                        }else {
                            this.$message.error('提交失败:'+res.data.resdes)                        
                        }
                    })
                }
            }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};

</script>

<style scoped>
.create-child-institution {
  background: #fff;
  margin: 15px auto;
  width: 80%;
  overflow-y: scroll;
  height: 82vh;
  padding: 20px;
}
.image {
  display: inline-block;
  width: 200px;
  height: 200px;
  background: #eee;
  position: relative;
  text-align: center;
}
.image img {
    width: 200px;
}
.image span {
  font-size: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  color: #999;
  transform: translate(-50%, -50%);
}
.noQRcode {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    height:20px;
    width: 200px;
    margin: 6px auto 0;
    text-align: left;
}
.downloadBtn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    color: #606266;
    text-align: center;
    box-sizing: border-box;
    margin: 0;
    transition: .1s;
    padding: 12px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
}
</style>

