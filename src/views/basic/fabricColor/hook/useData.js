import { reactive} from 'vue'
import {useI18n} from "vue-i18n";

export default function useData() {
    const {t} = useI18n()
    const pageData = reactive({
        columnData: [
            {
                label: '颜色编码',
                prop: 'colorCode',
                width:'auto',
                fixed:'left',
            },
            {
                label: '颜色名称',
                prop: 'colorName',
                width:'auto',
                fixed:'left'
            },
            {
                label: '十六进制颜色',
                prop: 'sixteenDigitColor',
                width:'auto'
            },
            {
                label: '备注',
                prop: 'remark',
                width:'auto'
            },
            {
                label: t('operate'),
                prop: 'operate',
                width:'auto',
                fixed: 'right'
            }
        ]
    })
    return {
        pageData
    };
}

