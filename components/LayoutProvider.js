import {GridLayoutProvider} from 'recyclerlistview-gridlayoutprovider';
const MAX_SPAN = 4;
export default class LayoutProvider extends GridLayoutProvider {
  constructor(props) {
    super(
      MAX_SPAN,
      index => {
        return props.getDataForIndex(index).type;
      },
      (index) => 2,
      (index) => {
         
        return 220;
      },
     
    );
  }
}
