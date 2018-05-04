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
.ruleForm .el-input__inner {
   border: 1px solid #dcdfe6; 
   padding: 0 10px;
}
.ruleForm {
  width: 95%;
  margin: 15px auto;
  overflow: hidden;
}
.ruleForm .el-input__suffix {
  top: 0;
  display: none;
}
.ruleForm .el-form-item {
  width: 33.33%;
  float: left;
  position: relative;
}
.ruleForm .el-icon-view {
  position: absolute;
  top: 50%;
  right: 10px;
  font-size: 20px;
  transform: translateY(-50%);
  cursor: pointer;
}
.ruleForm .el-button  {
  padding: 12px;
}
.ruleForm .el-button--success span{
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
.ruleForm .el-input--suffix .el-input__inner {
  margin: 0;
  height: 40px;
  border-color: #dcdfe6;
}
.ruleForm .el-select {
  margin: 0;
  width: 100%;
}
.ruleForm .el-radio__input.is-checked .el-radio__inner {
    background-color: #67c23a;
    border-color: #67c23a;
}
.ruleForm .el-radio__input.is-checked+.el-radio__label {
  color: #333;
}
.ruleForm .el-radio+.el-radio {
  margin-left: 10px;
}
.ruleForm .el-radio__label {
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
.child-institution-list .create span{
  color: #fff;
}
.el-table td, .el-table th.is-leaf {
  border-bottom: 0;
}
.el-table--border, .el-table--group {
  border: none;
  border-left: 1px solid #ebeef5;
}
.el-table thead th{
  background: #ECF8F5;
  padding: 2px 0;
}
.el-table thead th div {
  color: #2EAB3B;
  font-weight: bold;
}
</style>
