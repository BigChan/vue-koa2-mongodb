import Vue from 'vue';
import {
  Button,
  Table,
  Form,
  Input,
  Icon,
  Row,
  Col,
  message,
  Modal,
  Divider,
  Popconfirm,
} from 'ant-design-vue';

Vue.use(Popconfirm);
Vue.use(Button);
Vue.use(Table);
Vue.use(Form);
Vue.use(Input);
Vue.use(Divider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);

Vue.prototype.$message = message;
Vue.prototype.$confirm = Modal.confirm;
