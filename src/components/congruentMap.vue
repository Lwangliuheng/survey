<template>
  <div class="caseList">
       <div id="congruentMap"></div>
       
         <ul class="tabWrap">
           <li class="tabOne" :class="{ greenWord: insuranceTab }" @click="tabChange($event,1)">
             保险公司订单
           </li>
           <li class="tabOne" :class="{ greenWord: insuranceCancelTab }" @click="tabChange($event,2)">
             保险公司取消
           </li>
           <li class="tabOne" :class="{ greenWord: zcTab }" @click="tabChange($event,3)">
             中车订单
           </li>
           <li class="tabOne" :class="{ greenWord: zcCancelTab }" @click="tabChange($event,4)">
             中车取消
           </li>
         </ul>
       
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        insuranceTab:true,
        insuranceCancelTab:false,
        zcTab:false,
        zcCancelTab:false,
        tiggerStatus:1,
        map:'',
      }
    },
    watch: {
      
    },

    created() {
     
    },
    mounted() {

      this.$nextTick(function () {
       
        this.creadMap();
      })
       
    },
    methods: {
      //tab切换
      tabChange(e,index){
        if(this.tiggerStatus == index){
          return
        };
        var data = [];
        var myIcon = "";
        if(index == 1){
         this.tiggerStatus = 1;
         this.insuranceTab = true;
         this.insuranceCancelTab = false;
         this.zcTab = false;
         this.zcCancelTab = false;
         data = [];
         myIcon = new BMap.Icon("/static/jdy.png", new BMap.Size(42,34));
       };
       if(index == 2){
         this.tiggerStatus = 2;
         this.insuranceTab = false;
         this.insuranceCancelTab = true;
         this.zcTab = false;
         this.zcCancelTab = false;
         data = [];
         myIcon = new BMap.Icon("/static/fjcky.png", new BMap.Size(42,34));
       };
       if(index == 3){
         this.tiggerStatus = 3;
         this.insuranceTab = false;
         this.insuranceCancelTab = false;
         this.zcTab = true;
         this.zcCancelTab = false;
         data = [];
         myIcon = new BMap.Icon("/static/yh.png", new BMap.Size(32,40));
       };
       if(index == 4){
         this.tiggerStatus = 4;
         this.insuranceTab = false;
         this.insuranceCancelTab = false;        
         this.zcTab = false;
         this.zcCancelTab = true;
         data = [];
         myIcon = new BMap.Icon("/static/jdy.png", new BMap.Size(42,34));
       };
        //画聚合点
        this.drawMap(data,{icon:myIcon});
      },
      addMarkerWrap(pt,info){
        var that = this;
        var options = pt;
        var opts = {
           width : 200,     // 信息窗口宽度
           height: 93,     // 信息窗口高度
           title : "" , // 信息窗口标题
           enableMessage:true,//设置允许信息窗发送短息
           message:""
        };
      var content = '<div style="padding-top:10px"><p><span>车牌号：</span><span>'+info.cp+'</span></p><p><span >报案号：</span><span  style="margin-right:10px;">'+info.ba+'</span></p><p><span >报案时间：</span><span  style="margin-right:10px;">'+info.basj+'</span></p><p><span >完成时间：</span><span  style="margin-right:10px;">'+info.wcsj+'</span></p></div>';
        var infoWindow = new BMap.InfoWindow(content, opts); 
        return function getAttr(target){
                  that.map.openInfoWindow(infoWindow,options); //开启信息窗口
              }
      },
      //画图
      drawMap(data,iconData){
        this.map = new BMap.Map("congruentMap");
        this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);
        this.map.enableScrollWheelZoom();
        this.map.clearOverlays();

         var MAX = 100;
         var markers = [];
         var pt = null;
         var i = 0;
         for (; i < MAX; i++) {
            // var pt = new BMap.Point(transData.surveyorLng, transData.surveyorLat);
            pt = new BMap.Point(Math.random() * 40 + 85, Math.random() * 30 + 21);
            var marker = new BMap.Marker(pt,iconData);
            var info = {
               cp:4444,//车牌号
               ba:123,//报案号
               basj:2018,//报案时间
               wcsj:2109,//完成时间
            };
            marker.addEventListener("click",this.addMarkerWrap(pt,info));//注册事件
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            markers.push(marker);
         };
         //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
         var markerClusterer = new BMapLib.MarkerClusterer(this.map, {markers:markers});
      },
      //创建map
      creadMap(){
          this.map = new BMap.Map("congruentMap");
          this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);
          this.map.enableScrollWheelZoom();
          //初始化
          var myIcon = new BMap.Icon("/static/jdy.png", new BMap.Size(42,34));
          var data = [];
          this.drawMap(data,{icon:myIcon});
       }
    },
    destroyed () {
  
    },
  }

</script>
<style scoped>
.caseList{
  width: 95%;
  background: #fff;
  font-size: 15px;
  margin: 0 auto;
  position: relative;
}
#congruentMap{width:100%;height:1000px;}
.tabWrap{
  position: absolute;
  overflow: hidden;
  top:10px;
  left:20px;
  z-index: 10000;
}
.tabOne{
  width:150px;
  height:35px;
  line-height: 35px;
  text-align: center;
  float: left;
  border:1px solid #DFE4ED;
  cursor:pointer;
}
.greenWord{
    background-color:#2EAB3B;
    color:#fff;
    border:none;
}
</style>
