import { PropsWithChildren } from 'react';
import './Stack.css';
import { buildFlexClassNames } from './utils/buildFlexClassNames';

type CSSValueWithLength = number | string;

/** The props type of {@link Stack | 'Stack'}. */
export interface StackProps extends PropsWithChildren {
  /** 컴포넌트에 적용할 CSS 클래스명입니다. */
  className?: string;
  /** flex-direction 속성을 지정합니다. */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  /** flex-wrap 속성을 지정합니다. */
  wrap?: React.CSSProperties['flexWrap'];
  /** align-items 속성을 지정합니다. */
  align?: React.CSSProperties['alignItems'];
  /** justify-content 속성을 지정합니다. */
  justify?: React.CSSProperties['justifyContent'];
  /** gap 속성을 지정합니다. */
  gap?: React.CSSProperties['gap'];
  /** width 속성을 지정합니다. */
  width?: CSSValueWithLength;
  /** height 속성을 지정합니다. */
  height?: CSSValueWithLength;
  /** margin 속성을 지정합니다. */
  m?: CSSValueWithLength;
  /** margin-top 속성을 지정합니다. */
  mt?: CSSValueWithLength;
  /** margin-left 속성을 지정합니다. */
  ml?: CSSValueWithLength;
  /** margin-right 속성을 지정합니다. */
  mr?: CSSValueWithLength;
  /** margin-bottom 속성을 지정합니다. */
  mb?: CSSValueWithLength;
  /** padding 속성을 지정합니다. */
  p?: CSSValueWithLength;
  /** padding-top 속성을 지정합니다. */
  pt?: CSSValueWithLength;
  /** padding-left 속성을 지정합니다. */
  pl?: CSSValueWithLength;
  /** padding-right 속성을 지정합니다. */
  pr?: CSSValueWithLength;
  /** padding-bottom 속성을 지정합니다. */
  pb?: CSSValueWithLength;
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
