<template>
<div class="child-institution-list">
    <el-form :inline="true" :model="formInline" style="width:90%;overflow:hidden;margin:15px auto;">
        <el-form-item style="float:right;margin-bottom: 5px;">
            <el-button type="success" @click="onAdd" class="create">新增</el-button>
        </el-form-item>
        <!-- <el-form-item label="机构名称">
            <el-input v-model="formInline.company" placeholder="请输入机构名称"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
            <el-input v-model="formInline.person" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item label="是否有效">
        <el-radio v-model="radio" label="1">备选项</el-radio>
        <el-radio v-model="radio" label="2">备选项</el-radio>
        </el-form-item>
        <el-form-item>
            <el-button type="success" @click="onSearch">查询</el-button>
        </el-form-item> -->
    </el-form>
    <!-- 列表 -->
    <el-table
        :data="tableData"
        border
        style="width: 90%;margin-top:10px;margin: 15px auto;"
        class="channel-list">
        <el-table-column
            label="序号"
            type="index"
            width="50">
        </el-table-column>
        <el-table-column
            prop="orgname"
            label="机构名称">
        </el-table-column>
        <el-table-column
            prop="userchinaname"
            label="联系人">
        </el-table-column>
        <el-table-column
            prop="userphone"
            label="联系人电话">
        </el-table-column>
        <el-table-column
            prop="ridercomname"
            label="所属公司"
            width="200">
        </el-table-column>
        <el-table-column
            prop="provincename"
            label="所在省份"
            width="90">
        </el-table-column>
        <el-table-column
            prop="cityname"
            label="所在城市"
            width="90">
        </el-table-column>
        <el-table-column
            prop="islocked"
            label="当前状态"
            width="90">
        </el-table-column>
        <el-table-column
            label="操作"
            width="90">
            <template slot-scope="scope">
                <el-button style="font-size:16px;" @click="handleClick(scope.row)" type="text" class="el-icon-edit-outline"></el-button>
            </template>
        </el-table-column>
    </el-table>
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next"
        :total="total">
        </el-pagination>
    </div>
</template>

<script>
    import axios from 'axios'
export default {
  data() {
    return {
      formInline: {
        company: "",
        person: ""
      },
      radio: "1", // 是否有效
      currentPage: 1,
      pagesize: 10,
      total: 0,
      ajaxUrl: '/boot-pub-survey-manage',
      tableData: []
    };
  },

  mounted() {
    
      this.turnPage();
  },

  methods: {
    // 查询
    onSearch() {},
    // 新增
    onAdd() {
        this.$store.commit('setIsChannelList', false);
        localStorage.removeItem('institutionInfo');
    },

    handleClick(row) {
      console.log(row);
       localStorage.institutionInfo = JSON.stringify(row);
        this.$store.commit('setIsChannelList', false);       
    },

    // 翻页函数
    turnPage () {
        axios.post(this.ajaxUrl+ '/pubsurvey/manage/rider/department/v1/orglist',{
            'pageno': this.currentPage,
            'pagesize': this.pagesize
        }).then ( res => {
            if(res.data.rescode = 200) {
                this.tableData = res.data.data.departs;
                this.total = res.data.data.totalcount;
                this.tableData.forEach(item => {
                    item.islocked = item.islocked == '0' ? '正常' : '锁定';
                }); 
            }else {
                this.$message.error('获取列表失败:',res.data.resdes);         
            }
        })
    },
    // 翻页
    handleCurrentChange (val) {
        this.currentPage = val;
        this.turnPage();
    },

  }
};
</script>

<style scoped>
.child-institution-list {
  background: #fff;
  margin: 15px auto;
  width: 80%;
  overflow-y: scroll;
  height: 82vh;
  /* padding: 20px; */
}
</style>

