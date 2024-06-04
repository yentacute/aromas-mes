import { reactive} from 'vue'
import {useI18n} from "vue-i18n";

export default function useData() {
    const {t} = useI18n()
    const pageData = reactive({
        columnData: [
            {
                label: t('colorLibrary.colorCode'),
                prop: 'colorCode',
                width:'auto',
                fixed:'left',
            },
            {
                label: t('colorLibrary.colorName'),
                prop: 'colorName',
                width:'auto',
                fixed:'left'
            },
            {
                label: t('colorLibrary.16Color'),
                prop: 'sixteenDigitColor',
                width:'180'
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
        matchColumnData: [
            {
                label: t('colorLibrary.colorCode') + '(' + t('required') + ')',
                prop: 'colorCode',
                width:'auto',
                fixed:'left',
                isRequired: true
            },
            {
                label: t('colorLibrary.colorName') + '(' + t('required') + ')',
                prop: 'colorName',
                width:'auto',
                fixed:'left',
                isRequired: true
            },
            {
                label: t('colorLibrary.16Color'),
                prop: 'sixteenDigitColor',
                width:'180'
            },
            {
                label: t('remark'),
                prop: 'remark',
                width:'auto'
            },
        ]
    })
    return {
        pageData
    };
}

