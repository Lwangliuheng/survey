<template>
  <div class="caseManage">
    <div class="caseTab">
      <span class="caseJiankong " v-bind:class="{ active: jianKongActive }" @click="tabChange($event,1)">案件监控</span>
      <span class="allCase" v-bind:class="{ active: allCaseActive }" @click="tabChange($event,2)">全部案件</span>
      <span class="allCase" v-bind:class="{ active: allsendOrders }" @click="tabChange($event,3)" v-if="zcState">实时监控</span>
      <div class="lineBox"></div>
    </div>
    <div class="manageContent">
      <case-monitor v-if="jianKongActive" ></case-monitor>
      <case-list v-if="allCaseActive"></case-list>
      <order-list v-if="allsendOrders"></order-list>
    </div>
  </div>
</template>
<script>
  import caseList from '@/components/caseList'
  import orderList from '@/components/orderList'
  import caseMonitor from '@/components/caseMonitor'
  export default {
    props: ['zcState'],
    data() {
      return{
        jianKongActive: true,
        allCaseActive: false,
        allsendOrders:false
      }
    },
    methods: {
      tabChange(event,index){
       if(index == 1){
         this.jianKongActive = true;
         this.allCaseActive = false;
         this.allsendOrders = false;
       };
       if(index == 2){
         this.jianKongActive = false;
         this.allCaseActive = true;
         this.allsendOrders = false;
       };
       if(index == 3){
         this.jianKongActive = false;
         this.allCaseActive = false;
         this.allsendOrders = true;
       };
        // var attributes = event.target.attributes;
        // for(var i = 0;i< attributes.length;i++){
        //   if(i == 1){
        //     if(attributes[i].nodeValue.indexOf('caseJiankong') > -1){
        //       attributes[i].nodeValue = 'caseJiankong active';
        //       $(".allCase").attr("class","allCase");
        //       this.jianKongActive = true;
        //       this.allCaseActive = false;
        //     }else  if(event.target.attributes[i].nodeValue.indexOf('allCase') > -1){
        //       $(".caseJiankong").attr("class","caseJiankong");
        //       attributes[i].nodeValue = 'allCase active';
        //       this.jianKongActive = false;
        //       this.allCaseActive = true;
        //     }
        //   }
        // }
      }
    },
    components: {
      caseList,
      orderList,
      caseMonitor,
    },
  }

</script>
<style scoped>
  .caseManage{
    background: #fff;
    margin: 15px auto;
    width: 80%;
    overflow-y: scroll;
    height: 82vh;
    padding-bottom: 20px;
  }
  .caseTab{
    width: 86%;
    margin: 15px auto;
  }
  .caseJiankong, .allCase{
    cursor: pointer;
    display: inline-block;
    height: 45px;
    width: 100px;
    background: #fff;
    color: #232323;
    line-height: 45px;
    text-align: center;
    border: 1px solid #DFE4ED;
    font-size: 15px;
  }
  .caseJiankong{
    margin-right: -5px;
    border-right: none;
  }
  .active{
    color: #2EAB3B;
    border-bottom: none;
  }
  .manageContent{
    width: 95%;
    margin: 0 auto;
  }
  .lineBox{
    width: 90%;
    height: 1px;
    background: #DFE4ED;
    margin-top: -1px;
    margin-left: 100px;
  }
</style>
