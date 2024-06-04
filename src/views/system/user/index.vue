<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--部门数据-->
      <el-col :span="4" :xs="24">
        <div class="head-container">
          <el-input
              v-model="deptName"
              :placeholder="t('user.departmentName')"
              clearable
              prefix-icon="Search"
              style="margin-bottom: 20px"
          />
        </div>
        <div class="head-container">
          <el-tree
              :data="deptOptions"
              :props="{ label: 'label', children: 'children' }"
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              ref="deptTreeRef"
              node-key="id"
              highlight-current
              default-expand-all
              @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <!--用户数据-->
      <el-col :span="20" :xs="24">
        <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
          <el-row :gutter="20">
            <el-col :lg="5" :sm="12" :md="12" :xs="24">
              <el-form-item :label="t('user.userName')" prop="userName">
                <el-input
                    v-model="queryParams.userName"
                    :placeholder="t('input') + t('user.userName')"
                    clearable
                    style="width: 240px"
                    @keyup.enter="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :sm="12" :md="12" :xs="24">
              <el-form-item :label="t('user.phone')" prop="phonenumber">
                <el-input
                    v-model="queryParams.phonenumber"
                    :placeholder="t('input') + t('user.phone')"
                    clearable
                    style="width: 240px"
                    @keyup.enter="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="5" :sm="12" :md="12" :xs="24">
              <el-form-item :label="t('user.status')" prop="status">
                <el-select
                    v-model="queryParams.status"
                    :placeholder="t('user.userStatus')"
                    clearable
                >
                  <el-option
                      v-for="dict in sys_normal_disable"
                      :key="dict.value"
                      :label="dict.label"
                      :value="dict.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :sm="12" :md="12" :xs="24">
              <el-form-item :label="t('createTime')" style="width: 308px;">
                <el-date-picker
                    v-model="dateRange"
                    value-format="YYYY-MM-DD"
                    type="daterange"
                    range-separator="-"
                    :start-placeholder="t('searchTab.startTime')"
                    :end-placeholder="t('searchTab.endTime')"
                ></el-date-picker>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="20">
            <el-col :lg="5" :sm="12" :md="12" :xs="24">
              <el-form-item>
                <el-button type="primary" icon="Search" @click="handleQuery">{{ t('query') }}</el-button>
                <el-button icon="Refresh" @click="resetQuery">{{ t('reset') }}</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
                type="primary"
                plain
                icon="Plus"
                @click="handleAdd"
                v-hasPermi="['system:user:add']"
            >{{ t('add') }}
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
                type="success"
                plain
                icon="Edit"
                :disabled="single"
                @click="handleUpdate"
                v-hasPermi="['system:user:edit']"
            >{{ t('edit') }}
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
                type="danger"
                plain
                icon="Delete"
                :disabled="multiple"
                @click="handleDelete"
                v-hasPermi="['system:user:remove']"
            >{{ t('delete') }}
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
                type="info"
                plain
                icon="Upload"
                @click="handleImport"
                v-hasPermi="['system:user:import']"
            >{{ t('import') }}
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
                type="warning"
                plain
                icon="Download"
                @click="handleExport"
                class="btn-export"
                v-hasPermi="['system:user:export']"
            >{{ t('export') }}
            </el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList" row-key="userId"
                         :columns="columns"></right-toolbar>
        </el-row>

        <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center"/>
          <el-table-column :label="t('user.userId')" align="center" key="userId" prop="userId"
                           v-if="columns[0].visible"/>
          <el-table-column :label="t('user.userName')" align="center" key="userName" prop="userName"
                           v-if="columns[1].visible" :show-overflow-tooltip="true"/>
          <el-table-column :label="t('user.nickName')" align="center" key="nickName" prop="nickName"
                           v-if="columns[2].visible" :show-overflow-tooltip="true"/>
          <el-table-column :label="t('user.departmentName')" align="center" key="deptName" prop="dept.deptName"
                           v-if="columns[3].visible" :show-overflow-tooltip="true"/>
          <el-table-column :label="t('user.phonenumber')" align="center" key="phonenumber" prop="phonenumber"
                           v-if="columns[4].visible" width="120"/>
          <el-table-column :label="t('user.status')" align="center" key="status" v-if="columns[5].visible">
            <template #default="scope">
              <el-switch
                  v-model="scope.row.status"
                  active-value="0"
                  inactive-value="1"
                  @change="handleStatusChange(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column :label="t('user.createTime')" align="center" prop="createTime" v-if="columns[6].visible"
                           width="160">
            <template #default="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="t('operate')" align="center" width="150" class-name="small-padding fixed-width">
            <template #default="scope">
              <el-tooltip :content="t('edit')" placement="top" v-if="scope.row.userId !== 1">
                <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
                           v-hasPermi="['system:user:edit']"></el-button>
              </el-tooltip>
              <el-tooltip :content="t('delete')" placement="top" v-if="scope.row.userId !== 1">
                <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
                           v-hasPermi="['system:user:remove']"></el-button>
              </el-tooltip>
              <el-tooltip :content="t('user.resetPwd')" placement="top" v-if="scope.row.userId !== 1">
                <el-button link type="primary" icon="Key" @click="handleResetPwd(scope.row)"
                           v-hasPermi="['system:user:resetPwd']"></el-button>
              </el-tooltip>
              <el-tooltip :content="t('user.assignRoles')" placement="top" v-if="scope.row.userId !== 1">
                <el-button link type="primary" icon="CircleCheck" @click="handleAuthRole(scope.row)"
                           v-hasPermi="['system:user:edit']"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <pagination
            v-show="total > 0"
            :total="total"
            v-model:page="queryParams.pageNum"
            v-model:limit="queryParams.pageSize"
            @pagination="getList"
        />
      </el-col>
    </el-row>

    <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="title" v-model="open" width="40%" append-to-body>
      <el-form :model="form" :rules="rules" ref="userRef">
        <el-row>
          <el-col :lg="12" :sm="12" :md="12" :xs="24">
            <el-form-item :label="t('user.userName')" prop="nickName">
              <el-input v-model="form.nickName" :placeholder="t('input') + t('user.userName')" maxlength="30"/>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :sm="12" :md="12" :xs="24">
            <el-form-item :label="t('user.company')" prop="companyId">
              <el-select v-model="form.companyId" clearable>
                <el-option
                    v-for="item in companyOptions"
                    :key="item.id"
                    :label="item.companyShortName"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="t('user.belongingDepartment')" prop="deptId">
              <el-tree-select
                  v-model="form.deptId"
                  :data="deptOptions"
                  :props="{ value: 'id', label: 'label', children: 'children' }"
                  value-key="id"
                  :placeholder="t('choose') + t('user.belongingDepartment')"
                  check-strictly
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="t('user.phonenumber')" prop="phonenumber">
              <el-input v-model="form.phonenumber" :placeholder="t('input') + t('user.phonenumber')" maxlength="11"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="t('user.email')" prop="email">
              <el-input v-model="form.email" :placeholder="t('input') + t('user.email')" maxlength="50"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item v-if="form.userId == undefined" :label="t('user.userName')" prop="userName">
              <el-input v-model="form.userName" :placeholder="t('input') + t('user.userName')" maxlength="30"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.userId == undefined" :label="t('user.password')" prop="password">
              <el-input v-model="form.password" :placeholder="t('input') + t('user.password')" type="password"
                        maxlength="20" show-password/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="t('user.sex')">
              <el-select v-model="form.sex" :placeholder="t('choose')">
                <el-option
                    v-for="dict in sys_user_sex"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="t('user.status')">
              <el-radio-group v-model="form.status">
                <el-radio
                    v-for="dict in sys_normal_disable"
                    :key="dict.value"
                    :label="dict.value"
                >{{ dict.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="t('user.post')">
              <el-select v-model="form.postIds" multiple :placeholder="t('choose')">
                <el-option
                    v-for="item in postOptions"
                    :key="item.postId"
                    :label="item.postName"
                    :value="item.postId"
                    :disabled="item.status == 1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="t('user.role')">
              <el-select v-model="form.roleIds" multiple :placeholder="t('choose')">
                <el-option
                    v-for="item in roleOptions"
                    :key="item.roleId"
                    :label="item.roleName"
                    :value="item.roleId"
                    :disabled="item.status == 1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="t('remark')">
              <el-input v-model="form.remark" type="textarea" :placeholder="t('input') + t('remark')"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" class="btn-confirm" @click="submitForm">{{ t('confirm') }}</el-button>
          <el-button @click="cancel" class="btn-cancel">{{ t('cancel') }}</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" v-model="upload.open" width="400px" append-to-body>
      <el-upload
          ref="uploadRef"
          :limit="1"
          accept=".xlsx, .xls"
          :headers="upload.headers"
          :action="upload.url + '?updateSupport=' + upload.updateSupport"
          :disabled="upload.isUploading"
          :on-progress="handleFileUploadProgress"
          :on-success="handleFileSuccess"
          :auto-upload="false"
          drag
      >
        <el-icon class="el-icon--upload">
          <upload-filled/>
        </el-icon>
        <div class="el-upload__text">{{ t('uploadInfo.text1') }}<em>{{ t('uploadInfo.text2') }}</em></div>
        <template #tip>
          <div class="el-upload__tip text-center">
            <div class="el-upload__tip">
              <el-checkbox v-model="upload.updateSupport"/>
              {{ t('user.tip1') }}
            </div>
            <span>{{ t('uploadInfo.type') }}</span>
            <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;"
                     @click="importTemplate">
              {{ t('download_template') }}
            </el-link>
          </div>
        </template>
      </el-upload>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" class="btn-confirm" @click="submitFileForm">{{ t('confirm') }}</el-button>
          <el-button @click="upload.open = false">{{ t('cancel') }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="User">
import {getToken} from "@/utils/auth";
import {
  changeUserStatus,
  listUser,
  resetUserPwd,
  delUser,
  getUser,
  updateUser,
  addUser,
  deptTreeSelect
} from "@/api/system/user";
import {reqGetAllCompany} from "@/api/system/company.js";
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const router = useRouter();
const {proxy} = getCurrentInstance();
const {sys_normal_disable, sys_user_sex} = proxy.useDict("sys_normal_disable", "sys_user_sex");

const userList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const dateRange = ref([]);
const deptName = ref("");
const deptOptions = ref(undefined);
const initPassword = ref(undefined);
const postOptions = ref([]);
const roleOptions = ref([]);
const companyOptions = ref([]);
/*** 用户导入参数 */
const upload = reactive({
  // 是否显示弹出层（用户导入）
  open: false,
  // 弹出层标题（用户导入）
  title: "",
  // 是否禁用上传
  isUploading: false,
  // 是否更新已经存在的用户数据
  updateSupport: 0,
  // 设置上传的请求头部
  headers: {Authorization: "Bearer " + getToken()},
  // 上传的地址
  url: import.meta.env.VITE_APP_BASE_API + "/system/user/importData"
});
// 列显隐信息
const columns = ref(JSON.parse(localStorage.getItem('userId') || 'null') || [
  {key: 0, label: t('user.userId'), visible: true},
  {key: 1, label: t('user.userName'), visible: true},
  {key: 2, label: t('user.nickName'), visible: true},
  {key: 3, label: t('user.departmentName'), visible: true},
  {key: 4, label: t('user.phonenumber'), visible: true},
  {key: 5, label: t('user.status'), visible: true},
  {key: 6, label: t('user.createTime'), visible: true}
]);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    userName: undefined,
    phonenumber: undefined,
    status: undefined,
    deptId: undefined,
    companyId: undefined
  },
  rules: {
    userName: [{required: true, message: t('user.userName') + t('cannot_empty'), trigger: "blur"}, {
      min: 2,
      max: 20,
      message: t('user.tip4'),
      trigger: "blur"
    }],
    nickName: [{required: true, message: t('user.nickName') + t('cannot_empty'), trigger: "blur"}],
    password: [{required: true, message: t('user.password') + t('cannot_empty'), trigger: "blur"}, {
      min: 5,
      max: 20,
      message: t('user.tip5'),
      trigger: "blur"
    }, {pattern: /^[^<>"'|\\]+$/, message: t('user.tip6'), trigger: "blur"}],
    companyId: [{required: true, message: t('user.company') + t('cannot_empty'), trigger: "blur"}],
    email: [{type: "email", message: t('user.tip2'), trigger: ["blur", "change"]}],
    phonenumber: [{pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: t('user.tip3'), trigger: "blur"}]
  }
});

const {queryParams, form, rules} = toRefs(data);

/** 通过条件过滤节点  */
const filterNode = (value, data) => {
  if (!value) return true;
  return data.label.indexOf(value) !== -1;
};
/** 根据名称筛选部门树 */
watch(deptName, val => {
  proxy.$refs["deptTreeRef"].filter(val);
});

/** 查询部门下拉树结构 */
function getDeptTree() {
  deptTreeSelect().then(response => {
    deptOptions.value = response.data;
  });
};

/** 查询用户列表 */
function getList() {
  loading.value = true;
  listUser(proxy.addDateRange(queryParams.value, dateRange.value)).then(res => {
    loading.value = false;
    userList.value = res.rows;
    total.value = res.total;
  });
};

/** 节点单击事件 */
function handleNodeClick(data) {
  queryParams.value.deptId = data.id;
  handleQuery();
};

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
};

/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = [];
  proxy.resetForm("queryRef");
  queryParams.value.deptId = undefined;
  proxy.$refs.deptTreeRef.setCurrentKey(null);
  handleQuery();
};

/** 删除按钮操作 */
function handleDelete(row) {
  const userIds = row.userId || ids.value;
  proxy.$modal.confirm(t('user.tip7') + userIds + t('user.tip8')).then(function () {
    return delUser(userIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('delete') + t('success'));
  }).catch(() => {
  });
};

/** 导出按钮操作 */
function handleExport() {
  proxy.download("system/user/export", {
    ...queryParams.value,
  }, `user_${new Date().getTime()}.xlsx`);
};

/** 用户状态修改  */
function handleStatusChange(row) {
  let text = row.status === "0" ? t('user.enable') : t('user.disable');
  proxy.$modal.confirm(t('user.tip9') + text + '""' + row.userName + t('user.tip10')).then(function () {
    return changeUserStatus(row.userId, row.status);
  }).then(() => {
    proxy.$modal.msgSuccess(text + t('success'));
  }).catch(function () {
    row.status = row.status === "0" ? "1" : "0";
  });
};

/** 更多操作 */
function handleCommand(command, row) {
  switch (command) {
    case "handleResetPwd":
      handleResetPwd(row);
      break;
    case "handleAuthRole":
      handleAuthRole(row);
      break;
    default:
      break;
  }
};

/** 跳转角色分配 */
function handleAuthRole(row) {
  const userId = row.userId;
  router.push("/system/user-auth/role/" + userId);
};

/** 重置密码按钮操作 */
function handleResetPwd(row) {
  proxy.$prompt(t('input') + row.userName + t('user.newPassword'), t('system_hint'), {
    confirmButtonText: t('confirm'),
    cancelButtonText: t('cancel'),
    closeOnClickModal: false,
    inputPattern: /^.{5,20}$/,
    inputErrorMessage: t('user.tip5'),
    inputValidator: (value) => {
      if (/<|>|"|'|\||\\/.test(value)) {
        return t('user.tip6')
      }
    },
  }).then(({value}) => {
    resetUserPwd(row.userId, value).then(response => {
      proxy.$modal.msgSuccess(t('operate_success'));
    });
  }).catch(() => {
  });
};

/** 选择条数  */
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.userId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 导入按钮操作 */
function handleImport() {
  upload.title = t('user.user') + t('import');
  upload.open = true;
};

/** 下载模板操作 */
function importTemplate() {
  proxy.download("system/user/importTemplate", {}, `user_template_${new Date().getTime()}.xlsx`);
};
/**文件上传中处理 */
const handleFileUploadProgress = (event, file, fileList) => {
  upload.isUploading = true;
};
/** 文件上传成功处理 */
const handleFileSuccess = (response, file, fileList) => {
  upload.open = false;
  upload.isUploading = false;
  proxy.$refs["uploadRef"].handleRemove(file);
  proxy.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", {dangerouslyUseHTMLString: true});
  getList();
};

/** 提交上传文件 */
function submitFileForm() {
  proxy.$refs["uploadRef"].submit();
};

/** 重置操作表单 */
function reset() {
  form.value = {
    userId: undefined,
    deptId: undefined,
    userName: undefined,
    nickName: undefined,
    password: undefined,
    phonenumber: undefined,
    email: undefined,
    sex: undefined,
    status: "0",
    remark: undefined,
    postIds: [],
    roleIds: [],
    companyId: [],
  };
  proxy.resetForm("userRef");
};

/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
};

