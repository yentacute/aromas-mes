export default function useData() {
    const pageData = reactive({
        nodes: {
            nodesA: [
                {
                    id: 'node1',
                    x: 200,
                    y: 100,
                    size: 40,
                    isFree: true,
                    // type: 'background-animate',
                    color: '#40a9ff',
                    label: '空车回仓任务开始 node1',
                    labelCfg: {
                        position: 'bottom',
                        offset: 10,
                    },
                    // anchorPoints: [
                    //     [0.5, 0.5],
                    // ],
                },
                {
                    id: 'node2',
                    containerCode: '',
                    x: 500,
                    y: 100,
                    size: 40,
                    isFree: true,
                    comboId: 'comboA',
                    // type: 'background-animate',
                    color: '#40a9ff',
                    label: '到达起点（取得容器）node2',
                    labelCfg: {
                        position: 'bottom',
                        offset: 10,
                    },
                },
                {
                    id: 'node3',
                    containerCode: '',
                    x: 800,
                    y: 100,
                    size: 40,
                    isFree: true,
                    comboId: 'comboA',
                    // type: 'background-animate',
                    color: '#40a9ff',
                    label: '到达终点（放下容器）node3',
                    labelCfg: {
                        position: 'bottom',
                        offset: 10,
                    },
                },
                {
                    id: 'node4',
                    containerCode:'',
                    x: 1100,
                    y: 100,
                    size:40,
                    isFree:true,
                    comboId: 'comboA',
                    // type: 'background-animate',
                    color: '#40a9ff',
                    label: '任务完成 node4',
                    labelCfg: {
                        position: 'bottom',
                        offset: 10,
                    },
                },
                // {
                //     id: 'node5',
                //     x: 200,
                //     y: 300,
                //     size:40,
                //     isFree:true,
                //     // type: 'background-animate',
                //     color: '#40a9ff',
                //     label: '满料移位任务开始',
                //     labelCfg: {
                //         position: 'bottom',
                //         offset: 10,
                //     },
                //     // anchorPoints: [
                //     //     [0.5, 0.5],
                //     // ],
                // },
                // {
                //     id: 'node6',
                //     containerCode:'',
                //     x: 500,
                //     y: 300,
                //     size:40,
                //     isFree:true,
                //     comboId: 'comboA',
                //     // type: 'background-animate',
                //     color: '#40a9ff',
                //     label: '到达起点（取得容器）',
                //     labelCfg: {
                //         position: 'bottom',
                //         offset: 10,
                //     },
                // },
                // {
                //     id: 'node7',
                //     containerCode:'',
                //     x: 800,
                //     y: 300,
                //     size:40,
                //     isFree:true,
                //     comboId: 'comboA',
                //     // type: 'background-animate',
                //     color: '#40a9ff',
                //     label: '到达终点（放下容器）',
                //     labelCfg: {
                //         position: 'bottom',
                //         offset: 10,
                //     },
                // },
                // {
                //     id: 'node8',
                //     containerCode:'',
                //     x: 1100,
                //     y: 300,
                //     size:40,
                //     isFree:true,
                //     comboId: 'comboA',
                //     // type: 'background-animate',
                //     color: '#40a9ff',
                //     label: '任务完成',
                //     labelCfg: {
                //         position: 'bottom',
                //         offset: 10,
                //     },
                // },
                // {
                //     id: 'node9',
                //     x: 200,
                //     y: 500,
                //     size:40,
                //     isFree:true,
                //     // type: 'background-animate',
                //     color: '#40a9ff',
                //     label: '满料移位任务开始',
                //     labelCfg: {
                //         position: 'bottom',
                //         offset: 10,
                //     },
                //     // anchorPoints: [
                //     //     [0.5, 0.5],
                //     // ],
                // },
                // {
                //     id: 'node10',
                //     containerCode:'',
                //     x: 500,
                //     y: 500,
                //     size:40,
                //     isFree:true,
                //     comboId: 'comboA',
                //     // type: 'background-animate',
                //     color: '#40a9ff',
                //     label: '到达起点（取得容器）',
                //     labelCfg: {
                //         position: 'bottom',
                //         offset: 10,
                //     },
                // },
                // {
                //     id: 'node11',
                //     containerCode:'',
                //     x: 800,
                //     y: 500,
                //     size:40,
                //     isFree:true,
                //     comboId: 'comboA',
                //     // type: 'background-animate',
                //     color: '#40a9ff',
                //     label: '到达终点（放下容器）',
                //     labelCfg: {
                //         position: 'bottom',
                //         offset: 10,
                //     },
                // },
                // {
                //     id: 'node12',
                //     containerCode:'',
                //     x: 1100,
                //     y: 500,
                //     size:40,
                //     isFree:true,
                //     comboId: 'comboA',
                //     // type: 'background-animate',
                //     color: '#40a9ff',
                //     label: '任务完成',
                //     labelCfg: {
                //         position: 'bottom',
                //         offset: 10,
                //     },
                // },
            ],
            nodesB: [
                {
                    id: 'node4',
                    containerCode: '',
                    x: 1100,
                    y: 100,
                    size: 40,
                    isFree: true,
                    comboId: 'comboA',
                    // type: 'background-animate',
                    color: '#40a9ff',
                    label: '任务完成',
                    labelCfg: {
                        position: 'bottom',
                        offset: 10,
                    },
                },
                {
                    id: 'node5',
                    x: 200,
                    y: 300,
                    size: 40,
                    isFree: true,
                    // type: 'background-animate',
                    color: '#40a9ff',
                    label: '满料移位任务开始',
                    labelCfg: {
                        position: 'bottom',
                        offset: 10,
                    },
                    // anchorPoints: [
                    //     [0.5, 0.5],
                    // ],
                },
                {
                    id: 'node6',
                    containerCode: '',
                    x: 500,
                    y: 300,
                    size: 40,
                    isFree: true,
                    comboId: 'comboA',
                    // type: 'background-animate',
                    color: '#40a9ff',
                    label: '到达起点（取得容器）',
                    labelCfg: {
                        position: 'bottom',
                        offset: 10,
                    },
                },
                {
                    id: 'node7',
                    containerCode: '',
                    x: 800,
                    y: 300,
                    size: 40,
                    isFree: true,
                    comboId: 'comboA',
                    // type: 'background-animate',
                    color: '#40a9ff',
                    label: '到达终点（放下容器）',
                    labelCfg: {
                        position: 'bottom',
                        offset: 10,
                    },
                },
            ],
            nodesC: [
                {
                    id: 'node8',
                    containerCode: '',
                    x: 1100,
                    y: 300,
                    size: 40,
                    isFree: true,
                    comboId: 'comboA',
                    // type: 'background-animate',
                    color: '#40a9ff',
                    label: '任务完成',
                    labelCfg: {
                        position: 'bottom',
                        offset: 10,
                    },
                },
                {
                    id: 'node9',
                    x: 200,
                    y: 500,
                    size: 40,
                    isFree: true,
                    // type: 'background-animate',
                    color: '#40a9ff',
                    label: '满料移位任务开始',
                    labelCfg: {
                        position: 'bottom',
                        offset: 10,
                    },
                    // anchorPoints: [
                    //     [0.5, 0.5],
                    // ],
                },
                {
                    id: 'node10',
                    containerCode: '',
                    x: 500,
                    y: 500,
                    size: 40,
                    isFree: true,
                    comboId: 'comboA',
                    // type: 'background-animate',
                    color: '#40a9ff',
                    label: '到达起点（取得容器）',
                    labelCfg: {
                        position: 'bottom',
                        offset: 10,
                    },
                },
                {
                    id: 'node11',
                    containerCode: '',
                    x: 800,
                    y: 500,
                    size: 40,
                    isFree: true,
                    comboId: 'comboA',
                    // type: 'background-animate',
                    color: '#40a9ff',
                    label: '到达终点（放下容器）',
                    labelCfg: {
                        position: 'bottom',
                        offset: 10,
                    },
                },
                {
                    id: 'node12',
                    containerCode: '',
                    x: 1100,
                    y: 500,
                    size: 40,
                    isFree: true,
                    comboId: 'comboA',
                    // type: 'background-animate',
                    color: '#40a9ff',
                    label: '任务完成',
                    labelCfg: {
                        position: 'bottom',
                        offset: 10,
                    },
                },
            ],
        },
        edges: {
            edgesA: [
                {
                    source: "node1",
                    target: "node2",
                    type: 'can-running',
                    style: {
                        stroke: '#E6E6E6E5',
                    },
                    // midPointColor: '#f00',
                    // quatileColor: '#f00',
                },
                {
                    source: "node2",
                    target: "node3",
                    style: {
                        stroke: '#E6E6E6E5',
                    },
                    type: 'can-running'
                    // midPointColor: '#f00',
                    // quatileColor: '#f00',
                },

                {
                    source: "node3",
                    target: "node4",
                    type: 'can-running'
                    // midPointColor: '#f00',
                    // quatileColor: '#f00',
                },
            ],
            edgesB: [
                {
                    source: "node5",
                    target: "node6",
                    style: {
                        // stroke: '#E6E6E6E5',
                    },
                    type: 'can-running'
                    // midPointColor: '#0f0',
                    // quatileColor: '#0f0',
                },
                {
                    source: "node6",
                    target: "node7",
                    type: 'can-running'
                    // midPointColor: '#0f0',
                    // quatileColor: '#0f0',
                },
                {
                    source: "node7",
                    target: "node8",
                    type: 'can-running'
                    // midPointColor: '#0f0',
                    // quatileColor: '#0f0',
                },
            ],
            edgesC: [
                {
                    source: "node9",
                    target: "node10",
                    style: {
                        stroke: '#E6E6E6E5',
                    },
                    type: 'can-running'
                    // midPointColor: '#0f0',
                    // quatileColor: '#0f0',
                },
                {
                    source: "node10",
                    target: "node11",
                    type: 'can-running',
                    // midPointColor: '#0f0',
                    // quatileColor: '#0f0',
                },
                {
                    source: "node11",
                    target: "node12",
                    type: 'can-running'
                    // midPointColor: '#0f0',
                    // quatileColor: '#0f0',
                }
            ],
        }
    })
    //左上
    const leftUpNode = reactive([
        {
            id: 'node1',
            x: 200,
            y: 100,
            size: 40,
            isFree: true,
            type: 'background-animate',
            color: '#40a9ff',
            label: '空车回仓任务开始',
            labelCfg: {
                position: 'bottom',
                offset: 10,
            },
            // anchorPoints: [
            //     [0.5, 0.5],
            // ],
        },
        {
            id: 'node2',
            containerCode: '',
            x: 500,
            y: 100,
            size: 40,
            isFree: true,
            comboId: 'comboA',
            type: 'background-animate',
            color: '#40a9ff',
            label: '到达起点（取得容器）',
            labelCfg: {
                position: 'bottom',
                offset: 10,
            },
        },
        {
            id: 'node3',
            containerCode: '',
            x: 800,
            y: 100,
            size: 40,
            isFree: true,
            comboId: 'comboA',
            // type: 'background-animate',
            color: '#40a9ff',
            label: '到达终点（放下容器）',
            labelCfg: {
                position: 'bottom',
                offset: 10,
            },
        },
        {
            id: 'node4',
            containerCode: '',
            x: 1100,
            y: 100,
            size: 40,
            isFree: true,
            comboId: 'comboA',
            // type: 'background-animate',
            color: '#40a9ff',
            label: '任务完成',
            labelCfg: {
                position: 'bottom',
                offset: 10,
            },
        },
        {
            id: 'node5',
            x: 200,
            y: 300,
            size: 40,
            isFree: true,
            type: 'background-animate',
            color: '#40a9ff',
            label: '满料移位任务开始',
            labelCfg: {
                position: 'bottom',
                offset: 10,
            },
            // anchorPoints: [
            //     [0.5, 0.5],
            // ],
        },
        {
            id: 'node6',
            containerCode: '',
            x: 500,
            y: 300,
            size: 40,
            isFree: true,
            comboId: 'comboA',
            type: 'background-animate',
            color: '#40a9ff',
            label: '到达起点（取得容器）',
            labelCfg: {
                position: 'bottom',
                offset: 10,
            },
        },
        {
            id: 'node7',
            containerCode: '',
            x: 800,
            y: 300,
            size: 40,
            isFree: true,
            comboId: 'comboA',
            // type: 'background-animate',
            color: '#40a9ff',
            label: '到达终点（放下容器）',
            labelCfg: {
                position: 'bottom',
                offset: 10,
            },
        },
        {
            id: 'node8',
            containerCode: '',
            x: 1100,
            y: 300,
            size: 40,
            isFree: true,
            comboId: 'comboA',
            // type: 'background-animate',
            color: '#40a9ff',
            label: '任务完成',
            labelCfg: {
                position: 'bottom',
                offset: 10,
            },
        },
        {
            id: 'node9',
            x: 200,
            y: 500,
            size: 40,
            isFree: true,
            type: 'background-animate',
            color: '#40a9ff',
            label: '满料移位任务开始',
            labelCfg: {
                position: 'bottom',
                offset: 10,
            },
            // anchorPoints: [
            //     [0.5, 0.5],
            // ],
        },
        {
            id: 'node10',
            containerCode: '',
            x: 500,
            y: 500,
            size: 40,
            isFree: true,
            comboId: 'comboA',
            type: 'background-animate',
            color: '#40a9ff',
            label: '到达起点（取得容器）',
            labelCfg: {
                position: 'bottom',
                offset: 10,
            },
        },
        {
            id: 'node11',
            containerCode: '',
            x: 800,
            y: 500,
            size: 40,
            isFree: true,
            comboId: 'comboA',
            // type: 'background-animate',
            color: '#40a9ff',
            label: '到达终点（放下容器）',
            labelCfg: {
                position: 'bottom',
                offset: 10,
            },
        },
        {
            id: 'node12',
            containerCode: '',
            x: 1100,
            y: 500,
            size: 40,
            isFree: true,
            comboId: 'comboA',
            // type: 'background-animate',
            color: '#40a9ff',
            label: '任务完成',
            labelCfg: {
                position: 'bottom',
                offset: 10,
            },
        },
    ])
    const leftUpNode2 = reactive([
        {
            id: 'node1',
            x: 200,
            y: 337,
            size: 40,
            isFree: true,
            type: 'background-animate',
            color: '#40a9ff',
            anchorPoints: [
                [0.5, 0.5],
            ],
        },
        {
            id: 'node2',
            x: 350,
            y: 337,
            isFree: true,
            comboId: 'comboA',
            style: {
                // fill: 'transparent',
                // stroke: 'transparent',
            },
            anchorPoints: [
                [0.5, 0.5],
            ],
        },
        {
            id: 'node3',
            containerCode: '',
            x: 500,
            y: 337,
            size: 40,
            isFree: true,
            comboId: 'comboA',
            type: 'background-animate',
            color: '#40a9ff',
        },
        {
            id: 'node4',
            containerCode: '',
            x: 650,
            y: 337,
            isFree: true,
            comboId: 'comboA',
            style: {
                // fill: 'transparent',
                // stroke: 'transparent',
            },
            anchorPoints: [
                [0.5, 0.5],
            ],
        },
        {
            id: 'node5',
            containerCode: '',
            x: 800,
            y: 337,
            size: 40,
            isFree: true,
            comboId: 'comboA',
            type: 'background-animate',
            color: '#40a9ff',
        },
        {
            id: 'node6',
            containerCode: '',
            x: 950,
            y: 337,
            isFree: true,
            comboId: 'comboA',
            style: {
                // fill: 'transparent',
                // stroke: 'transparent',
            },
            anchorPoints: [
                [0.5, 0.5],
            ],
        },
        {
            id: 'node7',
            containerCode: '',
            x: 1100,
            y: 337,
            size: 40,
            isFree: true,
            comboId: 'comboA',
            type: 'background-animate',
            color: '#40a9ff',
        },
    ])
    return {
        pageData,
        leftUpNode,
    }
}