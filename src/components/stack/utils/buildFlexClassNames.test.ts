import { buildFlexClassNames } from './buildFlexClassNames';

describe('buildFlexClassNames', () => {
  it('파라미터가 없는 경우 flex만 반환합니다.', () => {
    const classNames = buildFlexClassNames({});
    expect(classNames).toEqual('flex');
  });

  it('flex-direction 파라미터가 있는 경우 flex-direction 클래스를 반환합니다.', () => {
    const classNames = buildFlexClassNames({ direction: 'row' });
    expect(classNames).toEqual('flex flex-row');
  });

  it('flex-wrap 파라미터가 있는 경우 flex-wrap 클래스를 반환합니다.', () => {
    const classNames = buildFlexClassNames({ wrap: 'wrap' });
    expect(classNames).toEqual('flex flex-wrap');
  });

  it('align-items 파라미터가 있는 경우 align-items 클래스를 반환합니다.', () => {
    const classNames = buildFlexClassNames({ align: 'center' });
    expect(classNames).toEqual('flex align-center');
  });

  it('justify-content 파라미터가 있는 경우 justify-content 클래스를 반환합니다.', () => {
    const classNames = buildFlexClassNames({ justify: 'center' });
    expect(classNames).toEqual('flex justify-center');
  });

  it('모든 파라미터가 있는 경우 모든 클래스를 반환합니다.', () => {
    const classNames = buildFlexClassNames({ direction: 'row', wrap: 'wrap', align: 'center', justify: 'center' });
    expect(classNames).toEqual('flex flex-row flex-wrap align-center justify-center');
  });
});
