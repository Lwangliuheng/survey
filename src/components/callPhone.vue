<template>
    <div class="creatCaseDialog">
      <div class="creatCaseDialogBox">
        <div class="map_wrap">
          {{phone}}
          <div>÷ÿ÷√</div>
          <div>π“∂œ</div>
        </div>
      </div>
    </div>
</template>
<script>
  import axios from 'axios'
  import Bus from "../../static/bus.js"
  export default {
    props: ["phone"],
    data() {
        return{
           name:"÷ÿ÷√"
        }
    },
    watch: {
      
    },

    created() {

    },
    mounted() {
     
    },
    methods: {
        
    },
    components: {
     
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



