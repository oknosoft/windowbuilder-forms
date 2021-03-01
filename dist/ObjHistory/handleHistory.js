// обработчик истории изменений объекта теущей строки
export default function handleHistory = () {
  const {selectedRow: row, props: {handlers, _mgr}} = this;
  const {dp: {buyers_order}, utils}  = $p;

  if(!row || utils.is_empty_guid(row.ref)) {
    return handlers.handleIfaceState({
      component: '',
      name: 'alert',
      value: {open: true, text: 'Укажите строку для вывода истории изменения', title: _mgr.metadata().synonym}
    });
  }

  import('./ObjHistory')
    .then((module) => {
      const Component = module.default;
      const props = {hfields: null, db: null, obj: {ref: row.ref}, _mgr}
      handlers.handleIfaceState({
        component: '',
        name: 'alert',
        value: {open: true, title: 'История', initFullScreen: true, Component, props}
      });
    });

};
