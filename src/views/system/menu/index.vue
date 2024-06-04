<template>
   <div class="app-container">
      <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
         <el-form-item :label="t('menu_management.menuName')" prop="menuName">
            <el-input
               v-model="queryParams.menuName"
               :placeholder="t('input') + t('menu_management.menuName')"
               clearable
               style="width: 200px"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item :label="t('menu_management.status')"  prop="status">
            <el-select v-model="queryParams.status" :placeholder="t('choose') + t('menu_management.menuName')" clearable style="width: 200px">
               <el-option
                  v-for="dict in sys_normal_disable"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
               />
            </el-select>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">{{ t('query')}}</el-button>
            <el-button icon="Refresh" @click="resetQuery">{{ t('reset')}}</el-button>
         </el-form-item>
      </el-form>

      <el-row :gutter="10" class="mb8">
         <el-col :span="1.5">
            <el-button
               type="primary"
               plain
               icon="Plus"
               @click="handleAdd"
               v-hasPermi="['system:menu:add']"
            >{{ t('add')}}</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="info"
               plain
               icon="Sort"
               @click="toggleExpandAll"
            >{{ t('menu_management.an') }} / {{ t('menu_management.fold') }}</el-button>
         </el-col>
         <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>

      <el-table
         v-if="refreshTable"
         v-loading="loading"
         :data="menuList"
         row-key="menuId"
         :default-expand-all="isExpandAll"
         :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
         <el-table-column prop="menuName" :label="t('menu_management.menuName')" :show-overflow-tooltip="true" width="160"></el-table-column>
         <el-table-column prop="icon" :label="t('menu_management.menuIcon')" align="center" width="100">
            <template #default="scope">
               <svg-icon :icon-class="scope.row.icon" />
            </template>
         </el-table-column>
         <el-table-column prop="orderNum" :label="t('menu_management.sort')" width="60"></el-table-column>
         <el-table-column prop="perms" :label="t('menu_management.permission_identification')" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column prop="component" :label="t('menu_management.component_paths')" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column prop="status" :label="t('menu_management.status')" width="80">
            <template #default="scope">
               <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
            </template>
         </el-table-column>
         <el-table-column :label="t('menu_management.createTime')" align="center" width="160" prop="createTime">
            <template #default="scope">
               <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
         </el-table-column>
         <el-table-column :label="t('operate')" align="center" width="210" class-name="small-padding fixed-width">
            <template #default="scope">
               <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:menu:edit']">{{t('edit')}}</el-button>
               <el-button link type="primary" icon="Plus" @click="handleAdd(scope.row)" v-hasPermi="['system:menu:add']">{{t('add')}}</el-button>
               <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:menu:remove']">{{t('delete')}}</el-button>
            </template>
         </el-table-column>
      </el-table>

      <!-- 添加或修改菜单对话框 -->
      <el-dialog :title="title" v-model="open" width="45%" append-to-body>
         <el-form ref="menuRef" :model="form" :rules="rules" >
            <el-row>
               <el-col :span="24">
                  <el-form-item :label="t('menu_management.previous_menu')">
                     <el-tree-select
                        v-model="form.parentId"
                        :data="menuOptions"
                        :props="{ value: 'menuId', label: 'menuName', children: 'children' }"
                        value-key="menuId"
                        :placeholder="t('choose') + t('menu_management.previous_menu')"
                        check-strictly
                     />
                  </el-form-item>
               </el-col>
               <el-col :span="24">
                  <el-form-item :label="t('menu_management.menuType')" prop="menuType">
                     <el-radio-group v-model="form.menuType">
                        <el-radio label="M">{{t('menu_management.catalogue')}}</el-radio>
                        <el-radio label="C">{{t('menu_management.menu')}}</el-radio>
                        <el-radio label="F">{{t('menu_management.button')}}</el-radio>
                     </el-radio-group>
                  </el-form-item>
               </el-col>
               <el-col :span="24" v-if="form.menuType != 'F'">
                  <el-form-item :label="t('menu_management.menuIcon')" prop="icon">
                     <el-popover
                        placement="bottom-start"
                        :width="540"
                        trigger="click"
                     >
                        <template #reference>
                           <el-input v-model="form.icon" :placeholder="t('choose')+ t('menu_management.menuIcon')" @blur="showSelectIcon" readonly>
                              <template #prefix>
                                 <svg-icon
                                    v-if="form.icon"
                                    :icon-class="form.icon"
                                    class="el-input__icon"
                                    style="height: 32px;width: 16px;"
                                 />
                                 <el-icon v-else style="height: 32px;width: 16px;"><search /></el-icon>
                              </template>
                           </el-input>
                        </template>
                        <icon-select ref="iconSelectRef" @selected="selected" :active-icon="form.icon" />
                     </el-popover>
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="t('menu_management.menuName')" prop="menuName">
                     <el-input v-model="form.menuName" :placeholder="t('input') + t('menu_management.menuName')" />
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="t('menu_management.sort')" prop="orderNum">
                     <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
                  </el-form-item>
               </el-col>
               <el-col :span="12" v-if="form.menuType != 'F'">
                  <el-form-item>
                     <template #label>
                        <span>
                           <el-tooltip :content="t('menu_management.tooltip1')" placement="top">
                              <el-icon><question-filled /></el-icon>
                           </el-tooltip>{{ t('menu_management.outside_chain') }}
                        </span>
                     </template>
                     <el-radio-group v-model="form.isFrame">
                        <el-radio label="0">{{ t('yes') }}</el-radio>
                        <el-radio label="1">{{ t('no') }}</el-radio>
                     </el-radio-group>
                  </el-form-item>
               </el-col>
               <el-col :span="12" v-if="form.menuType != 'F'">
                  <el-form-item prop="path">
                     <template #label>
                        <span>
                           <el-tooltip :content="t('menu_management.tooltip2')" placement="top">
                              <el-icon><question-filled /></el-icon>
                           </el-tooltip>
                           {{ t('menu_management.route_address') }}
                        </span>
                     </template>
                     <el-input v-model="form.path" :placeholder="t('input') + t('menu_management.route_address')" />
                  </el-form-item>
               </el-col>
               <el-col :span="12" v-if="form.menuType == 'C'">
                  <el-form-item prop="component">
                     <template #label>
                        <span>
                           <el-tooltip :content="t('menu_management.tooltip3')" placement="top">
                              <el-icon><question-filled /></el-icon>
                           </el-tooltip>
                          {{ t('menu_management.component_paths') }}
                        </span>
                     </template>
                     <el-input v-model="form.component" :placeholder="t('input') + t('menu_management.component_paths')" />
                  </el-form-item>
               </el-col>
               <el-col :span="12" v-if="form.menuType != 'M'">
                  <el-form-item>
                     <el-input v-model="form.perms" :placeholder="t('input') + t('menu_management.permission_identification')" maxlength="100" />
                     <template #label>
                        <span>
                           <el-tooltip :content="t('menu_management.tooltip4')" placement="top">
                              <el-icon><question-filled /></el-icon>
                           </el-tooltip>
                           {{ t('menu_management.permission_identification') }}
                        </span>
                     </template>
                  </el-form-item>
               </el-col>
               <el-col :span="12" v-if="form.menuType == 'C'">
                  <el-form-item>
                     <el-input v-model="form.query" :placeholder="t('input') + t('menu_management.routing_parameters')" maxlength="255" />
                     <template #label>
                        <span>
