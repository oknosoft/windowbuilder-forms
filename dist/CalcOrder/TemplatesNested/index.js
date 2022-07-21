import Lazy from 'metadata-react/DumbLoader/Lazy';
export default class Templates extends Lazy {
  componentDidMount() {
    import('./Frame').then(module => {
      $p.cat.templates._select_template.init(true).then(() => {
        this.setState({
          Component: module.default
        });
      });
    });
  }

}