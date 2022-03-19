<template>
  <div id="header-container">
    <HeaderLogo></HeaderLogo>
    <HeaderSearch></HeaderSearch>
    <HeaderRight></HeaderRight>
  </div>
</template>

<script>
import HeaderLogo from './Header/HeaderLogo.vue'
import HeaderSearch from './Header/HeaderSearch.vue'
import HeaderRight from './Header/HeaderRight.vue'

export default {
  components: {
    HeaderLogo,
    HeaderSearch,
    HeaderRight
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
#header-container{
  height: 60px;
  width: 100%;
  background-color: #21a675;
  position: relative;
}
</style>
