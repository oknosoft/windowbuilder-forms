export default function ({
  utils,
  md
}) {
  utils._patch(md._m, {
    cat: {
      clrs: {
        form: {
          obj: {
            items: [{
              element: 'FormGroup',
              row: true,
              items: [{
                element: 'DataField',
                fld: 'name'
              }, {
                element: 'DataField',
                fld: 'id'
              }, {
                element: 'DataField',
                fld: 'parent',
                'label': 'Папка'
              }]
            }, {
              element: 'FormGroup',
              row: true,
              items: [{
                element: 'DataField',
                fld: 'clr_in'
              }, {
                element: 'DataField',
                fld: 'clr_out'
              }, {
                element: 'DataField',
                fld: 'grouping'
              }]
            }, {
              element: 'FormGroup',
              row: true,
              items: [{
                element: 'FieldColor',
                fld: 'clr_str'
              }, {
                element: 'DataField',
                fld: 'machine_tools_clr'
              }, {
                element: 'DataField',
                fld: 'ral'
              }]
            }]
          }
        }
      }
    }
  });
}