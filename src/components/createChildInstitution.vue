<template>
  <div class="create-child-institution">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
    <el-form-item label="机构名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入机构名称"></el-input>
    </el-form-item>
    <el-form-item label="所属公司" prop="company">
        <el-select v-model="ruleForm.company" placeholder="请选择所属公司">
            <el-option
            v-for="item in companys"
            :key="item"
            :label="item"
            :value="item">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="开通省份" prop="province">
        <el-select v-model="ruleForm.province" placeholder="请选择开通省份">
            <el-option
            v-for="item in provinces"
            :key="item.value"
            :label="item.label"
            :value="item">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="联系人" prop="person">
        <el-input v-model="ruleForm.person" placeholder="请输入联系人名称"></el-input>
    </el-form-item>
    <el-form-item label="联系人手机" prop="phone" ref='phone'>
        <el-input v-model.number="ruleForm.phone" placeholder="请输入联系人手机" maxlength="11"></el-input>
    </el-form-item>
    <el-form-item label="所在城市" prop="city">
        <el-select v-model="ruleForm.city" placeholder="请选择开通城市">
            <el-option
            v-for="item in citys"
            :key="item.value"
            :label="item.label"
            :value="item">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="账号" prop="account">
        <el-input v-model="ruleForm.account" placeholder="请输入机构账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" placeholder="请输入机构密码"></el-input>
    </el-form-item>
    <el-form-item label="账号状态" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择账号状态">
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
        <el-input v-model="ruleForm.price" placeholder="请输入渠道价格" style="width:92%;"></el-input>&nbsp;元
    </el-form-item>
    <el-form-item label="机构代码" prop="code" style="float:left;">
        <el-input readonly v-model="ruleForm.code" style="width:70%" placeholder="点击生成机构代码"></el-input>
        <el-button @click="setCode" style="width:28%" type="success">生成</el-button>
    </el-form-item>
    <div style="width:100%;overflow:hidden;">    
        <el-form-item prop='qrcode' style="float:left;overflow:hidden;text-align:center;">
            <div class="image">
                <span class="el-icon-picture-outline" v-show="!ruleForm.qrcodeUrl"></span>
                <img :src="ruleForm.qrcodeUrl" alt="">
            </div>
            <div class="noQRcode">{{noQRcode}}</div>
            <div style="text-align:center;">
                <el-button @click="setQRcode" type="success">生成二维码</el-button>
                <el-button @click="downloadQRcode($event,ruleForm.qrcodeUrl,ruleForm.code)" type="success">下载二维码</el-button>
            </div>
        </el-form-item>
    </div>
    <el-form-item style="float:left; width: 100%;text-align:center;" class="form-btn">
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
            <el-button @click="dialogVisible = false">确定</el-button>
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
        }else if (!Number.isInteger(value)) {
            callback(new Error('请输入纯数字值'));
        } else {
            if (!(/^1[34578]\d{9}$/g).test(value)) {
                callback(new Error('手机号输入有误'));
            } else {
                callback();
            }
        }
      };

    return {
        ajaxUrl: "/boot-pub-survey-manage",
        noQRcode: '',
      companys: [ "黄金糕","双皮奶"],
      provinces: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }],
      citys: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }],
      paymeans: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }],
      statuss: [
        {
          value: "0",
          label: "启用"
        },
        {
          value: "1",
          label: "不启用"
        }
      ],
      dialogVisible: false,
      ruleForm: {
        name: "",
        company: "",
        province: '',
        address: "",
        person: "",
        phone: "",
        city: "",
        account: "",
        password: "",
        status: "",
        code: "",
        qrcodeUrl: "",
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
          { required: true, message: "请输入机构账号", trigger: "blur" }            
        ],
        password: [
          { required: true, message: "请输入机构密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在6到20个字符", trigger: "blur" }                
        ],
        code: [
          { required: true, message: "请生成机构代码", trigger: "change" }
        ]
      }
    };
  },

  mounted() {

      // 获取城市列表

    
    // 获取机构类型列表

  },

  methods: {
    // 随机生成机构代码
    setCode() {

        // 生成全局唯一标识
        function guid() {
            return 'xxxxxxx4xxxyxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        }
        this.$refs.phone.validate(vaild => {
            if(vaild){
                this.ruleForm.code = guid();
            }
        })
    },

    // 生成二维码
    setQRcode() {
        if(!this.ruleForm.code) {
            this.$message({
                message: '需要生成机构代码',
                type: 'warning'
            });
            return;
        }else {

            axios.post(this.ajaxUrl+ '/pubsurvey/manage/rider/department/v1/generateqrcode',{
                invitecode: this.ruleForm.code
            }).then ( res => {
                console.log(res);
            })
        }
    },

    // 下载二维码
    downloadQRcode(ev,url,name) {
        // 下载方法
        function download(ev, url, name) {
            const aLink = document.createElement('a')
            aLink.download = name 
            aLink.href = url 
            aLink.dispatchEvent(ev)
        }

        if(!this.ruleForm.qrcodeUrl){
            this.$message({
                message: '需要生成二维码',
                type: 'warning'
            });
            return;
        }else {
            download(ev,url,name);
        }
    },

    // 取消
    back() {
      this.dialogVisible = true;
    },

    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {

          alert("submit!");

            if(!this.ruleForm.qrcodeUrl) {
                this.$message({
                    message: '请生成二维码再提交',
                    type: 'warning'
                });
                return;
            }else {
                let data = {
                    orgname: ruleForm.name,
                    username: ruleForm.account,
                    userpwd: ruleForm.password,
                    userchinaname: ruleForm.person,
                    userphone: ruleForm.phone,
                    ridercomcode: ruleForm.code,
                    ridercomname: ruleForm.company,
                    islocked: ruleForm.status,
                    provincecode: ruleForm.province.value,
                    provincename: ruleForm.province.label,
                    citycode: ruleForm.city.value,
                    cityname:  ruleForm.city.label,
                    balancetype: ruleForm.paymean,
                    channelprice: ruleForm.price,
                    invitecode: ruleForm.code,
                    inviteqrcodeurl: ruleForm.qrcodeUrl
                };


                axios.post(this.ajaxUrl+ '/pubsurvey/manage/rider/department/v1/generateqrcode',data)
                .then ( res => {
                    console.log(res);
                    this.$store.commit('setIsChannelList', true);
                    this.$store.commit('getsubmitCreateActive', true);
                })
                

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
</style>

