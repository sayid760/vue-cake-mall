<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@import './assets/css/reset.css';	
@import './assets/css/base.less'; 
#app {
  font-family:'Microsoft Yahei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
}
.loading{
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 0.24rem;
	span{
		margin-left: 2%;
		color: #666;
	}
}
</style>
