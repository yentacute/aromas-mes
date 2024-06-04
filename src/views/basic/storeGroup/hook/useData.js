import { reactive} from 'vue'
import {useI18n} from "vue-i18n";

export default function useData() {
    const {t} = useI18n()
    const pageData = reactive({
        columnData: [
            {
                label: t('storeGroup.groupCode'),
                prop: 'groupCode',
                width:'auto',
                fixed:'left',
            },
            {
                label: t('storeGroup.groupName'),
                prop: 'groupName',
                width:'auto',
                fixed:'left'
            },
            {
                label: t('remark'),
                prop: 'remark',
                width:'auto'
            },
            {
                label: t('is_disable'),
                prop: 'disable',
                width:'auto'
            },
            {
                label: t('operate'),
                prop: 'operate',
                width:'auto',
                fixed: 'right'
            }
        ],
    })
    return {
        pageData
    };
}

