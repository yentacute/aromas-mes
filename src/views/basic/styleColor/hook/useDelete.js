import {ref} from 'vue'
import {delFabricColor} from "@/api/basic/fabricColor.js";
import {delStyleColor} from "@/api/basic/styleColor.js";

const idList = ref([])  //批量
const brandIds = ref()
export default function useDelete(t, proxy) {
    async function deleteHandler(row) {
        const _brandIds = row.id || brandIds.value;
        const allSelected = idList.value.length > 0 && idList.value.every(item => item.disable);
        const singleItem = !idList.value.length && row.disable;

        const deleteAndRefresh = async () => {
            await delStyleColor(row.id)
            brandIds.value = '';
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
        brandIds.value = temp.join(',')
    }

    return {
        deleteHandler,
        select,
        idList
    };
}
