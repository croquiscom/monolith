import { PropsWithChildren } from 'react';
import './Stack.css';
import { buildFlexClassNames } from './utils/buildFlexClassNames';

/** The props type of {@link Stack | 'Stack'}. */
export interface StackProps extends PropsWithChildren {
  /** 컴포넌트에 적용할 CSS 클래스명입니다. */
  className?: string;
  /** flex-direction 속성을 지정합니다. */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  /** flex-wrap 속성을 지정합니다. */
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  /** align-items 속성을 지정합니다. */
  align?: 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'self-start' | 'self-end' | 'baseline' | 'stretch';
  /** justify-content 속성을 지정합니다. */
  justify?:
    | 'center'
    | 'start'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'left'
    | 'right'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch';
  /** gap 속성을 지정합니다. */
  gap?: React.CSSProperties['gap'];
  /** width 속성을 지정합니다. */
  width?: number | string;
  /** height 속성을 지정합니다. */
  height?: number | string;
  /** margin 속성을 지정합니다. */
  m?: number | string;
  /** margin-top 속성을 지정합니다. */
  mt?: number | string;
  /** margin-left 속성을 지정합니다. */
  ml?: number | string;
  /** margin-right 속성을 지정합니다. */
  mr?: number | string;
  /** margin-bottom 속성을 지정합니다. */
  mb?: number | string;
  /** padding 속성을 지정합니다. */
  p?: number | string;
  /** padding-top 속성을 지정합니다. */
  pt?: number | string;
  /** padding-left 속성을 지정합니다. */
  pl?: number | string;
  /** padding-right 속성을 지정합니다. */
  pr?: number | string;
  /** padding-bottom 속성을 지정합니다. */
  pb?: number | string;
}

/**
 * 자식 컴포넌트를 스택으로 렌더링하는 컴포넌트입니다.
 *
 * @category Component
 * @param props - {@link StackProps}를 참조하세요.
 * @returns 해당하는 컴포넌트를 반환합니다.
 *
 * @example
 * ```tsx
 * <Stack>
 *   <div>Hello</div>
 *   <div>World</div>
 * </Stack>
 * ```
 */
export const Stack = ({
  children,
  className,
  direction,
  wrap,
  align,
  justify,
  gap,
  width,
  height,
  m,
  mt,
  ml,
  mr,
  mb,
  p,
  pt,
  pl,
  pr,
  pb,
}: StackProps) => {
  const flexClasses = buildFlexClassNames({ direction, wrap, align, justify });
  const combinedClasses = [flexClasses, className].filter(Boolean).join(' ');

  const spacing_style: React.CSSProperties = {
    ...(gap !== undefined && { gap }),
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
    ...(m !== undefined && { margin: m }),
    ...(mt !== undefined && { marginTop: mt }),
    ...(ml !== undefined && { marginLeft: ml }),
    ...(mr !== undefined && { marginRight: mr }),
    ...(mb !== undefined && { marginBottom: mb }),
    ...(p !== undefined && { padding: p }),
    ...(pt !== undefined && { paddingTop: pt }),
    ...(pl !== undefined && { paddingLeft: pl }),
    ...(pr !== undefined && { paddingRight: pr }),
    ...(pb !== undefined && { paddingBottom: pb }),
  };

  return (
    <div className={combinedClasses} style={spacing_style}>
      {children}
    </div>
  );
};
