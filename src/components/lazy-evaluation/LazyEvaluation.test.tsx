import { render } from '@testing-library/react';
import { LazyEvaluation } from './LazyEvaluation';

describe('LazyEvaluation', () => {
  it('isEvaluate가 false일 때 children을 렌더링하지 않습니다', () => {
    const { container } = render(
      <LazyEvaluation isEvaluate={false}>{() => <div>테스트 컴포넌트</div>}</LazyEvaluation>,
    );
    expect(container.firstChild).toBeNull();
  });

  it('isEvaluate가 true일 때 children을 렌더링합니다', () => {
    const { getByText } = render(<LazyEvaluation isEvaluate={true}>{() => <div>테스트 컴포넌트</div>}</LazyEvaluation>);
    expect(getByText('테스트 컴포넌트')).toBeInTheDocument();
  });

  it('children 함수에 isEvaluate 값이 전달됩니다', () => {
    const childrenFn = vi.fn(() => <div>테스트</div>);
    render(<LazyEvaluation isEvaluate={true}>{childrenFn}</LazyEvaluation>);
    expect(childrenFn).toHaveBeenCalledWith(true);
  });

  it('한번 평가된 후에는 isEvaluate가 false가 되어도 계속 렌더링됩니다', () => {
    const { getByText, rerender } = render(
      <LazyEvaluation isEvaluate={true}>{(isEvaluate) => <div>평가됨: {String(isEvaluate)}</div>}</LazyEvaluation>,
    );
    expect(getByText('평가됨: true')).toBeInTheDocument();

    // isEvaluate를 false로 변경
    rerender(
      <LazyEvaluation isEvaluate={false}>{(isEvaluate) => <div>평가됨: {String(isEvaluate)}</div>}</LazyEvaluation>,
    );

    // 여전히 렌더링되지만 isEvaluate 값은 false로 전달됨
    expect(getByText('평가됨: false')).toBeInTheDocument();
  });

  it('isEvaluate가 처음부터 false에서 true로 변경되면 렌더링을 시작합니다', () => {
    const { container, rerender, getByText } = render(
      <LazyEvaluation isEvaluate={false}>{() => <div>테스트 컴포넌트</div>}</LazyEvaluation>,
    );
    expect(container.firstChild).toBeNull();

    // isEvaluate를 true로 변경
    rerender(<LazyEvaluation isEvaluate={true}>{() => <div>테스트 컴포넌트</div>}</LazyEvaluation>);
    expect(getByText('테스트 컴포넌트')).toBeInTheDocument();
  });

  it('isEvaluate가 생략되면 기본값 false로 동작합니다', () => {
    const { container } = render(<LazyEvaluation>{() => <div>테스트 컴포넌트</div>}</LazyEvaluation>);
    expect(container.firstChild).toBeNull();
  });
});
