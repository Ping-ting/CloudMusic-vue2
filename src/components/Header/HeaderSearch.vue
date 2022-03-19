<template>
  <div id="header-search-container">

    <span class="el-icon-myMusicbg-left my-flag"></span>
    <span class="el-icon-myMusicbg-right my-flag"></span>

    <div id="search-outer">
      <el-input
        size="mini"
        placeholder="搜索喜欢的音乐"
        prefix-icon="el-icon-search"
        v-model="input2"
        >
      </el-input>
    </div>
    <el-button class="selfbutton" type="success" icon="el-icon-microphone" size="mini" circle ></el-button>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.selfbutton{
  background-color: rgba(85, 85, 85, 0.2);
  color: #cacaca;
  border: none;
  font-size: 16px;
}
.my-flag{
  font-size: 22px;
  color: rgba(85, 85, 85, 0.2);
  cursor: pointer;
  margin-right: 10px;
}
#search-outer{
  display: inline-block;
  width: 60%;
  margin-right: 10px;
  position: relative;
  top: -5%;
  line-height: 60px;
}
#header-search-container{
  width: 350px;
  height: 100%;
  // background-color: rgb(236, 189, 150);
  position: absolute;
  left: 230px;
}
</style>
