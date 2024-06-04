import { reactive} from 'vue'
import {useI18n} from "vue-i18n";

export default function useData() {
    const {t} = useI18n()
    const pageData = reactive({
        columnData: [
            {
                label: t('storeArchives.materialCategory'),
                prop: 'materialCategoryName',
                width:'150',
                fixed:'left',
            },
            {
                label: t('storeArchives.storeGroup'),
                prop: 'groupName',
                width:'150',
                fixed:'left',
            },
            {
                label: t('storeArchives.storeCode'),
                prop: 'storeCode',
                width:'150',
                fixed:'left'
            },
            {
                label: t('storeArchives.storeName'),
                prop: 'storeName',
                width:'150'
            },
            {
                label: t('storeArchives.storeTypeCode'),
                prop: 'storeTypeCode',
                width:'180'
            },
            {
                label: t('storeArchives.enableStorageLocation'),
                prop: 'enableStorageLocation',
                width:'auto'
            },
            {
                label: t('storeArchives.allowNegativeStock'),
                prop: 'isAllowNegativeStock',
                width:'auto'
            },
            {
                label: t('storeArchives.virtual'),
                prop: 'isVirtual',
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

