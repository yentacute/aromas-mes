import { reactive} from 'vue'
import {useI18n} from "vue-i18n";

export default function useData() {
    const {t} = useI18n()
    const pageData = reactive({
        columnData: [
            {
                label: t('wmsPicking.billNo'),
                prop: 'billNo',
                width:'180',
                fixed:'left',
            },
            {
                label: t('wmsPicking.materialInfo'),
                prop: 'materialInfo',
                width:'150',
                fixed:'left'
            },
            {
                label: t('wmsPicking.styleInfo'),
                prop: 'styleInfo',
                width:'150'
            },
            {
                label: t('wmsPicking.orderInfo'),
                prop: 'orderInfo',
                width:'150'
            },
            {
                label: t('wmsPicking.billDate'),
                prop: 'billDate',
                width:'150'
            },
            {
                label: t('wmsPicking.businessUnitsName'),
                prop: 'businessEntityName',
                width:'auto'
            },
            {
                label: t('wmsPicking.billStatus'),
                prop: 'billStatus',
                width:'100'
            },
            {
                label: t('wmsPicking.quantity'),
                prop: 'quantity',
                width:'100'
            },
            {
                label: t('wmsPicking.stockOutQty'),
                prop: 'pickedQuantity',
                width:'150'
            },
            {
                label: t('wmsPicking.materialRate'),
                prop: 'situation',
                width:'100'
            },
            {
                label: t('wmsPicking.pickRate'),
                prop: 'percentage',
                width:'100'
            },
            {
                label: t('remark'),
                prop: 'remark',
                width:'180'
            },
            {
                label: t('wmsPicking.createName'),
                prop: 'createName',
                width:'100'
            },
            {
                label: t('createTime'),
                prop: 'createTime',
                width:'180'
            },
            {
                label: t('include_disable'),
                prop: 'disable',
                width:'100'
            },
            {
                label: t('operate'),
                prop: 'operate',
                width:'200',
                fixed: 'right'
            }
        ],
        printData: [
            {
                label: t('stockFabric.fabricCode'),
                prop: 'fabricCode',
                width:'auto',
            },
            {
                label: t('stockFabric.fabricName'),
                prop: 'fabricName',
                width:'auto',
            },
            {
                label: t('stockFabric.quantity'),
                prop: 'quantity',
                width:'auto'
            },
            {
                label: t('stockFabric.lot'),
                prop: 'lot',
                width:'auto'
            },
            {
                label: t('stockFabric.colorName'),
                prop: 'colorName',
                width:'auto'
            },
            {
                label: t('stockFabric.locationCode'),
                prop: 'locationCode',
                width:'auto'
            },
            {
                label: t('stockFabric.unitCode'),
                prop: 'unitCode',
                width:'auto'
            },
        ]
    })
    return {
        pageData
    };
}

