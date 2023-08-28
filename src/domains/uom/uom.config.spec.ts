import UOM from './uom.config';
import { test, expect } from 'vitest';

test('should have things', () => {
  expect(UOM.dollars.type).toBe('currency');
  expect(UOM.hour.type).toBe('time');
  expect(UOM.cpound.type).toBe('currency');
  expect(UOM.timer.display(3600)).toBe('1h 0m');
  expect(UOM.sec.display(3600)).toBe('60m');
});

test('should have display functions', () => {
  expect(UOM.peso.display(12)).toBeTruthy();
  expect(UOM.franc.display(12)).toBeTruthy();
  expect(UOM.cpound.display(12)).toBeTruthy();
  expect(UOM.rupee.display(12)).toBeTruthy();
  expect(UOM.yen.display(12)).toBeTruthy();
  expect(UOM.yuan.display(12)).toBeTruthy();
  expect(UOM.euro.display(12)).toBeTruthy();
  expect(UOM.timer.display(12)).toBeTruthy();
  expect(UOM.sec.display(12)).toBeTruthy();

  expect(UOM.min.display(12)).toBeTruthy();
  expect(UOM.min.display(100)).toBeTruthy();
  expect(UOM.min.display(2000)).toBeTruthy();
  expect(UOM.min.display(20000)).toBeTruthy();

  expect(UOM.hour.display(12)).toBe('12h');
  expect(UOM.hour.display(200)).toBe('8d');
});

test('should have all uoms', () => {
  expect(UOM.reps.type).toBeTruthy();
  expect(UOM.percent.type).toBeTruthy();
  expect(UOM.dollars.type).toBeTruthy();
  expect(UOM.peso.type).toBeTruthy();
  expect(UOM.franc.type).toBeTruthy();
  expect(UOM.cpound.type).toBeTruthy();
  expect(UOM.rupee.type).toBeTruthy();
  expect(UOM.yen.type).toBeTruthy();
  expect(UOM.yuan.type).toBeTruthy();
  expect(UOM.bitcoin.type).toBeTruthy();
  expect(UOM.euro.type).toBeTruthy();
  expect(UOM.timer.type).toBeTruthy();
  expect(UOM.sec.type).toBeTruthy();
  expect(UOM.min.type).toBeTruthy();
  expect(UOM.hour.type).toBeTruthy();
  expect(UOM.day.type).toBeTruthy();
  expect(UOM.mm.type).toBeTruthy();
  expect(UOM.cm.type).toBeTruthy();
  expect(UOM.meter.type).toBeTruthy();
  expect(UOM.km.type).toBeTruthy();
  expect(UOM.inch.type).toBeTruthy();
  expect(UOM.degrees.type).toBeTruthy();
  expect(UOM.celsius.type).toBeTruthy();
  expect(UOM.fahrenheit.type).toBeTruthy();
  expect(UOM.foot.type).toBeTruthy();
  expect(UOM.yard.type).toBeTruthy();
  expect(UOM.mile.type).toBeTruthy();
  expect(UOM.mg.type).toBeTruthy();
  expect(UOM.gram.type).toBeTruthy();
  expect(UOM.kg.type).toBeTruthy();
  expect(UOM.stone.type).toBeTruthy();
  expect(UOM.oz.type).toBeTruthy();
  expect(UOM.pound.type).toBeTruthy();
  expect(UOM.cup.type).toBeTruthy();
  expect(UOM.fluidounce.type).toBeTruthy();
  expect(UOM.pint.type).toBeTruthy();
  expect(UOM.quart.type).toBeTruthy();
  expect(UOM.gallon.type).toBeTruthy();
  expect(UOM.liter.type).toBeTruthy();
  expect(UOM.milliliter.type).toBeTruthy();
});
