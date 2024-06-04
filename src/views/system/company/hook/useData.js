import { reactive} from 'vue'
import {useI18n} from "vue-i18n";

export default function useData() {
    const {t} = useI18n()
    const pageData = reactive({
        columnData: [
            {
                label: t('company.country'),
                prop: 'country',
                width:'auto',
                fixed:'left',
            },
            {
                label: t('company.short-name'),
                prop: 'companyShortName',
                width:'auto',
                fixed:'left'
            },
            {
                label: t('company.all-name'),
                prop: 'companyFullName',
                width:'auto'
            },
            {
                label: t('company.enName'),
                prop: 'companyEnName',
                width:'auto'
            },
            {
                label: t('company.contact'),
                prop: 'contactPerson',
                width:'auto'
            },
            {
                label: t('company.email'),
                prop: 'eMail',
                width:'auto'
            },
            {
                label: t('company.address'),
                prop: 'address',
                width:'auto'
            },
            {
                label: t('company.note'),
                prop: 'remark',
                width:'auto'
            },
            {
                label: t('company.disable'),
                prop: 'disable',
                width:'auto'
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

