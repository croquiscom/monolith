import { ReactNode, useRef } from 'react';

interface Props {
  isEvaluate?: boolean;
  children?: (is_evaluate: boolean) => ReactNode;
}

/**
 * 지연 평가 컴포넌트
 * isEvaluate가 true 일 때 children 함수를 통해 자식 컴포넌트를 지연 평가 합니다.
 * 한번 평가된 자식 컴포넌트는 isEvaluate 가 false 가 되더라도 unmount 되지 않고 Component tree 상에서 유지됩니다.
 * 조건부 렌더링이 필요한 무거운 컴포넌트가 있을 때 최적화에 유용하게 사용 할 수 있습니다.
 *
 * (react 19.2 버전부터는 Activity 컴포넌트를 사용 해 주세요.)
 *
 * @param isEvaluate 평가 조건 (true가 되면 이후 계속 활성화)
 * @param children 지연 평가할 컴포넌트를 반환하는 함수
 *
 * @example
 * <LazyEvaluation isEvaluate={isShowHeavyComponent}>
 *   {() => <HeavyComponent />}
 * </LazyEvaluation>
 */
export const LazyEvaluation = ({ isEvaluate = false, children }: Props) => {
  const hasBeenEvaluated = useRef<boolean>(isEvaluate);
  if (!hasBeenEvaluated.current) {
    hasBeenEvaluated.current = isEvaluate;
  }
  return hasBeenEvaluated.current ? children?.(isEvaluate) : null;
};
