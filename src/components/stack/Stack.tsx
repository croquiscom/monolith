import { PropsWithChildren, CSSProperties, HTMLAttributes, forwardRef } from 'react';

/** The props type of {@link Stack | 'Stack'}. */
export interface StackProps extends PropsWithChildren {
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
  gap?: CSSProperties['gap'];
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
 * ```
 */
export const Stack = forwardRef<HTMLDivElement, StackProps & HTMLAttributes<HTMLDivElement>>(
  (
    {
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
      style,
      ...props
    },
    ref,
  ) => {
    const combined_style: CSSProperties = {
      display: 'flex',
      ...(direction !== undefined && { flexDirection: direction }),
      ...(wrap !== undefined && { flexWrap: wrap }),
      ...(align !== undefined && { alignItems: align }),
      ...(justify !== undefined && { justifyContent: justify }),
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
    };

    return (
      <div ref={ref} className={className} style={combined_style} {...props}>
        {children}
      </div>
    );
  },
);
