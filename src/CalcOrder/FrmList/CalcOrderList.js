/**
 * Форма списка документа Расчет
 *
 * @module CalcOrderList
 *
 * Created by Evgeniy Malyarov on 05.10.2018.
 */

import {withObj, withIface} from 'metadata-redux';
import WindowSizer from 'metadata-react/WindowSize';
import CalcOrderList from './FrmList';

export default WindowSizer(withIface(withObj(CalcOrderList)));

