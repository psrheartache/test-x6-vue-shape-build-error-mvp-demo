<template>
  <div class="process-manage">
    <div id="stencil"></div>
    <!-- <div class="hehe">
      <div class="circle">
        <div class="label" :draggable="true">圆</div>
      </div>
    </div> -->
    <div id="container"></div>
    <TeleportContainer />
  </div>
</template>

<script lang="ts" setup>
import { provide, ref, onMounted } from 'vue'
import { Graph } from '@antv/x6'
import { Stencil } from '@antv/x6-plugin-stencil'
import { Scroller } from '@antv/x6-plugin-scroller'
import { register, getTeleport } from '@antv/x6-vue-shape'
import BoxVue from './box.vue'
import ports from './rect'

register({
  shape: 'my-box',
  width: 200,
  height: 200,
  component: BoxVue,
})

provide('getNum', 789)
const TeleportContainer = getTeleport()

const graph = ref()
const oData = ref()
const data = {
  // 节点
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 40, // Number，必选，节点位置的 x 值
      y: 40, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: 'hello', // String，节点标签
    },
    {
      id: 'node2', // String，节点的唯一标识
      x: 160, // Number，必选，节点位置的 x 值
      y: 180, // Number，必选，节点位置的 y 值

      height: 40, // Number，可选，节点大小的 height 值
      label: 'world', // String，节点标签
    },
  ],
  // 边
  edges: [
    {
      source: 'node1', // String，必须，起始节点 id
      target: 'node2', // String，必须，目标节点 id
    },
  ],
}

onMounted(() => {
  graph.value = new Graph({
    container: document.getElementById('container') as HTMLElement,
    grid: true,
    panning: {
      enabled: true,
    },
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: 'ctrl',
      minScale: 0.5,
      maxScale: 3,
    },
  })
  const stencil = new Stencil({
    title: '自动化运营',
    // ts-ignore
    target: graph.value,
    stencilGraphWidth: 200,
    stencilGraphHeight: 70,
    collapsable: true,
    groups: [
      {
        title: '用户',
        name: 'user',
      },
      {
        title: '通道',
        name: 'thoroughfare',
        graphHeight: 70,
        layoutOptions: {
          rowHeight: 70,
        },
      },
      {
        title: '控制器',
        name: 'controller',
        graphHeight: 370,
        layoutOptions: {
          rowHeight: 70,
          // resizeToFit: true,
        },
      },
    ],
    layoutOptions: {
      columns: 2,
      columnWidth: 80,
      rowHeight: 55,
    },
  })
  document.getElementById('stencil')?.appendChild(stencil.container)

  Graph.registerNode(
    'custom-rect',
    {
      inherit: 'rect',
      width: 72,
      height: 36,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        text: {
          fontSize: 12,
          fill: '#262626',
        },
      },
      ports: { ...ports },
    },
    true
  )

  const r1 = graph.value.createNode({
    shape: 'custom-rect',
    label: '开始',
    attrs: {
      body: {
        rx: 20,
        ry: 26,
      },
    },
  })

  const r2 = graph.value.createNode({
    shape: 'custom-rect',
    label: '过程',
  })

  const haha = graph.value.createNode({
    shape: 'my-box',
    width: 200,
    height: 200,
    x: 40, // Number，必选，节点位置的 x 值
    y: 40, // Number，必选，节点位置的 y 值
  })

  stencil.load([r1], 'user')
  stencil.load([r2], 'thoroughfare')
  stencil.load([haha], 'controller')
  graph.value.use(
    new Scroller({
      graph: graph.value,
      enabled: true,
    })
  )
  oData.value = data
  graph.value.fromJSON(oData.value)
  // graph.value.addNode({
  //   shape: 'my-box',
  //   x: 200, // Number，必选，节点位置的 x 值
  //   y: 140, // Number，必选，节点位置的 y 值
  // })
})
</script>

<style lang="less">
.process-manage {
  width: 100%;
  height: 100%;
  display: flex;
  display: flex;
  border: 1px solid #dfe3e8;
  #container {
    width: calc(100% - 180px);
    height: 100%;
  }
  #stencil,
  .hehe {
    width: 180px;
    height: 100%;
    position: relative;
    border-right: 1px solid #dfe3e8;
  }
  .hehe {
    .circle {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: red;
      position: relative;
    }
    .label {
      position: absolute;
      bottom: -20px;
      left: 0;
      width: 100%;
      text-align: center;
    }
  }
  .x6-widget-stencil {
    background-color: #fff;
  }
  .x6-widget-stencil-title {
    background-color: #fff;
  }
  .x6-widget-stencil-group-title {
    background-color: #fff !important;
  }
  .x6-widget-transform {
    margin: -1px 0 0 -1px;
    padding: 0px;
    border: 1px solid #239edd;
  }
  .x6-widget-transform > div {
    border: 1px solid #239edd;
  }
  .x6-widget-transform > div:hover {
    background-color: #3dafe4;
  }
  .x6-widget-transform-active-handle {
    background-color: #3dafe4;
  }
  .x6-widget-transform-resize {
    border-radius: 0;
  }
  .x6-widget-selection-inner {
    border: 1px solid #239edd;
  }
  .x6-widget-selection-box {
    opacity: 0;
  }
}
</style>
