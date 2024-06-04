import {ref} from 'vue'
import {delCompany} from "@/api/system/company.js";

const idList = ref([])  //批量
const Ids = ref()
export default function useDelete(t, proxy) {
    async function deleteHandler(row) {
        // const id = row.id || Ids.value;
        const allSelected = idList.value.length > 0 && idList.value.every(item => item.disable);
        const singleItem = !idList.value.length && row.disable;

        const deleteAndRefresh = async () => {
            await delCompany({id:row.id})
            Ids.value = '';
            idList.value = [];
            proxy.$modal.msgSuccess(t('operate_success'));
        };

        const showConfirm = (message) => {
            return proxy.$modal.confirm(message).then(deleteAndRefresh);
        };

        if (allSelected) {
            await showConfirm(t('delete_tip1'));
        } else if (idList.value.length) {
            await showConfirm(t('delete_tip2'));
        } else if (singleItem) {
            await showConfirm(t('delete_tip4'));
        } else {
            await showConfirm(t('delete_tip3'));
        }
    }

    //多选
    function select({rowList}) {
        idList.value = rowList
        const temp = rowList.map(item => item.id);
        Ids.value = temp.join(',')
    }

    return {
        deleteHandler,
        select,
        idList
    };
}
