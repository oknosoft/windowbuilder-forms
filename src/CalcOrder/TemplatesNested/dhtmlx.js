
import TemplatesFrame from './index';

export default function ({ui}) {
  const {dialogs} = ui;
  dialogs.templates_nested = function () {
    return dialogs.alert({
      title: 'Шаблон вложения',
      hide_btn: true,
      initFullScreen: true,
      timeout: 180000,
      Component: TemplatesFrame,
    });
  };
}
