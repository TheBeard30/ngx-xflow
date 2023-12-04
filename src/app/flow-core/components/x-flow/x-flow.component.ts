import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Injector,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Application } from '@/app/flow-core/models';
import { initApp } from '@/app/flow-core/utils/app.util';
import { XFlowGraphCommands } from '@/app/flow-core/constants';
import { HookConfig } from '@/app/flow-core/hooks/hook-config';
import { IGraphConfig, NsGraph } from '@/app/flow-core/interfaces';
import { HookService } from '@/app/flow-core/services/hook.service';

@Component({
  selector: 'app-x-flow',
  templateUrl: './x-flow.component.html',
  styleUrls: ['./x-flow.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XFlowComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('XFlow') XFlow!: ElementRef;

  @ContentChildren('content') content!: QueryList<any>;

  @Input() meta!: NsGraph.IGraphMeta;

  @Input() graphConfig: IGraphConfig;

  @Input() onload?: (app: Application) => void;

  @Input() graphData!: NsGraph.IGraphData;

  @Input() hookConfig?: HookConfig;

  haveCanvasComponent = false;

  app: Application;

  constructor(
    private injector: Injector,
    private hookService: HookService<any>
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hookConfig && changes.hookConfig.currentValue) {
      this.hookService.setHookConfig(this.hookConfig);
    }
  }

  ngOnInit(): void {
    this.app = initApp(this.injector);
    this.app.start();
    if (this.onload) {
      this.onload(this.app);
    }
    setTimeout(async () => {
      // await this.app.commandService.executeCommand(XFlowGraphCommands.GRAPH_LAYOUT.id, { graphData: this.graphData });
      await this.app.commandService.executeCommand(
        XFlowGraphCommands.GRAPH_RENDER.id,
        { graphData: this.graphData },
        null
      );
      this.app.getGraphInstance().then(g => g.centerContent());
    }, 1000);
  }

  ngAfterViewInit(): void {
    this.haveCanvasComponent = this.content.some(child => child && child.isXFlowCanvas);
  }
}