<!--                           <el-tooltip content='访问路由的默认传递参数，如：`{"id": 1, "name": "ry"}`' placement="top">-->
                           <el-tooltip :content="t('menu_management.tooltip5')" placement="top">
                              <el-icon><question-filled /></el-icon>
                           </el-tooltip>
                           {{ t('menu_management.routing_parameters') }}
                        </span>
                     </template>
                  </el-form-item>
               </el-col>
               <el-col :span="12" v-if="form.menuType == 'C'">
                  <el-form-item>
                     <template #label>
                        <span>
                           <el-tooltip :content="t('menu_management.tooltip6')" placement="top">
                              <el-icon><question-filled /></el-icon>
                           </el-tooltip>
                           {{ t('menu_management.is_cache') }}
                        </span>
                     </template>
                     <el-radio-group v-model="form.isCache">
                        <el-radio label="0">{{ t('menu_management.cache') }}</el-radio>
                        <el-radio label="1">{{ t('menu_management.not_cache') }}</el-radio>
                     </el-radio-group>
                  </el-form-item>
               </el-col>
               <el-col :span="12" v-if="form.menuType != 'F'">
                  <el-form-item>
                     <template #label>
                        <span>
                           <el-tooltip :content="t('menu_management.tooltip7')" placement="top">
                              <el-icon><question-filled /></el-icon>
                           </el-tooltip>
                           {{ t('menu_management.display_status') }}
                        </span>
                     </template>
                     <el-radio-group v-model="form.visible">
                        <el-radio
                           v-for="dict in sys_show_hide"
                           :key="dict.value"
                           :label="dict.value"
                        >{{ dict.label }}</el-radio>
                     </el-radio-group>
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item>
                     <template #label>
                        <span>
                           <el-tooltip :content="t('menu_management.tooltip8')" placement="top">
                              <el-icon><question-filled /></el-icon>
                           </el-tooltip>
                            {{ t('menu_management.menu_status') }}
                        </span>
                     </template>
                     <el-radio-group v-model="form.status">
                        <el-radio
                           v-for="dict in sys_normal_disable"
                           :key="dict.value"
                           :label="dict.value"
                        >{{ dict.label }}</el-radio>
                     </el-radio-group>
                  </el-form-item>
               </el-col>
            </el-row>
         </el-form>
         <template #footer>
            <div class="dialog-footer">
               <el-button type="primary" class="btn-confirm" @click="submitForm">{{ t('confirm') }}</el-button>
               <el-button class="btn-cancel" @click="cancel">{{t('cancel')}}</el-button>
            </div>
         </template>
      </el-dialog>
   </div>
