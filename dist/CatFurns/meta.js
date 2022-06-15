export default function ({
  utils,
  md
}) {
  utils._patch(md._m, {
    cat: {
      furns: {
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
                fld: 'parent'
              }]
            }, {
              element: 'FormGroup',
              row: true,
              items: [{
                element: 'DataField',
                fld: 'note'
              }, {
                element: 'DataField',
                fld: 'open_type'
              }, {
                element: 'DataField',
                fld: 'is_set'
              }]
            }]
          }
        }
      }
    }
  });
}