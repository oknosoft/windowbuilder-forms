import TemplatesFrame from './index';
import { TemplatesFrameInline } from '../Templates';
export default function ({
  ui
}) {
  const {
    dialogs
  } = ui;
  dialogs.templates_nested = function templates_nested() {
    return dialogs.alert({
      title: 'Шаблон вложения',
      hide_btn: true,
      initFullScreen: true,
      timeout: 220000,
      Component: TemplatesFrame
    });
  };
  dialogs.templates_inline = function templates_inline(layer) {
    return dialogs.alert({
      timeout: 220000,
      title: `Укажите шаблон для слоя`,
      Component: TemplatesFrameInline,
      props: {
        layer
      },
      initFullScreen: true,
      hide_btn: true,
      noSpace: true
    });
  };
}