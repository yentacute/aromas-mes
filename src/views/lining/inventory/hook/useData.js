import {reactive} from 'vue'
import {useI18n} from "vue-i18n";

export default function useData() {
    const {t} = useI18n()
    const pageData = reactive({
        columnData: [
            {
                label: t('fabricInventory.warehouseName'),
                prop: 'warehouseName',
                width: 'auto',
                fixed: 'left',
            },
            {
                label: t('fabricInventory.businessEntityCode'),
                prop: 'businessEntityCode',
                width: 'auto'
            },
            {
                label: t('fabricInventory.businessEntityName'),
                prop: 'businessEntityName',
                width: 'auto'
            },
            {
                label: t('fabricInventory.season'),
                prop: 'season',
                width: 'auto'
            },
            {
                label: t('fabricInventory.fabricCode'),
                prop: 'fabricCode',
                width: 'auto'
            },
            {
                label: t('fabricInventory.fabricName'),
                prop: 'fabricName',
                width: 'auto'
            },
            {
                label: t('fabricInventory.component'),
                prop: 'component',
                width: 'auto'
            },
            {
                label: t('fabricInventory.colorCode'),
                prop: 'colorCode',
                width: 'auto'
            },
            {
                label: t('fabricInventory.colorName'),
                prop: 'colorName',
                width: 'auto'
            },
            {
                label: t('fabricInventory.lot'),
                prop: 'lot',
                width: 'auto'
            },
            {
                label: t('fabricInventory.roll'),
                prop: 'roll',
                width: 'auto'
            },
            {
                label: t('fabricInventory.width'),
                prop: 'width',
                width: 'auto'
            },
            {
                label: t('fabricInventory.weight'),
                prop: 'weight',
                width: 'auto'
            },
            {
                label: t('fabricInventory.grossWeight'),
                prop: 'grossWeight',
                width: 'auto'
            },
            {
                label: t('fabricInventory.netWeight'),
                prop: 'netWeight',
                width: 'auto'
            },
            {
                label: t('fabricInventory.containerCode'),
                prop: 'containerCode',
                width: 'auto'
            },
            {
                label: t('fabricInventory.locationName'),
                prop: 'locationName',
                width: 'auto'
            },
            {
                label: t('fabricInventory.quantity'),
                prop: 'quantity',
                width: 'auto'
            },
            {
                label: t('fabricInventory.unitName'),
                prop: 'unitName',
                width: 'auto'
            },
            {
                label: t('fabricInventory.grade'),
                prop: 'grade',
                width: 'auto'
            },
            {
                label: t('fabricInventory.currency'),
                prop: 'currency',
                width: 'auto'
            },
            {
                label: t('fabricInventory.qrcode'),
                prop: 'qrcode',
                width: 'auto'
            }
        ]
    })
    return {
        pageData
    };
}

