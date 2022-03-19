<template>
  <div id="app">
    <Header></Header>
    <Footer></Footer>
    <Side></Side>
    <Main></Main>
  </div>
</template>
<script>
import Header from './components/MusicHeader.vue'
import Footer from './components/MusicFooter.vue'
import Side from './components/MusicSide.vue'
import Main from './components/MusicMain.vue'

export default ({
  components: {
    Header,
    Footer,
    Side,
    Main
  }
})
</script>

<style lang="less" scoped>
#app{
  position: relative;
  min-height: 440px;
  min-width: 680px;
}

</style>
