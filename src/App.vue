<template>
  <div id="app">

  <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
.el-input__inner {
   border: 1px solid #dcdfe6; 
}
.ruleForm {
  width: 100%;
  overflow: hidden;
}
.ruleForm .el-input__suffix {
  top: 0;
}
.ruleForm .el-form-item {
  width: 33.33%;
  float: left;
}
.ruleForm .el-button  {
  padding: 12px;
}
.el-button--success span{
  color: #fff;
}
.form-btn .el-form-item__content {
  margin: 0;
}
.form-btn button {
  margin: 10px 20px;
}
.form-btn .el-button {
  padding: 12px 30px;
  font-size: 16px;
}
.el-input--suffix .el-input__inner {
  margin: 0;
  height: 40px;
  border-color: #dcdfe6;
}
.el-select {
  margin: 0;
  width: 100%;
}
.el-radio__input.is-checked .el-radio__inner {
    background-color: #67c23a;
    border-color: #67c23a;
}
.el-radio__input.is-checked+.el-radio__label {
  color: #333;
}
.el-radio+.el-radio {
  margin-left: 10px;
}
.el-radio__label {
  padding-left: 5px;
}
.el-table__header {
  border: none;
}
.el-table th,
.el-table td {
  border-left: 0;
  text-align: center;
}
.el-table td {
  padding: 0;
}
.el-button--text span {
      color: #409EFF;
}
</style>
