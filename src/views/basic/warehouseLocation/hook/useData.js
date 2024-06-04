import { reactive} from 'vue'
import {useI18n} from "vue-i18n";

export default function useData() {
    const {t} = useI18n()
    const pageData = reactive({
        columnData: [
            {
                label: t('storeLocation.warehouseName'),
                prop: 'warehouseName',
                width:'150',
                fixed:'left',
            },
            {
                label: t('storeLocation.areaName'),
                prop: 'areaName',
                width:'150',
                fixed:'left',
            },
            {
                label: t('storeLocation.locationName'),
                prop: 'locationName',
                width:'auto',
                fixed:'left',
            },
            {
                label: t('storeLocation.locationCode'),
                prop: 'locationCode',
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

