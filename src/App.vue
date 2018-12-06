<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isAsync: true,
        searchIsPagination: false,
        searchUrl: 'http://localhost:8899/',
        searchParam: {},
        isPaginatin: true,
        //表格的头部部分数据
        tableColumn: ["id", "name", "department", "no", "tel", "sex"],
        //表格的主体部分数据
        tableData: [
          {id: 1,name: "luozhluozhluozhluozhluozhluozhluozhluozhluozhluozhluozhluozhluozh",department: "caiwucaiwucaiwucaiwucaiwucaiwucaiwucaiwucaiwu",no: "001",tel: "123",sex: "0"},
          {id: 2,name: "luozh",department: "caiwu",no: "001",tel: "123",sex: "0"},
          {id: 3,name: "luozh",department: "caiwu",no: "001",tel: "123",sex: "0"},
          {id: 4,name: "luozh",department: "caiwu",no: "001",tel: "123",sex: "0"},
          {id: 5,name: "luozh",department: "caiwu",no: "001",tel: "123",sex: "0"},
          {id: 6,name: "luozh",department: "caiwu",no: "001",tel: "123",sex: "0"},
          {id: 7,name: "luozh",department: "caiwu",no: "001",tel: "123",sex: "0"},
          {id: 8,name: "luozh",department: "caiwucaiwucaiwucaiwucaiwucaiwucaiwucaiwucaiwu ",no: "001",tel: "123",sex: "0"}
        ],
        options: [
          {
            colname: "sex",
            colwidth: "100px",
            specOper: function(val) {
              return val == "0" ? "女" : "男";
            }
          },
          {
            colname: "name",
            colwidth: "200px"
          },
          {colname: "tel",
            colwidth: "500px"},
          {colname: "no",
            colwidth: "500px"}
        ]

        
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