</template>

<script setup name="Menu">
import { addMenu, delMenu, getMenu, listMenu, updateMenu } from "@/api/system/menu";
import SvgIcon from "@/components/SvgIcon";
import IconSelect from "@/components/IconSelect";
import {useI18n} from "vue-i18n";
const {t} = useI18n()
const { proxy } = getCurrentInstance();
const { sys_show_hide, sys_normal_disable } = proxy.useDict("sys_show_hide", "sys_normal_disable");

const menuList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const title = ref("");
const menuOptions = ref([]);
const isExpandAll = ref(false);
const refreshTable = ref(true);
const iconSelectRef = ref(null);

const data = reactive({
  form: {},
  queryParams: {
    menuName: undefined,
    visible: undefined
  },
  rules: {
    menuName: [{ required: true, message: t('menu_management.menuName') + t('cannot_empty'), trigger: "blur" }],
    orderNum: [{ required: true, message: t('menu_management.menu') + t('menu_management.sort') + t('cannot_empty'), trigger: "blur" }],
    path: [{ required: true, message: t('menu_management.route_address') + t('cannot_empty'), trigger: "blur" }]
  },
});

const { queryParams, form, rules } = toRefs(data);

/** 查询菜单列表 */
function getList() {
  loading.value = true;
  listMenu(queryParams.value).then(response => {
    menuList.value = proxy.handleTree(response.data, "menuId");
    loading.value = false;
  });
}
/** 查询菜单下拉树结构 */
function getTreeselect() {
  menuOptions.value = [];
  listMenu().then(response => {
    // const menu = { menuId: 0, menuName: "主类目", children: [] };
    const menu = { menuId: 0, menuName: t('menu_management.main_category'), children: [] };
    menu.children = proxy.handleTree(response.data, "menuId");
    menuOptions.value.push(menu);
  });
}
/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}
/** 表单重置 */
function reset() {
  form.value = {
    menuId: undefined,
    parentId: 0,
    menuName: undefined,
    icon: undefined,
    menuType: "M",
    orderNum: undefined,
    isFrame: "1",
    isCache: "0",
    visible: "0",
    status: "0"
  };
  proxy.resetForm("menuRef");
}
/** 展示下拉图标 */
function showSelectIcon() {
  iconSelectRef.value.reset();
}
/** 选择图标 */
function selected(name) {
  form.value.icon = name;
}
/** 搜索按钮操作 */
function handleQuery() {
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}
/** 新增按钮操作 */
function handleAdd(row) {
  reset();
  getTreeselect();
  if (row != null && row.menuId) {
    form.value.parentId = row.menuId;
  } else {
    form.value.parentId = 0;
  }
  open.value = true;
  title.value = t('add') + t('menu_management.menu');
}
/** 展开/折叠操作 */
function toggleExpandAll() {
  refreshTable.value = false;
  isExpandAll.value = !isExpandAll.value;
  nextTick(() => {
    refreshTable.value = true;
  });
}
/** 修改按钮操作 */
async function handleUpdate(row) {
  reset();
  await getTreeselect();
  getMenu(row.menuId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = t('edit') + t('menu_management.menu');
  });
}
/** 提交按钮 */
function submitForm() {
  proxy.$refs["menuRef"].validate(valid => {
    if (valid) {
      if (form.value.menuId != undefined) {
        updateMenu(form.value).then(response => {
          proxy.$modal.msgSuccess(t('edit') + t('success'));
          open.value = false;
          getList();
        });
      } else {
        addMenu(form.value).then(response => {
          proxy.$modal.msgSuccess(t('add') + t('success'));
          open.value = false;
          getList();
        });
      }
    }
  });
}
/** 删除按钮操作 */
function handleDelete(row) {
  proxy.$modal.confirm(t('menu_management.deleteTip1') + row.menuName + t('menu_management.deleteTip2')).then(function() {
    return delMenu(row.menuId);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('delete') + t('success'));
  }).catch(() => {});
}

getList();
</script>
