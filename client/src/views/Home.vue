<template>
  <div class="home">
    <a-form :form="form">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item label="学号" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-input
              v-decorator="[
                'sid',
                {
                  rules: [
                    { required: true, message: '请输入学号' },
                    {
                      type: 'integer',
                      message: '请输入正确学号',
                      transform: (value) => {
                        return Number(value);
                      },
                    },
                  ],
                },
              ]"
              placeholder="请输入学号"
            >
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="姓名" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-input
              v-decorator="[
                'name',
                { rules: [{ required: true, message: '请输入姓名', whitespace: true }] },
              ]"
              placeholder="请输入姓名"
            >
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item>
            <a-button type="primary" @click="create">创建</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-table
      :rowKey="(record) => record._id"
      :columns="columns"
      :dataSource="list"
      :pagination="false"
    >
      <template v-for="col in ['sid', 'name']" :slot="col" slot-scope="text, record">
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="(e) => handleChange(e.target.value, record.sid, col)"
          />
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template slot="operate" slot-scope="text, record">
        <span v-if="record.editable">
          <a @click="() => save(record)" style="margin-right:8px">提交</a>
          <a-popconfirm title="确定取消吗" @confirm="() => cancel(record.sid)">
            <a>取消</a>
          </a-popconfirm>
        </span>
        <div v-else>
          <a @click="() => edit(record.sid)">编辑</a>
          <a-divider type="vertical"></a-divider>
          <a @click="deleteItem(record)">删除</a>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
import { createStudent, getStudentList, deleteStudent, updateStudent } from '@/api/student';
import moment from 'moment';

const columns = [
  {
    title: '学号',
    dataIndex: 'sid',
    width: '25%',
    scopedSlots: { customRender: 'sid' },
  },
  {
    title: '姓名',
    width: '25%',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '创建时间',
    width: '25%',
    dataIndex: 'create_time',
    customRender: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '操作',
    dataIndex: 'operate',
    scopedSlots: { customRender: 'operate' },
  },
];

export default {
  name: 'Home',
  data() {
    return {
      form: this.$form.createForm(this),
      columns,
      list: [],
      cacheData: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleChange(value, sid, column) {
      const newData = [...this.list];
      const target = newData.filter((item) => sid === item.sid)[0];
      if (target) {
        target[column] = value;
        this.list = newData;
      }
    },
    edit(sid) {
      const newData = [...this.list];
      const target = newData.filter((item) => sid === item.sid)[0];
      if (target) {
        target.editable = true;
        this.list = newData;
      }
    },
    save(info) {
      const newData = [...this.list];
      const newCacheData = [...this.cacheData];
      const target = newData.filter((item) => info.sid === item.sid)[0];
      const targetCache = newCacheData.filter((item) => info.sid === item.sid)[0];
      if (target && targetCache) {
        updateStudent(info).then(() => {
          this.$message.success('更新成功');
          delete target.editable;
          this.list = newData;
          Object.assign(targetCache, target);
          this.cacheData = newCacheData;
        });
      }
    },
    cancel(sid) {
      const newData = [...this.list];
      const target = newData.filter((item) => sid === item.sid)[0];
      if (target) {
        Object.assign(target, this.cacheData.filter((item) => sid === item.sid)[0]);
        delete target.editable;
        this.list = newData;
      }
    },
    deleteItem(info) {
      const that = this;
      this.$confirm({
        title: 'Are you sure delete this item?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          deleteStudent(info.sid).then(() => {
            that.$message.success('删除成功');
            that.getList();
          });
        },
      });
    },
    create() {
      this.form.validateFields({ force: true }, (error, values) => {
        if (!error) {
          createStudent({
            ...values,
            name: values.name.trim(),
          }).then(() => {
            this.$message.success('新增成功');
            this.form.resetFields();
            this.getList();
          });
        }
      });
    },
    getList() {
      getStudentList().then((res) => {
        this.list = res.list;
        this.cacheData = res.list;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  padding: 24px;
}
</style>
