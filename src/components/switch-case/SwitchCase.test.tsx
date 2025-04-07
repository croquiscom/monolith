import { render } from '@testing-library/react';
import { SwitchCase } from './SwitchCase';
import '@testing-library/jest-dom';

describe('switch-case', () => {
  it('case에 해당하는 컴포넌트를 렌더링 합니다.', () => {
    const value: number = 1;
    const { getByText } = render(<SwitchCase value={value} cases={{ 1: <div>1번</div>, 2: <div>2번</div> }} />);
    expect(getByText('1번')).toBeInTheDocument();
  });

  it('case에 해당하는 컴포넌트가 없다면 default에 설정된 컴포넌트를 렌더링 합니다.', () => {
    const value: number = 3;
    const { getByText } = render(
      <SwitchCase value={value} default={<div>default</div>} cases={{ 1: <div>1번</div>, 2: <div>2번</div> }} />,
    );
    expect(getByText('default')).toBeInTheDocument();
  });
});
