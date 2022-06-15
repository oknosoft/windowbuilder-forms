export default function ({
  utils,
  md
}) {
  utils._patch(md._m, {
    cat: {
      cnns: {
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
                fld: 'cnn_type'
              }]
            }, {
              element: 'DataField',
              fld: 'note'
            }]
          }
        }
      }
    }
  });
}