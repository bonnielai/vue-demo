<template>
  <div class="dt-container">
    <div class="table-module">
      <table class="dt-table">
        <thead>
            <tr>
                <th ></th>
                <th v-for="key in colList" v-text="key.colname" :width="key.colwidth"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="data in lists" :key="data.id" :id="data.id?data.id:''">
                <td ><input type="checkbox"
                      :checked="checkList.indexOf(data.id)>=0" 
                      @click="checkedOne(data.id)" />
                </td>
                <td v-for="key in colList" v-text="key.specOper?formatData(key.specOper,data[key.colname]):data[key.colname]"></td>
            </tr>
        </tbody>
        <tfoot>
          <tr>
            <td class="check-col">
              <input type="checkbox"
                :checked="lists.length===checkList.length && checkList.length"
                class="checkbox" 
                @click="checkedAll"/>
            </td>
            <td :colspan="tableColumn.length">
              <a href="javascript:void(0);" @click="batchOperMethod" class="link-batch">批量操作</a>
            </td>
          </tr>
        </tfoot>
    </table>
  </div>
  <div v-if="isPaginatin" class="pagination-outer">
      <nav class="pagination-nav ">
      <div class="pg-con flex">
        <div class="data-total">
            共 <span v-text="totalcount"></span> 条
        </div>
        <ul class="pagination-page">
            <li>
                <a href="javascript:void(0)" aria-label="Next" :class="{'disabled':activeNum==1}" @click="onPrevClick()">
                    <span aria-hidden="true">‹</span>
                </a>
            </li>
            <li class="active">
                <a href="javascript:void(0)" v-text="activeNum" @click="onPageClick(activeNum)"></a>
            </li>
            <li>
                <a href="javascript:void(0)" aria-label="Next" :class="{'disabled':activeNum==pageTotal}" @click="onNextClick()">
                    <span aria-hidden="true">›</span>
                </a>
            </li>
        </ul>
        <select v-model="pageLen">
          <option v-for="pl in pageLens" :value="pl" v-text="pl" :selected="pl === pageLen ? true : false"></option>
        </select>
        <div class="page-total">
            共 <span v-text="pageTotal"></span> 页
        </div>
      </div>
    </nav>
    </div>
  </div>
</template>

<script>

