export default function useData ()  {
    const pageData = reactive({
        nodes: [],
        combos: [
            // { // 裁片超市料箱库区
            //     id: 'comboA',
            //     label: '裁片超市料箱库区',
            // },
            // { // 裁片加工区
            //     id: 'comboB',
            //     label: '裁片加工区',
            // },
            // { // 验布分包区
            //     id: 'comboC',
            //     label: '验布分包区',
            // },
            // { // 铺布裁剪区
            //     id: 'comboD',
            //     label: '铺布裁剪区',
            // },
            { // 松布区
                id: 'comboE',
                label: '松布区',
            },
            { // 松布暂存区
                id: 'comboF',
                label: '松布暂存区',
            },
        ]
    })
    //左上
    const leftUpNode = reactive([
        {
            id: 'KIVA-025-005-01',
            containerCode:'',
            x: 200,
            y: 337,
            isFree:true,
            comboId: 'comboA',
        },
        {
            id: 'KIVA-024-006-01',
            containerCode:'',
            x: 230,
            y: 337,
            isFree:true,
            comboId: 'comboA',
        },
        {
            id: 'KIVA-023-007-01',
            containerCode:'',
            x: 260,
            y: 337,
            isFree:true,
            comboId: 'comboA'
        },
        {
            id: 'KIVA-025-009-01',
            containerCode:'',
            x: 290,
            y: 337,
            isFree:true,
            comboId: 'comboA'
        },
    ])
    // 左下
    const leftDownNode = reactive([
        {
            id: 'KIVA-022-001-01',
            containerCode:'',
            x: 60,
            y: 525,
            isFree:true,
             comboId: 'comboB'
        },
        {
            id: 'KIVA-022-002-01',
            containerCode:'',
            x: 90,
            y: 525,
            isFree:true,
             comboId: 'comboB'
        },
        {
            id: 'KIVA-021-003-01',
            containerCode:'',
            x: 160,
            y: 555,
            isFree:true,
             comboId: 'comboB'
        },
        {
            id: 'KIVA-021-004-01',
            containerCode:'',
            x: 190,
            y: 555,
            isFree:true,
             comboId: 'comboB'
        },
        {
            id: 'KIVA-021-008-01',
            containerCode:'',
            x: 280,
            y: 555,
            isFree:true,
             comboId: 'comboB'
        },
        {
            id: 'KIVA-021-010-01',
            containerCode:'',
            x: 310,
            y: 555,
            isFree:true,
             comboId: 'comboB'
        },
        {
            id: 'KIVA-020-003-01',
            containerCode:'',
            x: 160,
            y: 605,
            isFree:true,
             comboId: 'comboB'
        },
        {
            id: 'KIVA-020-004-01',
            containerCode:'',
            x: 190,
            y: 605,
            isFree:true,
             comboId: 'comboB'
        },
        {
            id: 'KIVA-020-008-01',
            containerCode:'',
            x: 280,
            y: 605,
            isFree:true,
             comboId: 'comboB'
        },
        {
            id: 'KIVA-020-010-01',
            containerCode:'',
            x: 310,
            y: 605,
            isFree:true,
             comboId: 'comboB'
        },
    ])
    // 左竖向
    const leftVerticalNode = reactive([
        {
            id: 'KIVA-001-049-01',
            containerCode:'',
            x: 375,
            y: 355,
            size:[10,25],
            isFree:true,
             comboId: 'comboA'
        },
        {
            id: 'KIVA-002-049-01',
            containerCode:'',
            x: 390,
            y: 355,
            size:[10,25],
            isFree:false,
            comboId: 'comboA'
        },
        {
            id: 'KIVA-003-049-01',
            containerCode:'',
            x: 405,
            y: 355,
            size:[10,25],
            isFree:true,
            comboId: 'comboA'
        },
        {
            id: 'KIVA-004-049-01',
            containerCode:'',
            x: 420,
            y: 355,
            size:[10,25],
            isFree:true,
            comboId: 'comboA'
        },
        {
            id: 'KIVA-005-049-01',
            containerCode:'',
            x: 435,
            y: 355,
            size:[10,25],
            isFree:true,
            comboId: 'comboA'
        },
        {
            id: 'KIVA-006-049-01',
            containerCode:'',
            x: 450,
            y: 355,
            size:[10,25],
            isFree:false,
            comboId: 'comboA'
        },
    ])
    // 左长横向
    const leftAcrossNode = reactive([
        {
            id: 'KIVA-007-084-01',
            containerCode:'',
            x: 600,
            y: 30,
            isFree:true,
             comboId: 'comboC'
        },
        {
            id: 'KIVA-007-082-01',
            containerCode:'',
            x: 600,
            y: 45,
            isFree:false,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-081-01',
            containerCode:'',
            x: 600,
            y: 65,
            isFree:true,
             comboId: 'comboC'
        },
        {
            id: 'KIVA-007-079-01',
            containerCode:'',
            x: 600,
            y: 80,
            isFree:true,
             comboId: 'comboC'
        },
        {
            id: 'KIVA-007-078-01',
            containerCode:'',
            x: 600,
            y: 100,
            isFree:true,
             comboId: 'comboC'
        },
        {
            id: 'KIVA-007-076-01',
            containerCode:'',
            x: 600,
            y: 115,
            isFree:false,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-074-01',
            containerCode:'',
            x: 600,
            y: 135,
            isFree:true,
             comboId: 'comboC'
        },
        {
            id: 'KIVA-007-071-01',
            containerCode:'',
            x: 600,
            y: 150,
            isFree:false,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-070-01',
            containerCode:'',
            x: 600,
            y: 170,
            isFree:true,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-068-01',
            containerCode:'',
            x: 600,
            y: 185,
            isFree:true,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-066-01',
            containerCode:'',
            x: 600,
            y: 205,
            isFree:true,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-064-01',
            containerCode:'',
            x: 600,
            y: 220,
            isFree:false,
            comboId: 'comboC'
        },



        {
            id: 'KIVA-007-063-01',
            containerCode:'',
            x: 600,
            y: 250,
            isFree:false,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-061-01',
            containerCode:'',
            x: 600,
            y: 265,
            isFree:false,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-059-01',
            containerCode:'',
            x: 600,
            y: 285,
            isFree:false,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-056-01',
            containerCode:'',
            x: 600,
            y: 300,
            isFree:true,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-055-01',
            containerCode:'',
            x: 600,
            y: 320,
            isFree:false,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-053-01',
            containerCode:'',
            x: 600,
            y: 335,
            isFree:true,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-051-01',
            containerCode:'',
            x: 600,
            y: 355,
            isFree:true,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-047-01',
            containerCode:'',
            x: 600,
            y: 370,
            isFree:true,
            comboId: 'comboC'
        },






        {
            id: 'KIVA-007-046-01',
            containerCode:'',
            x: 600,
            y: 420,
            isFree:false,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-043-01',
            containerCode:'',
            x: 600,
            y: 435,
            isFree:true,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-041-01',
            containerCode:'',
            x: 600,
            y: 455,
            isFree:false,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-039-01',
            containerCode:'',
            x: 600,
            y: 470,
            isFree:true,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-037-01',
            containerCode:'',
            x: 600,
            y: 490,
            isFree:true,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-034-01',
            containerCode:'',
            x: 600,
            y: 505,
            isFree:true,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-032-01',
            containerCode:'',
            x: 600,
            y: 525,
            isFree:false,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-029-01',
            containerCode:'',
            x: 600,
            y: 540,
            isFree:false,
            comboId: 'comboC'
        },



        {
            id: 'KIVA-007-027-01',
            containerCode:'',
            x: 600,
            y: 570,
            isFree:false,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-024-01',
            containerCode:'',
            x: 600,
            y: 585,
            isFree:false,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-022-01',
            containerCode:'',
            x: 600,
            y: 605,
            isFree:false,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-020-01',
            containerCode:'',
            x: 600,
            y: 620,
            isFree:false,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-018-01',
            containerCode:'',
            x: 600,
            y: 640,
            isFree:false,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-015-01',
            containerCode:'',
            x: 600,
            y: 655,
            isFree:false,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-013-01',
            containerCode:'',
            x: 600,
            y: 675,
            isFree:true,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-010-01',
            containerCode:'',
            x: 600,
            y: 690,
            isFree:true,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-008-01',
            containerCode:'',
            x: 600,
            y: 710,
            isFree:true,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-006-01',
            containerCode:'',
            x: 600,
            y: 725,
            isFree:true,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-004-01',
            containerCode:'',
            x: 600,
            y: 745,
            isFree:true,
            comboId: 'comboC'
        },
        {
            id: 'KIVA-007-001-01',
            containerCode:'',
            x: 600,
            y: 760,
            isFree:true,
            comboId: 'comboC'
        }
    ])
    const reightAcrossNode = reactive([
        {
            id: 'KIVA-008-083-01',
            containerCode:'',
            x: 900,
            y: 40,
            isFree:true,
             comboId: 'comboD'
        },
        {
            id: 'KIVA-008-080-01',
            containerCode:'',
            x: 900,
            y: 75,
            isFree:false,
            comboId: 'comboD'
        },
        {
            id: 'KIVA-008-077-01',
            containerCode:'',
            x: 900,
            y: 110,
            isFree:true,
            comboId: 'comboD'
        },
        {
            id: 'KIVA-008-073-01',
            containerCode:'',
            x: 900,
            y: 145,
            isFree:true,
            comboId: 'comboD'
        },
        {
            id: 'KIVA-008-069-01',
            containerCode:'',
            x: 900,
            y: 180,
            isFree:true,
            comboId: 'comboD'
        },
        {
            id: 'KIVA-008-065-01',
            containerCode:'',
            x: 900,
            y: 215,
            isFree:false,
            comboId: 'comboD'
        },
        {
            id: 'KIVA-008-062-01',
            containerCode:'',
            x: 900,
            y: 250,
            isFree:true,
            comboId: 'comboD'
        },
        {
            id: 'KIVA-008-057-01',
            containerCode:'',
            x: 900,
            y: 285,
            isFree:false,
            comboId: 'comboD'
        },
        {
            id: 'KIVA-008-054-01',
            containerCode:'',
            x: 900,
            y: 320,
            isFree:true,
            comboId: 'comboD'
        },
        {
            id: 'KIVA-009-048-01',
            containerCode:'',
            x: 900,
            y: 355,
            isFree:true,
            comboId: 'comboD'
        },




        {
            id: 'KIVA-008-045-01',
            containerCode:'',
            x: 900,
            y: 435,
            isFree:true,
            comboId: 'comboD'
        },
        {
            id: 'KIVA-009-040-01',
            containerCode:'',
            x: 900,
            y: 470,
            isFree:false,
            comboId: 'comboD'
        },

        {
            id: 'KIVA-008-035-01',
            containerCode:'',
            x: 900,
            y: 505,
            isFree:false,
            comboId: 'comboD'
        },
        {
            id: 'KIVA-008-031-01',
            containerCode:'',
            x: 900,
            y: 540,
            isFree:false,
            comboId: 'comboD'
        },
        {
            id: 'KIVA-009-026-01',
            containerCode:'',
            x: 900,
            y: 580,
            isFree:false,
            comboId: 'comboD'
        },
        {
            id: 'KIVA-008-021-01',
            containerCode:'',
            x: 900,
            y: 615,
            isFree:true,
            comboId: 'comboD'
        },
        {
            id: 'KIVA-008-016-01',
            containerCode:'',
            x: 900,
            y: 650,
            isFree:false,
            comboId: 'comboD'
        },
        {
            id: 'KIVA-008-012-01',
            containerCode:'',
            x: 900,
            y: 685,
            isFree:true,
            comboId: 'comboD'
        },
        {
            id: 'KIVA-008-007-01',
            containerCode:'',
            x: 900,
            y: 720,
            isFree:true,
            comboId: 'comboD'
        },
        {
            id: 'KIVA-009-002-01',
            containerCode:'',
            x: 900,
            y: 755,
            isFree:true,
            comboId: 'comboD'
        },
    ])
    const rightUpNode = reactive([
        {
            id: 'KIVA-011-075-01',
            containerCode:'',
            x: 1002,
            y: 120,
            isFree:true,
            comboId: 'comboE'
        },
        {
            id: 'KIVA-011-072-01',
            containerCode:'',
            x: 1002,
            y: 145,
            isFree:true,
            comboId: 'comboE'
        },
        {
            id: 'KIVA-011-067-01',
            containerCode:'',
            x: 1002,
            y: 190,
            isFree:true,
            comboId: 'comboE'
        },
        {
            id: 'KIVA-011-065-01',
            containerCode:'',
            x: 1002,
            y: 210,
            isFree:true,
            comboId: 'comboE'
        },
        {
            id: 'KIVA-011-060-01',
            containerCode:'',
            x: 1002,
            y: 250,
            isFree:true,
            comboId: 'comboE'
        },
        {
            id: 'KIVA-011-058-01',
            containerCode:'',
            x: 1002,
            y: 275,
            isFree:true,
            comboId: 'comboE'
        },
        {
            id: 'KIVA-011-052-01',
            containerCode:'',
            x: 1002,
            y: 320,
            isFree:true,
            comboId: 'comboE'
        },
        {
            id: 'KIVA-011-050-01',
            containerCode:'',
            x: 1002,
            y: 345,
            isFree:true,
            comboId: 'comboE'
        },


        // 右
        {
            id: 'KIVA-016-075-01',
            containerCode:'',
            x: 1180,
            y: 120,
            isFree:true,
            comboId: 'comboE'
        },
        {
            id: 'KIVA-016-072-01',
            containerCode:'',
            x: 1180,
            y: 145,
            isFree:true,
            comboId: 'comboE'
        },
        {
            id: 'KIVA-016-067-01',
            containerCode:'',
            x: 1180,
            y: 190,
            isFree:true,
            comboId: 'comboE'
        },
        {
            id: 'KIVA-016-065-01',
            containerCode:'',
            x: 1180,
            y: 210,
            isFree:true,
            comboId: 'comboE'
        },
        {
            id: 'KIVA-016-060-01',
            containerCode:'',
            x: 1180,
            y: 250,
            isFree:true,
            comboId: 'comboE'
        },
        {
            id: 'KIVA-016-058-01',
            containerCode:'',
            x: 1180,
            y: 275,
            isFree:true,
            comboId: 'comboE'
        },
        {
            id: 'KIVA-016-052-01',
            containerCode:'',
            x: 1180,
            y: 320,
            isFree:true,
            comboId: 'comboE'
        },
        {
            id: 'KIVA-016-050-01',
            containerCode:'',
            x: 1180,
            y: 345,
            isFree:true,
            comboId: 'comboE'
        },
    ])
    const rightDownNodeA = reactive([
        {
            id: 'KIVA-010-044-01',
            containerCode:'',
            x: 1000,
            y: 435,
            isFree:true,
            comboId: 'comboF'
        },
        {
            id: 'KIVA-010-042-01',
            containerCode:'',
            x: 1000,
            y: 456,
            isFree:true,
            comboId: 'comboF'
        },
        {
            id: 'KIVA-010-038-01',
            containerCode:'',
            x: 1000,
            y: 477,
            isFree:true,
            comboId: 'comboF'
        },
        {
            id: 'KIVA-010-036-01',
            containerCode:'',
            x: 1000,
            y: 498,
            isFree:true,
            comboId: 'comboF'
        },
        // {
        //     id: '',
        //     containerCode:'',
        //     type: 'rect',
        //     x: 1000,
        //     y: 519,
        //
        //     style: {
        //         fill: 'gray',
        //         stroke: 'transparent',
        //     },
        //     isFree:true,
        //         comboId: 'comboF'
        // },
        {
            id: 'KIVA-010-030-01',
            containerCode:'',
            x: 1000,
            y: 540,
            isFree:true,
            comboId: 'comboF'
        },
        {
            id: 'KIVA-010-028-01',
            containerCode:'',
            x: 1000,
            y: 561,
            isFree:true,
            comboId: 'comboF'
        },
        {
            id: 'KIVA-010-025-01',
            containerCode:'',
            x: 1000,
            y: 582,
            isFree:true,
            comboId: 'comboF'
        },
        {
            id: 'KIVA-010-023-01',
            containerCode:'',
            x: 1000,
            y: 603,
            isFree:true,
            comboId: 'comboF'
        },
        {
            id: 'KIVA-010-019-01',
            containerCode:'',
            x: 1000,
            y: 624,
            isFree:true,
            comboId: 'comboF'
        },
        {
            id: 'KIVA-010-017-01',
            containerCode:'',
            x: 1000,
            y: 645,
            isFree:true,
            comboId: 'comboF'
        },




        // {
        //     id: '',
        //     containerCode:'',
        //     type: 'rect',
        //     x: 1000,
        //     y: 666,
        //
        //     style: {
        //         fill: 'gray',
        //         stroke: 'transparent',
        //     },
        //     isFree:true,
     // comboId: 'comboF'
        // },
        {
            id: 'KIVA-010-011-01',
            containerCode:'',
            x: 1000,
            y: 687,
            isFree:true,
            comboId: 'comboF'
        },
        {
            id: 'KIVA-010-009-01',
            containerCode:'',
            x: 1000,
            y: 708,
            isFree:true,
            comboId: 'comboF'
        },
        {
            id: 'KIVA-010-005-01',
            containerCode:'',
            x: 1000,
            y: 729,
            isFree:true,
            comboId: 'comboF'
        },
        {
            id: 'KIVA-010-003-01',
            containerCode:'',
            x: 1000,
            y: 750,
            isFree:true,
            comboId: 'comboF'
        },
    ])
    const rightDownNodeB = reactive([
        {
            id: 'KIVA-012-044-01',
            containerCode:'',
            x: 1050,
            y: 435,
            isFree:true,
            comboId: 'comboF'
        },
        {
            id: 'KIVA-012-042-01',
            containerCode:'',
            x: 1050,
            y: 456,
            isFree:true,
            comboId: 'comboF'
        },
        {
            id: 'KIVA-012-038-01',
            containerCode:'',
            x: 1050,
            y: 477,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-012-036-01',
            containerCode:'',
            x: 1050,
            y: 498,
            isFree:true,
             comboId: 'comboF'
        },
        // {
        //     id: '',
        //     containerCode:'',
        //     type: 'rect',
        //     x: 1000,
        //     y: 519,
        //
        //     style: {
        //         fill: 'gray',
        //         stroke: 'transparent',
        //     },
        //     isFree:true,
     // comboId: 'comboF'
        // },
        {
            id: 'KIVA-012-030-01',
            containerCode:'',
            x: 1050,
            y: 540,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-012-028-01',
            containerCode:'',
            x: 1050,
            y: 561,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-012-025-01',
            containerCode:'',
            x: 1050,
            y: 582,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-012-023-01',
            containerCode:'',
            x: 1050,
            y: 603,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-012-019-01',
            containerCode:'',
            x: 1050,
            y: 624,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-012-017-01',
            containerCode:'',
            x: 1050,
            y: 645,
            isFree:true,
             comboId: 'comboF'
        },




        // {
        //     id: '',
        //     containerCode:'',
        //     type: 'rect',
        //     x: 1050,
        //     y: 666,
        //
        //     style: {
        //         fill: 'gray',
        //         stroke: 'transparent',
        //     },
        //     isFree:true,
     // comboId: 'comboF'
        // },
        {
            id: 'KIVA-012-011-01',
            containerCode:'',
            x: 1050,
            y: 687,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-012-009-01',
            containerCode:'',
            x: 1050,
            y: 708,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-012-005-01',
            containerCode:'',
            x: 1050,
            y: 729,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-012-003-01',
            containerCode:'',
            x: 1050,
            y: 750,
            isFree:true,
             comboId: 'comboF'
        },


        // 右
        {
            id: 'KIVA-013-044-01',
            containerCode:'',
            x: 1080,
            y: 435,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-013-042-01',
            containerCode:'',
            x: 1080,
            y: 456,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-013-038-01',
            containerCode:'',
            x: 1080,
            y: 477,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-013-036-01',
            containerCode:'',
            x: 1080,
            y: 498,
            isFree:true,
             comboId: 'comboF'
        },
        // {
        //     id: '',
        //     containerCode:'',
        //     type: 'rect',
        //     x: 1080,
        //     y: 519,
        //
        //     style: {
        //         fill: 'gray',
        //         stroke: 'transparent',
        //     },
        //     isFree:true,
     // comboId: 'comboF'
        // },
        {
            id: 'KIVA-013-030-01',
            containerCode:'',
            x: 1080,
            y: 540,
            isFree:true,
             comboId: 'comboF'
        },
        // {
        //     id: '',
        //     containerCode:'',
        //     type: 'rect',
        //     x: 1080,
        //     y: 561,
        //
        //     style: {
        //         fill: 'gray',
        //         stroke: 'transparent',
        //     },
        //     isFree:true,
     // comboId: 'comboF'
        // },
        {
            id: 'KIVA-013-025-01',
            containerCode:'',
            x: 1080,
            y: 582,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-013-023-01',
            containerCode:'',
            x: 1080,
            y: 603,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-013-019-01',
            containerCode:'',
            x: 1080,
            y: 624,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-013-017-01',
            containerCode:'',
            x: 1080,
            y: 645,
            isFree:true,
             comboId: 'comboF'
        },




        // {
        //     id: '',
        //     containerCode:'',
        //     type: 'rect',
        //     x: 1080,
        //     y: 666,
        //
        //     style: {
        //         fill: 'gray',
        //         stroke: 'transparent',
        //     },
        //     isFree:true,
     // comboId: 'comboF'
        // },
        {
            id: 'KIVA-013-011-01',
            containerCode:'',
            x: 1080,
            y: 687,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-013-009-01',
            containerCode:'',
            x: 1080,
            y: 708,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-013-005-01',
            containerCode:'',
            x: 1080,
            y: 729,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-013-003-01',
            containerCode:'',
            x: 1080,
            y: 750,
            isFree:true,
             comboId: 'comboF'
        },
    ])
    const rightDownNodeC = reactive([
        {
            id: 'KIVA-014-044-01',
            containerCode:'',
            x: 1130,
            y: 435,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-014-042-01',
            containerCode:'',
            x: 1130,
            y: 456,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-014-038-01',
            containerCode:'',
            x: 1130,
            y: 477,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-014-036-01',
            containerCode:'',
            x: 1130,
            y: 498,
            isFree:true,
             comboId: 'comboF'
        },
        // {
        //     id: '',
        //     containerCode:'',
        //     type: 'rect',
        //     x: 1130,
        //     y: 519,
        //
        //     style: {
        //         fill: 'gray',
        //         stroke: 'transparent',
        //     },
        //     isFree:true,
        //  comboId: 'comboF'
        // },
        {
            id: 'KIVA-014-030-01',
            containerCode:'',
            x: 1130,
            y: 540,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-014-028-01',
            containerCode:'',
            x: 1130,
            y: 561,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-014-025-01',
            containerCode:'',
            x: 1130,
            y: 582,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-014-023-01',
            containerCode:'',
            x: 1130,
            y: 603,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-014-019-01',
            containerCode:'',
            x: 1130,
            y: 624,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-014-017-01',
            containerCode:'',
            x: 1130,
            y: 645,
            isFree:true,
             comboId: 'comboF'
        },




        // {
        //     id: '',
        //     containerCode:'',
        //     type: 'rect',
        //     x: 1130,
        //     y: 666,
        //
        //     style: {
        //         fill: 'gray',
        //         stroke: 'transparent',
        //     },
        //     isFree:true,
        //  comboId: 'comboF'
        // },
        {
            id: 'KIVA-014-011-01',
            containerCode:'',
            x: 1130,
            y: 687,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-014-009-01',
            containerCode:'',
            x: 1130,
            y: 708,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-014-005-01',
            containerCode:'',
            x: 1130,
            y: 729,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-014-003-01',
            containerCode:'',
            x: 1130,
            y: 750,
            isFree:true,
             comboId: 'comboF'
        },


        // 右
        {
            id: 'KIVA-015-044-01',
            containerCode:'',
            x: 1160,
            y: 435,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-015-042-01',
            containerCode:'',
            x: 1160,
            y: 456,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-015-038-01',
            containerCode:'',
            x: 1160,
            y: 477,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-015-036-01',
            containerCode:'',
            x: 1160,
            y: 498,
            isFree:true,
             comboId: 'comboF'
        },
        // {
        //     id: '',
        //     containerCode:'',
        //     type: 'rect',
        //     x: 1160,
        //     y: 519,
        //
        //     style: {
        //         fill: 'gray',
        //         stroke: 'transparent',
        //     },
        //     isFree:true,
        //  comboId: 'comboF'
        // },
        {
            id: 'KIVA-015-030-01',
            containerCode:'',
            x: 1160,
            y: 540,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-015-028-01',
            containerCode:'',
            x: 1160,
            y: 561,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-015-025-01',
            containerCode:'',
            x: 1160,
            y: 582,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-015-023-01',
            containerCode:'',
            x: 1160,
            y: 603,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-015-019-01',
            containerCode:'',
            x: 1160,
            y: 624,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-015-017-01',
            containerCode:'',
            x: 1160,
            y: 645,
            isFree:true,
             comboId: 'comboF'
        },




        // {
        //     id: '',
        //     containerCode:'',
        //     type: 'rect',
        //     x: 1160,
        //     y: 666,
        //
        //     style: {
        //         fill: 'gray',
        //         stroke: 'transparent',
        //     },
        //     isFree:true,
        //  comboId: 'comboF'
        // },
        {
            id: 'KIVA-015-011-01',
            containerCode:'',
            x: 1160,
            y: 687,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-015-009-01',
            containerCode:'',
            x: 1160,
            y: 708,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-015-005-01',
            containerCode:'',
            x: 1160,
            y: 729,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-015-003-01',
            containerCode:'',
            x: 1160,
            y: 750,
            isFree:true,
             comboId: 'comboF'
        },
    ])
    const rightDownNodeD = reactive([
        {
            id: 'KIVA-017-044-01',
            containerCode:'',
            x: 1210,
            y: 435,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-017-042-01',
            containerCode:'',
            x: 1210,
            y: 456,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-017-038-01',
            containerCode:'',
            x: 1210,
            y: 477,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-017-036-01',
            containerCode:'',
            x: 1210,
            y: 498,
            isFree:true,
             comboId: 'comboF'
        },
        // {
        //     id: '',
        //     containerCode:'',
        //     type: 'rect',
        //     x: 1210,
        //     y: 519,
        //
        //     style: {
        //         fill: 'gray',
        //         stroke: 'transparent',
        //     },
        //     isFree:true,
        //  comboId: 'comboF'
        // },
        {
            id: 'KIVA-017-030-01',
            containerCode:'',
            x: 1210,
            y: 540,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-017-028-01',
            containerCode:'',
            x: 1210,
            y: 561,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-017-025-01',
            containerCode:'',
            x: 1210,
            y: 582,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-017-023-01',
            containerCode:'',
            x: 1210,
            y: 603,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-017-019-01',
            containerCode:'',
            x: 1210,
            y: 624,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-017-017-01',
            containerCode:'',
            x: 1210,
            y: 645,
            isFree:true,
             comboId: 'comboF'
        },




        // {
        //     id: '',
        //     containerCode:'',
        //     type: 'rect',
        //     x: 1210,
        //     y: 666,
        //
        //     style: {
        //         fill: 'gray',
        //         stroke: 'transparent',
        //     },
        //     isFree:true,
        //  comboId: 'comboF'
        // },
        {
            id: 'KIVA-017-011-01',
            containerCode:'',
            x: 1210,
            y: 687,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-017-009-01',
            containerCode:'',
            x: 1210,
            y: 708,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-017-005-01',
            containerCode:'',
            x: 1210,
            y: 729,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-017-003-01',
            containerCode:'',
            x: 1210,
            y: 750,
            isFree:true,
             comboId: 'comboF'
        },


        // 右
        {
            id: 'KIVA-018-044-01',
            containerCode:'',
            x: 1240,
            y: 435,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-018-042-01',
            containerCode:'',
            x: 1240,
            y: 456,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-018-038-01',
            containerCode:'',
            x: 1240,
            y: 477,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-018-036-01',
            containerCode:'',
            x: 1240,
            y: 498,
            isFree:true,
             comboId: 'comboF'
        },
        // {
        //     id: '',
        //     containerCode:'',
        //     type: 'rect',
        //     x: 1240,
        //     y: 519,
        //
        //     style: {
        //         fill: 'gray',
        //         stroke: 'transparent',
        //     },
        //     isFree:true,
        //  comboId: 'comboF'
        // },
        {
            id: 'KIVA-018-030-01',
            containerCode:'',
            x: 1240,
            y: 540,
            isFree:true,
             comboId: 'comboF'
        },
        // {
        //     id: '',
        //     containerCode:'',
        //     type: 'rect',
        //     x: 1240,
        //     y: 561,
        //
        //     style: {
        //         fill: 'gray',
        //         stroke: 'transparent',
        //     },
        //     isFree:true,
        //  comboId: 'comboF'
        // },
        {
            id: 'KIVA-018-025-01',
            containerCode:'',
            x: 1240,
            y: 582,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-018-023-01',
            containerCode:'',
            x: 1240,
            y: 603,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-018-019-01',
            containerCode:'',
            x: 1240,
            y: 624,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-018-017-01',
            containerCode:'',
            x: 1240,
            y: 645,
            isFree:true,
             comboId: 'comboF'
        },




        // {
        //     id: '',
        //     containerCode:'',
        //     type: 'rect',
        //     x: 1240,
        //     y: 666,
        //
        //     style: {
        //         fill: 'gray',
        //         stroke: 'transparent',
        //     },
        //     isFree:true,
        //         comboId: 'comboF'
        // },
        {
            id: 'KIVA-018-011-01',
            containerCode:'',
            x: 1240,
            y: 687,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-018-009-01',
            containerCode:'',
            x: 1240,
            y: 708,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-018-005-01',
            containerCode:'',
            x: 1240,
            y: 729,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-018-003-01',
            containerCode:'',
            x: 1240,
            y: 750,
            isFree:true,
             comboId: 'comboF'
        },
    ])
    const rightDownNodeE = reactive([
        {
            id: 'KIVA-019-044-01',
            containerCode:'',
            x: 1290,
            y: 435,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-019-042-01',
            containerCode:'',
            x: 1290,
            y: 456,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-019-038-01',
            containerCode:'',
            x: 1290,
            y: 477,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-019-036-01',
            containerCode:'',
            x: 1290,
            y: 498,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-019-033-01',
            containerCode:'',
            x: 1290,
            y: 519,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-019-030-01',
            containerCode:'',
            x: 1290,
            y: 540,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-019-028-01',
            containerCode:'',
            x: 1290,
            y: 561,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-019-025-01',
            containerCode:'',
            x: 1290,
            y: 582,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-019-023-01',
            containerCode:'',
            x: 1290,
            y: 603,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-019-019-01',
            containerCode:'',
            x: 1290,
            y: 624,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-019-017-01',
            containerCode:'',
            x: 1290,
            y: 645,
            isFree:true,
             comboId: 'comboF'
        },

        {
            id: 'KIVA-019-014-01',
            containerCode:'',
            x: 1290,
            y: 666,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-019-011-01',
            containerCode:'',
            x: 1290,
            y: 687,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-019-009-01',
            containerCode:'',
            x: 1290,
            y: 708,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-019-005-01',
            containerCode:'',
            x: 1290,
            y: 729,
            isFree:true,
             comboId: 'comboF'
        },
        {
            id: 'KIVA-019-003-01',
            containerCode:'',
            x: 1290,
            y: 750,
            isFree:true,
            comboId: 'comboF'
        },

    ])
    return {
        pageData,
        leftAcrossNode,
        leftVerticalNode,
        leftUpNode,
        leftDownNode,
        reightAcrossNode,
        rightUpNode,
        rightDownNodeA,
        rightDownNodeB,
        rightDownNodeC,
        rightDownNodeD,
        rightDownNodeE
    }
}
