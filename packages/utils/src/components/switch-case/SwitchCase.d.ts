import { ReactElement } from 'react';
export type Key = string | number | symbol;
/** The props type of {@link SwitchCase | `SwitchCase`}. */
export interface SwitchCaseProps<Case extends Key> {
    /** 렌더링할 값을 결정하는 키 */
    value: Case;
    /** 각 `value` 값에 해당하는 컴포넌트를 매핑하는 객체 */
    cases: Partial<Record<Case, ReactElement>>;
    /** 기본적으로 렌더링할 컴포넌트 (fallback) */
    default?: ReactElement;
}
/**
 * 특정 값(`value`)에 따라 지정된 컴포넌트를 렌더링하는 컴포넌트입니다.
 *
 * @typeParam Case - `value`로 사용될 수 있는 키 타입입니다.
 *
 * @category Component
 * @returns 해당하는 컴포넌트 또는 `default`가 없으면 `null`을 반환합니다.
 *
 * @example
 * ```tsx
 * <SwitchCase
 *   value={status}
 *   cases={{
 *     a: <TypeA />,
 *     b: <TypeB />,
 *     c: <TypeC />,
 *   }}
 *   default={<Default />}
 * />
 * ```
 */
export declare const SwitchCase: <Case extends Key>(props: SwitchCaseProps<Case>) => ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | null;
