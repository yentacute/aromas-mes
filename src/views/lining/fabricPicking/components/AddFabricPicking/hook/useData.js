import { reactive} from 'vue'
import {useI18n} from "vue-i18n";

export default function useData() {
    const {t} = useI18n()
    const pageData = reactive({
        columnData: [
            {
                label: t('stockFabric.fabricCode'),
                prop: 'fabricCode',
                width:'150',
                fixed:'left',
            },
            {
                label: t('stockFabric.fabricName'),
                prop: 'fabricName',
                width:'150',
                fixed:'left'
            },
            {
                label: t('stockFabric.specification'),
                prop: 'specification',
                width:'150'
            },
            {
                label: t('stockFabric.component'),
                prop: 'component',
                width:'150'
            },
            {
                label: t('stockFabric.roll'),
                prop: 'roll',
                width:'auto'
            },
            {
                label: t('stockFabric.grade'),
                prop: 'grade',
                width:'auto'
            },
            {
                label: t('stockFabric.quantity'),
                prop: 'quantity',
                width:'180'
            },
            {
                label: t('stockFabric.inventoryQuantity'),
                prop: 'inventoryQuantity',
                width:'180'
            },
            {
                label: t('stockFabric.styleNo'),
                prop: 'styleNo',
                width:'150'
            },
            {
                label: t('stockFabric.lot'),
                prop: 'lot',
                width:'150'
            },
            {
                label: t('stockFabric.colorName'),
                prop: 'colorName',
                width:'150'
            },
            // {
            //     label: t('stockFabric.purchasingUnit'),
            //     prop: 'purchasingUnit',
            //     width:'150'
            // },
            {
                label: t('stockFabric.locationCode'),
                prop: 'locationCode',
                width:'150'
            },
            {
                label: t('stockFabric.containerCode'),
                prop: 'containerCode',
                width:'180'
            },
            {
                label: t('stockFabric.unitCode'),
                prop: 'unitCode',
                width:'150'
            },
            {
                label: t('stockFabric.qrcode'),
                prop: 'qrcode',
                width:'180'
            },
            {
                label: t('operate'),
                prop: 'operate',
                width:'120',
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

