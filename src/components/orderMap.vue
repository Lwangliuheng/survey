<template>
 <!--  <div class="map_wrap">
     <div class="map_content">
        564654654
     </div>
  </div> -->
    <div class="creatCaseDialog">
      <div class="creatCaseDialogBox">
        <span class="closCreatDiolag" @click="closCreatDiolag">×</span>
        <div class="map_wrap">
           <div id="allmapone">
          </div>
        </div>
      </div>
      <call-modal v-if="callPhoneStatus" v-bind:phone="callPhoneNum"></call-modal>
    </div>
</template>
<script>
  import axios from 'axios'
  import Bus from "../../static/bus.js"
  import callModal from '../components/callModal'
  export default {
    props: ['surveyNo',"lat","lng"],
    data() {
        return{
          callPhoneNum:"",//拨打电话值
          callPhoneStatus:false,
          map:"",
          time:"",//到达时间
          cahng:""//距离
        }
    },
    watch: {
      
    },

    created() {

    },
    mounted() {
      //绘制地图
      Bus.$on('gbCallPhoneTc', () => { //Hub接收事件
        this.callPhoneStatus = false;
       });
     this.getInof();
     //
    },
    methods: {
      getInof(){
         var that = this;
         var paramData = {
          "surveyNo": this.surveyNo
        }
        axios.post(this.ajaxUrl+"/published_order/v1/location",paramData)
          .then(response => {
            console.log(response.data.data,"骑手信息")
            if(response.data.rescode == 200){
               // this.open2("操作成功！");
               that.creatMap(response.data.data);
            }else{
               // this.open4("操作失败！");
            }
          }, err => {
            console.log(err);
          })
          .catch((error) => {
            console.log(error)
          });
      },
       addMarker(pt,iconData,infoData,status){

         var marker = new BMap.Marker(pt,iconData);
          if(status == 1){
              marker.addEventListener("click",this.addMarkerWrap(pt,infoData,status));//注册事件
          };
          if(status == 2){
              marker.addEventListener("click",this.addMarkerWrap(pt,infoData,status));//注册事件
          };
          if(status == 3){
              marker.addEventListener("click",this.addMarkerWrap(pt,infoData,status));//注册事件
          };
          this.map.addOverlay(marker);    //画图
       },
       addMarkerWrap(pt,infoData,status){
         var that = this;
         var options = pt;
         var data = infoData;
         var content = "";
         var opts = "";
        //打电话
         window.callPhone = function(phone){
              that.callPhoneStatus = true;
              that.callPhoneNum = phone;
                // alert(phone)
        };
        if(status == 1){
           opts = {
              width : 200,     // 信息窗口宽度
              height: 100,     // 信息窗口高度
              title : "" , // 信息窗口标题
              enableMessage:true,//设置允许信息窗发送短息
              message:""
            };
           content = '<div class="ts"><p style="line-height:25px">用户等待时间：'+data.awaitTime+'</p><p style="line-height:25px">精确位置：'+data.isUploaded+'</p><p style="line-height:25px">骑手：'+data.qs+'</p><p class="yj" style="line-height:25px">预计到达时间：'+data.time+'</p></div>';
        };
        if(status == 2){
          opts = {
              width : 200,     // 信息窗口宽度
              height: 50,     // 信息窗口高度
              title : "" , // 信息窗口标题
              enableMessage:true,//设置允许信息窗发送短息
              message:""
            };
            // content = '<div style="overflow:hidden;padding-top:20px"><p><span>距离事故地点还有:</span><span>'+data.chang+'</span></p><p onClick="callPhone('+data.surveyorPhone+')"><span >电话：</span><span  style="margin-right:10px;">'+data.surveyorPhone+'</span><img src="/src/images/phone.png" style="width:18px;height:19px"/></p></div>'
          content = '<div style="overflow:hidden;padding-top:20px"><p style="float:left"><span>距离事故地点还有</span><span>'+data.chang+'</span></p><p style="float:left;margin-left:10px" onClick="callPhone('+data.surveyorPhone+')"><img src="/src/images/phone.png" style="width:18px;height:19px"/></p></div>';
        };
        if(status == 3){
           opts = {
              width : 200,     // 信息窗口宽度
              height: 50,     // 信息窗口高度
              title : "" , // 信息窗口标题
              enableMessage:true,//设置允许信息窗发送短息
              message:""
            };
           content = '<div style="overflow:hidden;padding-top:20px"><p><span>姓名：</span><span>'+data.surveyorName+'</span></p><p onClick="callPhone('+data.surveyorPhone+')"><span >电话：</span><span  style="margin-right:10px;">'+data.surveyorPhone+'</span><img src="/src/images/phone.png" style="width:18px;height:19px"/></p></div>';
        };
        var infoWindow = new BMap.InfoWindow(content, opts); 
        return function getAttr(target){
           that.map.openInfoWindow(infoWindow,options); //开启信息窗口
          }
      
       },
      
       countTime(point1,point2,data){
            
            var time = "";
            var chang = "";
            var that = this;
            var mapRoad = "";
            var searchComplete = function (results){
              if (transit.getStatus() != BMAP_STATUS_SUCCESS){
                return ;
              }
              var plan = results.getPlan(0);
              mapRoad = plan.getRoute(0);
              
              time = plan.getDuration(true) ;  
              //alert(time)              //获取时间
              chang = plan.getDistance(true);
              //alert(chang)  
              that.time = time;
              that.chang = chang;
              that.transformData(data);
              that.userTransformData(data);           //获取距离
            };
            var transit = new BMap.DrivingRoute(this.map, {renderOptions: {map: this.map},
              onSearchComplete: searchComplete,
              onPolylinesSet: function(routes){
                var  Polyline = mapRoad.getPolyline();
                that.map.removeOverlay(Polyline);//清除路线
              },
              onMarkersSet:function(routes) {
                  that.map.removeOverlay(routes[0].marker); //删除起点
                  that.map.removeOverlay(routes[1].marker);//删除终点
              }
            });
            transit.search(point1 , point2);
              
              
            return {
              time:time,
              chang:chang
            }
       }, 
        //棋手
       transformData(transData){
        var that = this;
        //查勘员
        // transData.surveyorLat = 39.990;
        // transData.surveyorLng = 116.700;
        //普通查勘元
        //transData.surveyorList = [{lng:116.600,lat:39.909},{lng:116.800,lat:39.909},{lng:116.750,lat:39.909}]
        // var arr = [];
        // var obj = {};
        //接单查勘元
        if(transData.surveyorLat){
           var obj = {};
           obj.surveyorPhone = transData.surveyorPhone;
           obj.surveyorName = transData.surveyorName;
           obj.chang = this.chang ? this.chang:"";
          //alert(obj.chang)
           var pt = new BMap.Point(transData.surveyorLng, transData.surveyorLat);
           var myIcon = new BMap.Icon("/static/jdy.png", new BMap.Size(42,34));
           //画图
           this.addMarker(pt,{icon:myIcon},obj,2);  
           
        };
        transData.surveyorList.map(function(item,index){

           var obj = {};
           obj.surveyorStatue = false;
           obj.surveyorPhone = item.surveyorPhone;
           obj.surveyorName = item.surveyorName;
           obj.lat = item.lat;
           obj.lng = item.lng;
           var pt = new BMap.Point(item.lng, item.lat);
           var myIcon = new BMap.Icon("/static/fjcky.png", new BMap.Size(39,38));
           //画图
           that.addMarker(pt,{icon:myIcon},obj,3);  
     
           
        })
        

       },
       getAwaitTime(completeTime){  
            var stime = Date.parse(new Date(completeTime));
            var etime = Date.parse(new Date());  
            var usedTime = etime - stime;  //两个时间戳相差的毫秒数  
            var days=Math.floor(usedTime/(24*3600*1000));  
            //计算出小时数  
            var leave1=usedTime%(24*3600*1000);    //计算天数后剩余的毫秒数  
            var hours=Math.floor(leave1/(3600*1000));  
            //计算相差分钟数  
            var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数  
            var minutes=Math.floor(leave2/(60*1000));  
            var time = days + "天"+hours+"时"+minutes+"分";  
            return time;  
        },  
       //用户
       userTransformData(userData){
           var obj = {};
           var awaitTime = this.getAwaitTime(userData.createTime)
          if(userData.isUploaded == 1){
             obj = {
                awaitTime:awaitTime,
                lat : userData.accidentLat,
                lng : userData.accidentLng,
                isUploaded:"已上传",
                time:this.time,
                qs:userData.surveyorName ? userData.surveyorName :""
             }
          }else{
             obj = {
                awaitTime:awaitTime,
                lat : this.lat,
                lng : this.lng,
                isUploaded:"未上传",
                time:this.time,
                qs:userData.surveyorName ? userData.surveyorName :""
             }
          };
           var pt = new BMap.Point(obj.lng, obj.lat);
           var myIcon = new BMap.Icon("/static/yh.png", new BMap.Size(32,40));
           this.map.centerAndZoom(pt, 12);
           //画图
           this.addMarker(pt,{icon:myIcon},obj,1);  
          
       },
        creatMap(data){
          // 百度地图API功能
            this.map = new BMap.Map("allmapone");
            var point = new BMap.Point(116.404, 39.915);
            this.map.centerAndZoom(point, 12);
            this.map.enableScrollWheelZoom();  
            //改造数据
           // data.surveyorLat = 39.990;
           // data.surveyorLng = 116.700;
           
           if(data.surveyorLng){
              var point1 = new BMap.Point(data.surveyorLng, data.surveyorLat);
              if(data.isUploaded == 1){
                 var point2 = new BMap.Point(data.accidentLng, data.accidentLat);
              }else{
                 var point2 = new BMap.Point(this.lng, this.lat);
              }
              this.countTime(point1,point2,data);
           }else{
              this.transformData(data);
              this.userTransformData(data);  
           }
           //计算时间
           


           // this.transformData(data);
           // this.userTransformData(data);
           // arr.push(obj);
           // console.log(arr,65465465465465454);
        
            // var pt = new BMap.Point(116.417, 39.909);
            // var myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(200,100));
            // this.addMarker(pt,{icon:myIcon},1,{time:"30",statue:"已上传",name:"wang",yjtime:"5",jl:700});  // 创建标注
             

            // var pt1 = new BMap.Point(116.4600, 39.9091);
            // var myIcon1 = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(200,100));
            // this.addMarker(pt1,{icon:myIcon1},2,{time:"30",statue:"已上传",name:"liu",yjtime:"10",jl:600});
        },
        closCreatDiolag(){
           Bus.$emit("orderMapStatusChange");
           $(".creatCaseDialog").addClass('hide');
        }
        
    },
    components: {
       callModal
    },
    computed: {
    
  }
}
</script>
<style scoped>

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
     width: 100%;
  }
  #allmapone {
     width: 100%;
     height:500px;
     overflow: hidden;
     margin:0;
    
   }
  .creatCaseDialogBox{
    width: 60%;
    margin: 3vh auto;
    background: #fff;
    padding: 20px;
    position: relative;
    min-height: 620px;
  }
 .closCreatDiolag{
    font-size: 42px;
    right: 15px;
    top: 0;
    float:right;
  }
  .ts_word{
    line-height: 100px;
  }
</style>
