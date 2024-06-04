import { reactive} from 'vue'
import {useI18n} from "vue-i18n";

export default function useData() {
    const {t} = useI18n()
    const pageData = reactive({
        columnData: [
            {
                label: '面料编号',
                prop: 'fabricCode',
                width:'150',
                fixed:'left',
            },
            {
                label: '面料名称',
                prop: 'fabricName',
                width:'150',
                fixed:'left'
            },
            {
                label: '面料英文名称',
                prop: 'fabricEnName',
                width:'auto'
            },
            {
                label: '规格',
                prop: 'specification',
                width:'150'
            },
            {
                label: '织物成分',
                prop: 'component',
                width:'150'
            },
            {
                label: '面料颜色',
                prop: 'colorId',
                width:'150'
            },
            {
                label: '标准幅宽',
                prop: 'widthStandard',
                width:'150'
            },
            {
                label: '标准克重',
                prop: 'weightStandard',
                width:'150'
            },
            {
                label: '供应商',
                prop: 'supplierId',
                width:'150'
            },
            {
                label: t('operate'),
                prop: 'operate',
                width:'150',
                fixed: 'right'
            }
        ]
    })
    return {
        pageData
    };
}