export default {
  name: 'dataTable',
  data() {
    return {
      lists: [], // 表格原始数据
      checkList: [],
      isCheckedAll: false,
      pages: [1],
      activeNum: 1,
      pageLen: 5, //显示条数
      pageTotal: 1, //总页数
      totalcount: 0,
      colList: [],
      totalList: [] //表格总数据
    };
  },
  props: {
    // 是否请求服务器端数据
    isAsync: {
      type: Boolean,
      default: false
    },
    // 是否服务器分页
    searchIsPagination: {
      type: Boolean,
      default: false
    },
    // AJAX地址
    searchUrl: {
      type: String,
      default: ""
    },
    // 请求参数内容
    searchParam: {
      type: Object,
      default: function() {
        return {};
      }
    },
    //表头栏位（数组）
    tableColumn: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 表格数据（数组）
    tableData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    //是否分页
    isPaginatin: {
      type: Boolean,
      default: true
    },
    //分页每页数据条数数组
    pageLens: {
      type: Array,
      default: function() {
        return [5, 10, 20];
      }
    },
    //初始化时每页默认条数,若不在pageLens数组中，则默认选中第一个
    initPageLen: {
      type: Number,
      default: 5
    },
    //是否选择模式
    isSelectMode: {
      type: Boolean,
      default: false
    },
    //若支持选择模式，会出现批量操作按钮，触发此事件，传入批量选择的数据项id数组，和callback事件，用以刷新数据
    batchOper: {
      type: Function,
      default: function(ids, callback) {
        console.log("you will oper these ids:" + ids.toString());
        callback();
      }
    },
    //栏位的特殊控制
    options: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  /*components: {
    pagination
  },*/
  created: function() {
    let _this = this;
    console.log("created"+_this.isAsync+";"+_this.tableData.length);
    if (!_this.isAsync && _this.tableData && _this.tableData.length > 0) {
      _this.totalList = _this.tableData;
      _this.lists = _this.totalList.slice(
        0 + (_this.activeNum - 1) * _this.pageLen,
        _this.activeNum * _this.pageLen
      );
      _this.totalcount = _this.totalList.length;
      _this.pageTotal = Math.ceil(_this.totalcount / _this.pageLen);
      if (
        _this.initPageLen > 0 &&
        _this.pageLens.indexOf(_this.initPageLen) > -1
      ) {
        _this.pageLen = _this.initPageLen;
      }
    } else {
      this.getData();
    }
    var newArr = [];
    _this.tableColumn.map(function(value) {
      var newobj = {};
      newobj.colname = value;
      _this.options.forEach(function(item, index) {
        if (value == item.colname) {
          newobj.colwidth = item.colwidth;
          newobj.specOper = item.specOper;
        }
      });
      newArr.push(newobj);
    });
    _this.colList = newArr;
  },
  methods: {
    formatData(oper, val) {
      return oper(val);
    },
    refresh() {
      this.page.refresh();
    },
    checkedOne(id) {
      let index = this.checkList.indexOf(id);
      if (index > -1) {
        this.checkList.splice(index, 1);
      } else {
        this.checkList.push(id);
      }
    },
    checkedAll(e) {
      this.isCheckedAll = e.target.checked;
      if (this.isCheckedAll) {
        this.checkList = [];
        this.lists.forEach(item => {
          this.checkList.push(item.id);
        });
      } else {
        this.checkList = [];
      }
    },
    batchOperMethod() {
      var _this = this;
      var cb = function() {
        _this.refresh();
      };
      this.batchOper(_this.checkList, cb);
    },
    // 点击页码刷新数据
    onPageClick(index) {
      this.activeNum = index;
    },

    // 上一页
    onPrevClick() {
      // 当前页是否为当前最小页码
      if (this.activeNum > 1) {
        this.activeNum = this.activeNum - 1;
        this.getData();
      }
    },

    // 下一页
    onNextClick() {
      // 当前页是否为当前最大页码
      if (this.activeNum < this.pageTotal) {
        this.activeNum = this.activeNum + 1;
        this.getData();
      }
    },

    // 页码变化获取数据
    getData() {
      if (!this.isAsync) {
        let len = this.pageLen,
          pageNum = this.activeNum - 1,
          newData = [];
        for (let i = pageNum * len; i < pageNum * len + len; i++) {
          this.totalList[i] !== undefined
            ? newData.push(this.totalList[i])
            : "";
        }
        this.totalcount = this.totalList.length;
        this.pageTotal = Math.ceil(this.totalList.length / this.pageLen);
        this.lists = newData;
      } else {
        if(this.searchIsPagination && this.isPaginatin){
          this.searchParam.pageNum = this.activeNum;
          this.searchParam.pageSize = this.pageLen;
        }
        console.log("searchParam:"+JSON.stringify(this.searchParam));
        var opts = {
          method: "POST",   //请求方法
          body: JSON.stringify(this.searchParam),   //请求体
        }
        fetch(this.searchUrl, opts)
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
            console.log(data);
            this.totalcount = data.totalCount;
            //服务器不分页，前端需要分页
            if (!this.searchIsPagination && this.isPaginatin) {
              this.totalList = data.tableData;
              this.pageTotal = Math.ceil(this.totalList.length / this.pageLen);
              this.lists = this.totalList.slice(
                0 + (this.activeNum - 1) * this.pageLen,
                this.activeNum * this.pageLen
              );
            }else{
              this.lists = data.tableData;
              if(this.lists.length > this.pageLen){
                this.lists = this.lists.slice(0,this.pageLen);
              }
            }
          })
          .catch(msg => {
            console.log(msg);
          });
      }
    },

    // 刷新表格
    refresh() {
      this.checkList = [];
      this.getData();
    }
  },
  watch: {
    // 监听显示数量
    pageLen(newVal, oldVal) {
      this.pageTotal = Math.ceil(this.totalcount / this.pageLen);
      this.activeNum = 1;
      this.checkList = [];
      this.refresh();
    },

    // 监测当前页变化
    activeNum(newVal, oldVal) {
      this.refresh();
    }
  }
};
</script>
<style>
@import './datatable.css';

</style>