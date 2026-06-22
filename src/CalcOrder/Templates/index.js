import React from 'react';
import Lazy from 'metadata-react/DumbLoader/Lazy';

export default class Templates extends Lazy {
  componentDidMount() {
    import('./Frame').then((module) => {
      $p.cat.templates._select_template.init()
        .then(() => this.setState({Component: module.default}));
    });
  }
}

const FrameInline = React.lazy(() => import('./FrameInline'));

export function TemplatesFrameInline(props) {
  return <React.Suspense fallback="Загрузка...">
    <FrameInline {...props}/>
  </React.Suspense>;
}
