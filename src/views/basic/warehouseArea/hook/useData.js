import { reactive} from 'vue'
import {useI18n} from "vue-i18n";

export default function useData() {
    const {t} = useI18n()
    const pageData = reactive({
        columnData: [
            {
                label: t('storeArea.warehouseName'),
                prop: 'warehouseName',
                width:'150',
                fixed:'left',
            },
            {
                label: t('storeArea.areaName'),
                prop: 'areaName',
                width:'auto',
                fixed:'left',
            },
            {
                label: t('storeArea.areaCode'),
                prop: 'areaCode',
                width:'auto',
                fixed:'left'
            },
            {
                label: t('is_disable'),
                prop: 'disable',
                width:'auto'
            },
            {
                label: t('remark'),
                prop: 'remark',
                width:'auto'
            },
            {
                label: t('operate'),
                prop: 'operate',
                width:'150',
                fixed: 'right'
            }
        ],
    })
    return {
        pageData
    };
}

