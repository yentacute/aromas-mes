import {reactive} from 'vue'
import {useI18n} from "vue-i18n";

export default function useData() {
    const {t} = useI18n()
    const pageData = reactive({
        columnData: [
            {
                label: t('file_name'),
                prop: 'fileName',
                width: 'auto',
                fixed: 'left',
            },
            {
                label: t('uploadInfo.time'),
                prop: 'createTime',
                width: 'auto',
                fixed: 'left'
            },
            {
                label: t('upload') + t('nick_name'),
                prop: 'nickName',
                width: 'auto'
            },
            {
                label: t('quantity'),
                prop: 'count',
                width: 'auto'
            },
            {
                label: t('operate'),
                prop: 'operate',
                width: 'auto',
                fixed: 'right'
            }
        ],

        detailsColumnData: [
            {
                label: t('load.business_type'),
                prop: 'businessType',
                width: '150',
                fixed: 'left',
            },
            {
                label: t('load.container_load_num'),
                prop: 'containerLoadNum',
                width: '150',
                fixed: 'left'
            },
            {
                label: t('load.qrcode'),
                prop: 'qrcode',
                width: '180'
            },
            {
                label: t('load.container_load_date'),
                prop: 'containerLoadDate',
                width: '150'
            },




            //
            {
                label: t('load.best_cabinet_num'),
                prop: 'supplierContrinerLoadNum',
                width: '150'
            },
            {
                label: t('load.container_load_order_sequence'),
                prop: 'supplierContrinerLoadOrder',
                width: '150',
            },
            {
                label: t('load.best_purchase_order_num'),
                prop: 'supplierPo',
                width: '150',
            },
            {
                label: t('load.best_purchase_order_sequence'),
                prop: 'supplierPoOrder',
                width: '150'
            },
            {
                label: t('load.part_num'),
                prop: 'itemCode',
                width: '150'
            },
            {
                label: t('load.itemName'),
                prop: 'itemName',
                width: '150'
            },
            {
                label: t('load.colour'),
                prop: 'itemColor',
                width: '150',
            },
            {
                label: t('load.size'),
                prop: 'width',
                width: '150',
            },
            {
                label: t('load.cylinder_num'),
                prop: 'lot',
                width: '150'
            },
            {
                label: t('load.match_num'),
                prop: 'roll',
                width: '150'
            },





            {
                label: t('load.quantity_including_foc'),
                prop: 'quantityIncludingFoc',
                width: '150'
            },
            //
            {
                label: t('load.before_foc_quantity'),
                prop: 'quantityBeforeFoc',
                width: '150'
            },
            {
                label: t('load.after_foc_quantity'),
                prop: 'quantityAfterFoc',
                width: '150'
            },



            {
                label: t('load.purchasing_unit'),
                prop: 'purchasingUnit',
                width: '150'
            },
            {
                label: t('load.delivery_date'),
                prop: 'deliveryDate',
                width: '150'
            },
            {
                label: t('load.purchase_order_num'),
                prop: 'purchaseOrderNum',
                width: '150'
            },
            //
            {
                label: t('load.procurement_item_num'),
                prop: 'poBatch',
                width: '150'
            },
            {
                label: t('load.purchase_quantity'),
                prop: 'quantityPo',
                width: '150'
            },


            {
                label: t('load.production_plant_area'),
                prop: 'productionPlantArea',
                width: '150'
            },
            {
                label: t('load.data_written_operations_center'),
                prop: 'dataWrittenOperationsCenter',
                width: '150'
            },
            {
                label: t('load.warehouse_area'),
                prop: 'warehouseArea',
                width: '150'
            },
            {
                label: t('load.warehouse'),
                prop: 'warehouse',
                width: '150'
            },
            {
                label: t('load.supplier'),
                prop: 'businessEntityCode',
                width: '150'
            },
            {
                label: t('load.supplier_abbreviation'),
                prop: 'businessEntityName',
                width: '150'
            },
            {
                label: t('load.currency'),
                prop: 'currency',
                width: '150'
            },
            {
                label: t('load.part_num_identification'),
                prop: 'partNumIdentification',
                width: '150'
            },
            {
                label: t('load.weight'),
                prop: 'weight',
                width: '150'
            },
            {
                label: t('load.gross_weight'),
                prop: 'grossWeight',
                width: '150'
            },
            {
                label: t('load.net_weight'),
                prop: 'netWeight',
                width: '150'
            },
            {
                label: t('load.season'),
                prop: 'season',
                width: '150'
            },
            {
                label: t('load.inFabric'),
                prop: 'inFabric',
                width: '150'
            },
            {
                label: t('operate'),
                prop: 'operate',
                width: '150',
                fixed: 'right'
            }
        ]
    })
    return {
        pageData
    };
}

