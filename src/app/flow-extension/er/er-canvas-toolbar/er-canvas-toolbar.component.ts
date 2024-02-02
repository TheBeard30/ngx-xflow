import { Application } from '@/app/flow-core/models';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Node } from '@antv/x6';
import * as MODELS from '@/app/flow-core/constants/model-constant';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-er-canvas-toolbar',
  templateUrl: './er-canvas-toolbar.component.html',
  styleUrls: ['./er-canvas-toolbar.component.less']
})
export class ErCanvasToolbarComponent implements OnInit {
  selectedNode: Node[] = [];
  //画布状态监听
  @Output() changeGraphStatus = new EventEmitter<string>;
  constructor(private app: Application, private message: NzMessageService) { }

  ngOnInit(): void {
    const modelService = this.app && this.app?.modelService;
    if (modelService) {
      MODELS.SELECTED_NODES.getModel(modelService).then(model => {
        model.watch(async () => {
          const nodes = await MODELS.SELECTED_NODES.useValue(modelService);
          this.selectedNode = nodes;
        })
      });
    }
  }
  //添加节点按钮事件
  addNode() {
    this.message.info('鼠标移动到画布空白位置, 再次点击鼠标完成创建', { nzDuration: 2000 })
    this.changeGraphStatus.emit('CREATE')
  }
  //删除节点按钮样式交互
  isDisable(): string {
    return this.selectedNode.length > 0 ? 'text-[rgba(0,0,0,.65)] hover:text-[#000] cursor-pointer' : 'cursor-not-allowed text-[rgba(0,0,0,0.3)]';
  }
  //删除节点
  delNode() {
    console.log('delNode')
  }
}
