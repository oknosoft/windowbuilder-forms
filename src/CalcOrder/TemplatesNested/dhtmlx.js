
import TemplatesFrame from './index';
import {TemplatesFrameInline} from '../Templates'

export default function ({ui}) {
  const {dialogs} = ui;

  dialogs.templates_nested = function templates_nested() {
    return dialogs.alert({
      title: 'Шаблон вложения',
      hide_btn: true,
      initFullScreen: true,
      timeout: 180000,
      Component: TemplatesFrame,
    });
  };

  dialogs.templates_inline = function templates_inline(layer) {
    return $p.cat.templates._select_template
      .init(true)
      .then(() => dialogs.alert({
        timeout: 180000,
        title: `Укажите шаблон для слоя`,
        Component: TemplatesFrameInline,
        props: {layer},
        initFullScreen: true,
        hide_btn: true,
        noSpace: true,
      }));
  }
}
