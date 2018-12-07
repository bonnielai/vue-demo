<template>
  <div class="dt-outer">
    <data-table :table-style="tableStyle"
                :is-async="isAsync" 
                :search-is-pagination="searchIsPagination"
                :search-url="searchUrl"
                :search-param="searchParam"
                :table-column="tableColumn" 
                :table-data="tableData" 
                :is-paginatin="isPaginatin"
                :page-lens="pageLens"
                :init-page-len="initPageLen"
                :is-select-mode="isSelectMode"
                :batch-oper="batchOper"
                :options="options">

    </data-table>
  </div>
</template>
<script>
import DataTable from "./datatable/DataTable.vue";
export default {
  name: "TestDataTable",
  data() {
    return {
      tableStyle: {width:'1000px',height:'400px'},
      isAsync: false,
      searchIsPagination: false,
      searchUrl: "http://localhost:8899/",
      searchParam: {},
      //表格的头部部分数据
      tableColumn: ["id", "name", "department", "no",  "remark"],
      //表格的主体部分数据
      tableData: [
        {
          id: 1,
          name:
            "luozhluozhluozhluozhluozhluozhluozhluozhluozhluozhluozhluozhluozh",
          department: "caiwucaiwucaiwucaiwucaiwucaiwucaiwucaiwucaiwu",
          no: "001",
          tel: "123",
          sex: "0",
          mark: "98.1098",
          addr: "深圳市南山区深南大道",
          remark:"忘打卡3次"
        },
        {
          id: 2,
          name: "luozh",
          department: "caiwu",
          no: "001",
          tel: "123",
          sex: "0",
          mark: "88"
        },
        {
          id: 3,
          name: "luozh",
          department: "caiwu",
          no: "001",
          tel: "123",
          sex: "0",
          mark: "81.9"
        },
        {
          id: 4,
          name: "luozh",
          department: "caiwu",
          no: "001",
          tel: "123",
          sex: "0"
        },
        {
          id: 5,
          name: "luozh",
          department: "caiwu",
          no: "001",
          tel: "123",
          sex: "0"
        },
        {
          id: 6,
          name: "luozh",
          department: "caiwu",
          no: "001",
          tel: "123",
          sex: "0"
        },
        {
          id: 7,
          name: "luozh",
          department: "caiwu",
          no: "001",
          tel: "123",
          sex: "0"
        },
        {
          id: 8,
          name: "luozh",
          department: "caiwucaiwucaiwucaiwucaiwucaiwucaiwucaiwucaiwu ",
          no: "001",
          tel: "123",
          sex: "0"
        },
        {
          id: 9,
          name: "luozh",
          department: "caiwucaiwucaiwucaiwucaiwucaiwucaiwucaiwucaiwu ",
          no: "001",
          tel: "123",
          sex: "0"
        },
        {
          id: 10,
          name: "luozh",
          department: "caiwucaiwucaiwucaiwucaiwucaiwucaiwucaiwucaiwu ",
          no: "001",
          tel: "123",
          sex: "0"
        },
        {
          id: 11,
          name: "luozh",
          department: "caiwucaiwucaiwucaiwucaiwucaiwucaiwucaiwucaiwu ",
          no: "001",
          tel: "123",
          sex: "0"
        },
        {
          id: 12,
          name: "luozh",
          department: "caiwucaiwucaiwucaiwucaiwucaiwucaiwucaiwucaiwu ",
          no: "001",
          tel: "123",
          sex: "0"
        },
        {
          id: 13,
          name: "luozh",
          department: "caiwucaiwucaiwucaiwucaiwucaiwucaiwucaiwucaiwu ",
          no: "001",
          tel: "123",
          sex: "0"
        }
      ],
      isPaginatin: true,
      pageLens: [],
      initPageLen: 10,
      isSelectMode: true,
      batchOper: {
        operName: '批量删除',
        operFun: function(ids, callback) {
          alert("you will delete these ids:" + ids.toString());
          var opts = {
          method: "POST", //请求方法
          body: ids.join(',') //请求体
        };
          fetch('http://localhost:8899/delete', opts)
          .then(res => {
            console.log(res);
            try {
              if (!res.ok) {
                console.log("请求失败" + statusText);
                return;
              }
              return res.json();
            } catch (e) {
              console.log("无法解析的返回值");
            }
          })
          .then(data => {
            alert(data.msg);
          })
          .catch(msg => {
            console.log(msg);
          });
          callback();
        }
      },
      options: [
        {
          colname: "sex",
          colwidth: "100px",
          alias: "性别",
          specOper: function(val) {
            return val == "0" ? "女" : "男";
          }
        },
        {
          colname: "name",
          colwidth: "200px"
        },
        { colname: "tel", colwidth: "500px" },
        { colname: "no", colwidth: "500px" },
        { colname: "name", colwidth: "500px" },
        { colname: "department", colwidth: "500px" },
        { colname: "mark", 
          colwidth: "200px",
          specOper: function(val) {
            var result = val;
            if(!isNaN(val)){
              result = parseFloat(val).toFixed(2)
            }
            return result;
          } 
        },
        { colname: "addr", colwidth: "500px" }
      ]
    };
  },
  components: {
    DataTable: DataTable
  }
};
</script>
<style>
.dt-outer {
  width: 80%;
  margin: 50px auto 0;
}
</style>
