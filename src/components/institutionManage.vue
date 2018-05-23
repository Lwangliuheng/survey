<style scoped>
  .insitutionManage{
    background: #fff;
    margin: 15px auto;
    width: 80%;
    overflow-y: scroll;
    height: 82vh;
    padding-bottom: 20px;
  }
  .insitutionTab{
    width: 86%;
    margin: 15px auto;
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
  .insitutionManage .active{
    color: #2EAB3B;
  }
  .insitutionManage .insitutionContent{
    margin-left: 10px;
  }
  .insitutionManage .lineBox{
    width: 90%;
    height: 1px;
    background: #DFE4ED;
    margin-top: -1px;
    margin-left: 100px;
  }
  .search_wrap{
    width:200px;
    float:right;
    border:1px solid #DFE4ED;
  }
  .tab_wrap{
    float:left;
  }
  .header_warp{
     overflow: hidden;
  }
  .adressInput{
    height:36px;
    margin-right:4px;
  }
  .adressInputTu{
    display:inline-block;
    width:28px;
    height:28px;
  }
</style>
<template>
  <div class="insitutionManage">
    <div class="insitutionTab">
       <div class="header_warp">
           <div class="tab_wrap">
              <span class="insitutionTitle active" v-if="insititutEditorActive">机构信息</span>
              <span class="insitutionTitle active" v-else>机构管理</span>
           </div>
            
            <div class="search_wrap">
             <input class="adressInput" v-model="name" style="width: 166px;" type="text" placeholder="请输入姓名"/><i  class="el-icon-search adressInputTu" @click="searchOrganization"></i>
            </div>
       </div>
            
      <div class="lineBox"></div>
    </div>
    <div class="insitutionContent">
      <insitution-Editor v-if="insititutEditorActive"></insitution-Editor>
      <insitution-list  v-else></insitution-list>
    </div>
  </div>
</template>
<script>
  import insitutionList from '@/components/insitutionList'
  import insitutionEditor from '@/components/insitutionEditor'
  import Bus from '../../static/bus.js'
  export default {
    data() {
      return{
        name:"",
        insititutEditorActive: '',
      }
    },
    watch: {
      getUserIcons(val) {
        this.insititutEditorActive = val;
        console.log(this.insititutEditorActive)
      }
    },
    mounted() {
      this.insititutEditorActive = this.$store.state.insititutEditorActive;
    },
    methods: {
      searchOrganization(event){
           console.log(this.name);
           if(this.name.length > 0){
             Bus.$emit('busOrganizationManagement',this.name);  
           }else{
                this.$message({
                   showClose: true,
                   message: '请输入姓名',
                   type: 'error'
                });
           }
           
      },
    },
    components: {
      insitutionList,
      insitutionEditor,
    },
    computed: {
      getUserIcons(){
        return this.$store.state.insititutEditorActive;
      }
    }

  }

</script>