/** 新增按钮操作 */
function handleAdd() {
  reset();
  getUser().then(response => {
    postOptions.value = response.posts;
    roleOptions.value = response.roles;
    open.value = true;
    title.value = t('add') + t('user.user');
    form.value.password = initPassword.value;
  });
};

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const userId = row.userId || ids.value;
  getUser(userId).then(response => {
    form.value = response.data;
    postOptions.value = response.posts;
    roleOptions.value = response.roles;
    form.value.postIds = response.postIds;
    form.value.roleIds = response.roleIds;
    open.value = true;
    title.value = t('edit') + t('user.user');
    form.password = "";
  });
};

/** 提交按钮 */
function submitForm() {
  proxy.$refs["userRef"].validate(valid => {
    if (valid) {
      if (form.value.userId != undefined) {
        updateUser(form.value).then(response => {
          proxy.$modal.msgSuccess(t('operate_success'));
          open.value = false;
          getList();
        });
      } else {
        addUser(form.value).then(response => {
          proxy.$modal.msgSuccess(t('operate_success'));
          open.value = false;
          getList();
        });
      }
    }
  });
};


// 获取公司下拉列表
const getAllCompany = async () => {
  const {data} = await reqGetAllCompany()
  companyOptions.value = data
}
getDeptTree();
getList();
getAllCompany()
</script>
