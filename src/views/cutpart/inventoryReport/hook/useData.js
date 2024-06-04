import {reactive} from 'vue'
import {useI18n} from "vue-i18n";

export default function useData() {
    const {t} = useI18n()
    const pageData = reactive({
        columnData: [
            {
                label: t('cutpart.warehouseName'),
                prop: 'warehouseName',
                width: 'auto',
                fixed: 'left',
            },
            {
                label: t('cutpart.moNo'),
                prop: 'moNo',
                width: 'auto'
            },
            {
                label: t('cutpart.styleNo'),
                prop: 'styleNo',
                width: 'auto'
            },
            {
                label: t('cutpart.styleColorCode'),
                prop: 'styleColorCode',
                width: 'auto'
            },
            {
                label: t('cutpart.styleColorName'),
                prop: 'styleColorName',
                width: 'auto'
            },
            {
                label: t('cutpart.styleTemplateNum'),
                prop: 'styleTemplateNum',
                width: 'auto'
            },
            {
                label: t('cutpart.sizeCode'),
                prop: 'sizeCode',
                width: 'auto'
            },
            {
                label: t('cutpart.sizeName'),
                prop: 'sizeName',
                width: 'auto'
            },
            {
                label: t('cutpart.partName'),
                prop: 'partName',
                width: 'auto'
            },
            {
                label: t('cutpart.bedNo'),
                prop: 'bedNo',
                width: 'auto'
            },
            {
                label: t('cutpart.bundleNo'),
                prop: 'bundleNo',
                width: 'auto'
            },
            {
                label: t('cutpart.containerCode'),
                prop: 'containerCode',
                width: 'auto'
            },
            {
                label: t('cutpart.locationName'),
                prop: 'locationName',
                width: 'auto'
            },
            {
                label: t('cutpart.quantity'),
                prop: 'cutPartWarehouseQuantity',
                width: 'auto'
            },
            {
                label: t('cutpart.workTicketQuantity'),
                prop: 'workTicketQuantity',
                width: 'auto'
            },
            {
                label: t('cutpart.qrcode'),
                prop: 'qrcode',
                width: 'auto'
            }
           
        ]
    })
    return {
        pageData
    };
}

