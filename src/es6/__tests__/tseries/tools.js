/**
 * to_datetime
 *
 * Description:
 * Primary author(s):
 * Secondary author(s):
 *
 * Notes:
 *
 * January 11, 2017
 * StratoDem Analytics, LLC
 */

import Immutable from 'immutable';

import { Series, DataFrame } from '../../core/index';
import { to_datetime } from '../../tseries/tools';


describe('tools', () => {
  describe('to_datetime', () => {
    it('converts a Series to a datetime Series', () => {
      const ds = new Series(['March 1 2015', 'May 2 2016']);
      expect(ds.dtype.dtype).toEqual('object');

      const dsTs = to_datetime(ds);
      expect(dsTs.dtype.dtype).toEqual('datetime');
      expect(dsTs.iloc(0)).toBeInstanceOf(Date);
      expect(dsTs.iloc(0).getMonth() + 1).toEqual(3);
      expect(dsTs.iloc(0).getDay() + 1).toEqual(1);
      expect(dsTs.iloc(0).getYear() + 1900).toEqual(2015);
      expect(dsTs.iloc(1)).toBeInstanceOf(Date);
      expect(dsTs.iloc(1).getMonth() + 1).toEqual(5);
      expect(dsTs.iloc(1).getDay() + 1).toEqual(2);
      expect(dsTs.iloc(1).getYear() + 1900).toEqual(2016);
    });

    it('converts a DataFrame to a datetime Series', () => {
      const df = new DataFrame([{x: 'March 1 2015', y: 'May 2 2016'}]);

      const dfTs = to_datetime(df);
      expect(dfTs.length).toEqual(1);
      expect(dfTs.get('x').dtype.dtype).toEqual('datetime');
      expect(dfTs.get('x').iloc(0)).toBeInstanceOf(Date);
      expect(dfTs.get('x').iloc(0).getMonth() + 1).toEqual(3);
      expect(dfTs.get('x').iloc(0).getDay() + 1).toEqual(1);
      expect(dfTs.get('x').iloc(0).getYear() + 1900).toEqual(2015);
      expect(dfTs.get('y').dtype.dtype).toEqual('datetime');
      expect(dfTs.get('y').iloc(0)).toBeInstanceOf(Date);
      expect(dfTs.get('y').iloc(0).getMonth() + 1).toEqual(5);
      expect(dfTs.get('y').iloc(0).getDay() + 1).toEqual(2);
      expect(dfTs.get('y').iloc(0).getYear() + 1900).toEqual(2016);
    });

    it('converts a List to a datetime List', () => {
      const testList = Immutable.List.of('March 1 2015', 'May 2 2016');

      const listTs = to_datetime(testList);

      expect(listTs.get(0)).toBeInstanceOf(Date);
      expect(listTs.get(0).getMonth() + 1).toEqual(3);
      expect(listTs.get(0).getDay() + 1).toEqual(1);
      expect(listTs.get(0).getYear() + 1900).toEqual(2015);
      expect(listTs.get(1)).toBeInstanceOf(Date);
      expect(listTs.get(1).getMonth() + 1).toEqual(5);
      expect(listTs.get(1).getDay() + 1).toEqual(2);
      expect(listTs.get(1).getYear() + 1900).toEqual(2016);
    });

    it('converts an Array to a datetime List', () => {
      const testArray = ['March 1 2015', 'May 2 2016'];

      const arrayTs = to_datetime(testArray);

      expect(arrayTs[0]).toBeInstanceOf(Date);
      expect(arrayTs[0].getMonth() + 1).toEqual(3);
      expect(arrayTs[0].getDay() + 1).toEqual(1);
      expect(arrayTs[0].getYear() + 1900).toEqual(2015);
      expect(arrayTs[1]).toBeInstanceOf(Date);
      expect(arrayTs[1].getMonth() + 1).toEqual(5);
      expect(arrayTs[1].getDay() + 1).toEqual(2);
      expect(arrayTs[1].getYear() + 1900).toEqual(2016);
    });

    it('allows for setting an index as a datetime', () => {
      const ds = new Series([1, 2, 3, 4],
        {index: ['January 2016', 'February 2016', 'March 2016', 'April 2016']});
      ds.index = to_datetime(ds.index);

      expect(ds.index.get(0).getMonth() + 1).toEqual(1);
      expect(ds.index.get(3).getMonth() + 1).toEqual(4);
    });
  });
});
