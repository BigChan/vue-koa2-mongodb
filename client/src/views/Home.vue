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
    <a-table></a-table>
  </div>
</template>

<script>
import { createStudent } from '@/api/student';

export default {
  name: 'Home',
  data() {
    return {
      form: this.$form.createForm(this),
    };
  },
  components: {},
  methods: {
    create() {
      this.form.validateFields({ force: true }, (error, values) => {
        if (!error) {
          createStudent({
            ...values,
            name: values.name.trim(),
          }).then(() => {
            this.$message.success('新增成功');
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  padding: 24px;
  background-color: #f0f0f0;
  height: 100vh;
  overflow: auto;
}
</style>
