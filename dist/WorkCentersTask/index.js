import Lazy from 'metadata-react/DumbLoader/Lazy';
import { withIface } from 'metadata-redux';
export default class FrmObj extends Lazy {
  componentDidMount() {
    import('./FrmObj').then(module => this.setState({
      Component: withIface(module.default)
    }));
  }

}