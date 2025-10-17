import { ReactNode, useRef } from 'react';

interface Props {
  /**
   * 지연 평가를 즉시 실행할지 여부를 결정하는 플래그
   * true인 경우 children이 즉시 평가되어 렌더링됨
   * false 또는 undefined인 경우 지연 평가 상태를 유지
   * @default false
   */
  isEvaluate?: boolean;
  /**
   * 지연 평가 상태를 받아서 ReactNode를 반환하는 렌더 함수
   *
   * @param isEvaluate - 현재 컴포넌트의 평가 상태 (isEvaluate prop 값)
   * @returns 렌더링할 React 요소
   *
   * @example
   * ```tsx
   * <LazyEvaluation isEvaluate={activeTab === 'analytics'}>
   *   {(isActive) => (
   *     <div style={{ display: isActive ? 'block' : 'none' }}>
   *       <HeavyAnalyticsChart />
   *     </div>
   *   )}
   * </LazyEvaluation>
   * ```
   */
  children?: (isEvaluate: boolean) => ReactNode;
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
 * ```tsx
 * <>
 *   <TabRoot>
 *     <TabItem tabId="list">상품목록</TabItem>
 *     <TabItem tabId="analytics">분석</TabItem>
 *   </TabRoot>
 *   <LazyEvaluation isEvaluate={activeTab === 'list'}>
 *     {(isActive) => (
 *       <div style={{ display: isActive ? 'block' : 'none' }}>
 *         <HeavyProductList />
 *       </div>
 *     )}
 *   </LazyEvaluation>
 *   <LazyEvaluation isEvaluate={activeTab === 'analytics'}>
 *     {(isActive) => (
 *       <div style={{ display: isActive ? 'block' : 'none' }}>
 *         <HeavyAnalyticsChart />
 *       </div>
 *     )}
 *   </LazyEvaluation>
 * </>
 * ```
 */
export const LazyEvaluation = ({ isEvaluate = false, children }: Props) => {
  const hasBeenEvaluated = useRef<boolean>(isEvaluate);
  if (!hasBeenEvaluated.current) {
    hasBeenEvaluated.current = isEvaluate;
  }
  return hasBeenEvaluated.current ? children?.(isEvaluate) : null;
};
