import { reactive} from 'vue'
import {useI18n} from "vue-i18n";

export default function useData() {
    const {t} = useI18n()
    const pageData = reactive({
        columnData: [
            {
                label: t('brandInfo.brand_code'),
                prop: 'brandCode',
                width:'150',
                fixed:'left',
            },
            {
                label: t('brandInfo.abbreviation'),
                prop: 'brandName',
                width:'150',
                fixed:'left'
            },
            {
                label: t('brandInfo.full_name'),
                prop: 'brandFullName',
                width:'150'
            },
            {
                label: t('brandInfo.english_name'),
                prop: 'brandEnName',
                width:'150'
            },
            {
                label: t('brandInfo.packaging_requirements'),
                prop: 'packageRequest',
                width:'150'
            },
            {
                label: t('brandInfo.shipping_requirements'),
                prop: 'shippingMark',
                width:'150'
            },
            {
                label: t('brandInfo.remark'),
                prop: 'remark',
                width:'150'
            },
            {
                label: t('brandInfo.del_flag'),
                prop: 'disable',
                width:'150'
            },
            {
                label: t('brandInfo.create_nickname'),
                prop: 'createNickName',
                width:'150'
            },
            {
                label: t('brandInfo.create_time'),
                prop: 'createTime',
                width:'180'
            },
            {
                label: t('brandInfo.update_nickname'),
                prop: 'updateNickName',
                width:'150'
            },
            {
                label: t('brandInfo.update_time'),
                prop: 'updateTime',
                width:'180'
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

