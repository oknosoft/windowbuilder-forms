import React from 'react';
import Lazy from 'metadata-react/DumbLoader/Lazy';
export default class Templates extends Lazy {
  componentDidMount() {
    import('./Frame').then(module => {
      $p.cat.templates._select_template.init().then(() => this.setState({
        Component: module.default
      }));
    });
  }
}
const FrameInline = /*#__PURE__*/React.lazy(() => import('./FrameInline'));
export function TemplatesFrameInline(props) {
  return /*#__PURE__*/React.createElement(React.Suspense, {
    fallback: "Загрузка..."
  }, /*#__PURE__*/React.createElement(FrameInline, props));
}