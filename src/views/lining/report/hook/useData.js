import {reactive} from 'vue'
import {useI18n} from "vue-i18n";

export default function useData() {
    const {t} = useI18n()
    const pageData = reactive({
        columnData: [
            {
                label: t('inAnOutReport.warehouseName'),
                prop: 'warehouseName',
                width: 'auto',
                fixed: 'left',
            },
            {
                label: t('inAnOutReport.billNo'),
                prop: 'billNo',
                width: 'auto',
                fixed: 'left'
            },
            {
                label: t('inAnOutReport.billDate'),
                prop: 'billDate',
                width: 'auto'
            },
            {
                label: t('inAnOutReport.typeCode'),
                prop: 'typeCode',
                width: 'auto'
            },
            {
                label: t('inAnOutReport.businessEntityCode'),
                prop: 'businessEntityCode',
                width: 'auto'
            },
            {
                label: t('inAnOutReport.businessEntityName'),
                prop: 'businessEntityName',
                width: 'auto'
            },
            {
                label: t('inAnOutReport.remark'),
                prop: 'remark',
                width: 'auto'
            },
            {
                label: t('inAnOutReport.fabricCode'),
                prop: 'fabricCode',
                width: 'auto'
            },
            {
                label: t('inAnOutReport.fabricName'),
                prop: 'fabricName',
                width: 'auto'
            },
            {
                label: t('inAnOutReport.component'),
                prop: 'component',
                width: 'auto'
            },
            {
                label: t('inAnOutReport.colorCode'),
                prop: 'colorCode',
                width: 'auto'
            },
            {
                label: t('inAnOutReport.colorName'),
                prop: 'colorName',
                width: 'auto'
            },
            {
                label: t('inAnOutReport.lot'),
                prop: 'lot',
                width: 'auto'
            },
            {
                label: t('inAnOutReport.roll'),
                prop: 'roll',
                width: 'auto'
            },
            {
                label: t('inAnOutReport.containerCode'),
                prop: 'containerCode',
                width: 'auto'
            },
            {
                label: t('inAnOutReport.locationName'),
                prop: 'locationName',
                width: 'auto'
            },
            {
                label: t('inAnOutReport.quantity'),
                prop: 'quantity',
                width: 'auto'
            },
            {
                label: t('inAnOutReport.unitName'),
                prop: 'unitName',
                width: 'auto'
            },
            {
                label: t('inAnOutReport.qrcode'),
                prop: 'qrcode',
                width: 'auto'
            },
            {
                label: t('inAnOutReport.createName'),
                prop: 'createName',
                width: 'auto'
            },
            {
                label: t('inAnOutReport.createTime'),
                prop: 'createTime',
                width: 'auto'
            },
            {
                label: t('inAnOutReport.modifyName'),
                prop: 'modifyName',
                width: 'auto'
            },
            {
                label: t('inAnOutReport.modifyTime'),
                prop: 'modifyTime',
                width: 'auto'
            }
        ]
    })
    return {
        pageData
    };
}

