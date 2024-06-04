import { reactive} from 'vue'
import {useI18n} from "vue-i18n";

export default function useData() {
    const {t} = useI18n()
    const pageData = reactive({
        columnData: [
            {
                label: t('warehouseContainer.containerCode'),
                prop: 'containerCode',
                width:'auto',
                fixed:'left',
            },
            {
                label: t('warehouseContainer.containerType'),
                prop: 'containerType',
                width:'auto',
                fixed:'left'
            },
            {
                label: t('warehouseContainer.locationName'),
                prop: 'locationName',
                width:'150',
                fixed:'left',
            },
            {
                label: t('warehouseContainer.containerDescription'),
                prop: 'containerDescription',
                width:'auto',
            },
            {
                label: t('warehouseContainer.warehouseName'),
                prop: 'warehouseName',
                width:'150',
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

