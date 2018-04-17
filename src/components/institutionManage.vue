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
</style>
<template>
  <div class="insitutionManage">
    <div class="insitutionTab">
      <span class="insitutionTitle active" v-if="insititutEditorActive">机构信息</span>
      <span class="insitutionTitle active" v-else>机构管理</span>
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
  export default {
    data() {
      return{
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
