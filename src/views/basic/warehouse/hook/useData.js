import { reactive} from 'vue'
import {useI18n} from "vue-i18n";

export default function useData() {
    const {t} = useI18n()
    const pageData = reactive({
        columnData: [
            {
                label: t('storeArchives.materialCategoryName'),
                prop: 'materialCategoryName',
                width:'150',
                fixed:'left',
            },
            // {
            //     label: t('storeArchives.storeGroup'),
            //     prop: 'groupName',
            //     width:'150',
            //     fixed:'left',
            // },
            {
                label: t('storeArchives.warehouseCode'),
                prop: 'warehouseCode',
                width:'150',
                fixed:'left'
            },
            {
                label: t('storeArchives.warehouseName'),
                prop: 'warehouseName',
                width:'150'
            },
            {
                label: t('storeArchives.warehouseDescription'), // 仓库说明
                prop: 'warehouseDescription',
                width:'auto'
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

