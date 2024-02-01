import { GraphProviderService } from '@/app/flow-core/services';
import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-er-node',
  templateUrl: './er-node.component.html',
  styleUrls: ['./er-node.component.less']
})
export class ErNodeComponent {
  @Input() entity: any;
  @Input() id: string;
  constructor(graphProvider: GraphProviderService) {
    graphProvider.getGraphInstance().then(g => {
      const self = g.getCellById(this.id);
    });
  }
  getCls() {

    if (this.entity?.entityType === 'FACT') {
      return 'fact'
    }
    if (this.entity?.entityType === 'DIM') {
      return 'dim'
    }
    if (this.entity?.entityType === 'OTHER') {
      return 'other'
    }
    return ''
  }
}
