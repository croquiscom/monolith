import { CSSProperties, HTMLAttributes, forwardRef, ElementType } from 'react';

/** The props type of {@link Stack | 'Stack'}. */
export interface StackProps {
  /**
   * ElementType 을 지정 합니다.
   * @default "div"
   */
  as?: ElementType;
  /** inline-flex 사용 설정 */
  inline?: boolean;
  /** flex-direction 속성을 지정합니다. */
  direction?: CSSProperties['flexDirection'];
  /** flex-wrap 속성을 지정합니다. */
  wrap?: CSSProperties['flexWrap'];
  /** align-items 속성을 지정합니다. */
  align?: CSSProperties['alignItems'];
  /** justify-content 속성을 지정합니다. */
  justify?: CSSProperties['justifyContent'];
  /** flex 속성을 지정합니다. */
  flex?: CSSProperties['flex'];
  /** gap 속성을 지정합니다. */
  gap?: CSSProperties['gap'];
  /** width 속성을 지정합니다. */
  width?: CSSProperties['width'];
  /** height 속성을 지정합니다. */
  height?: CSSProperties['height'];
  /** margin 속성을 지정합니다. */
  m?: CSSProperties['margin'];
  /** margin-top 속성을 지정합니다. */
  mt?: CSSProperties['marginTop'];
  /** margin-left 속성을 지정합니다. */
  ml?: CSSProperties['marginLeft'];
  /** margin-right 속성을 지정합니다. */
  mr?: CSSProperties['marginRight'];
  /** margin-bottom 속성을 지정합니다. */
  mb?: CSSProperties['marginBottom'];
  /** padding 속성을 지정합니다. */
  p?: CSSProperties['padding'];
  /** padding-top 속성을 지정합니다. */
  pt?: CSSProperties['paddingTop'];
  /** padding-left 속성을 지정합니다. */
  pl?: CSSProperties['paddingLeft'];
  /** padding-right 속성을 지정합니다. */
  pr?: CSSProperties['paddingRight'];
  /** padding-bottom 속성을 지정합니다. */
  pb?: CSSProperties['paddingBottom'];
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
 * // 중앙 정렬, 10px 간격
 * <Stack justify='center' align='center' gap={10}>
 *   {children}
 * </Stack>
 *
 * // 양끝 정렬
 * <Stack justify='space-between'>
 *   {children}
 * </Stack>
 *
 * // 상단 정렬
 * <Stack align='flex-start'>
 *   {children}
 * </Stack>
 *
 * // 가로 방향 정렬
 * <Stack direction='row'>
 *   {children}
 * </Stack>
 *
 * // 세로 방향 정렬
 * <Stack direction='column'>
 *   {children}
 * </Stack>
 *
 * // inline flex 설정
 * <Stack inline>
 *   {children}
 * </Stack>
 * ```
 */
export const Stack = forwardRef<HTMLDivElement, StackProps & HTMLAttributes<HTMLDivElement>>(
  (
    {
      as: Root = 'div',
      inline,
      direction,
      wrap,
      align,
      justify,
      flex,
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
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <Root
        ref={ref}
        style={{
          display: inline ? 'inline-flex' : 'flex',
          ...(direction !== undefined && { flexDirection: direction }),
          ...(wrap !== undefined && { flexWrap: wrap }),
          ...(align !== undefined && { alignItems: align }),
          ...(justify !== undefined && { justifyContent: justify }),
          ...(flex !== undefined && { flex }),
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
          ...style,
        }}
        {...rest}
      >
        {children}
      </Root>
    );
  },
);
