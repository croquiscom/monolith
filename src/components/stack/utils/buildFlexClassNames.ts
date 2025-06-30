import { CSSProperties } from 'react';

/** The props type of {@link buildFlexClassNames | 'buildFlexClassNames'}. */
export interface FlexClassNamesParams {
  /** flex-direction 속성을 지정합니다. */
  direction?: CSSProperties['flexDirection'];
  /** flex-wrap 속성을 지정합니다. */
  wrap?: CSSProperties['flexWrap'];
  /** align-items 속성을 지정합니다. */
  align?: CSSProperties['alignItems'];
  /** justify-content 속성을 지정합니다. */
  justify?: CSSProperties['justifyContent'];
}

/**
 * 컴포넌트에 적용할 Flexbox 관련 CSS 클래스명을 반환합니다.
 *
 * @param props - {@link FlexClassNamesParams}를 참조하세요.
 * @returns 컴포넌트에 적용할 Flexbox 관련 CSS 클래스명을 반환합니다.
 */
export const buildFlexClassNames = ({ direction, wrap, align, justify }: FlexClassNamesParams): string => {
  const classes: string[] = ['flex'];

  if (direction) {
    classes.push(`flex-${direction}`);
  }
  if (wrap) {
    classes.push(`flex-${wrap}`);
  }
  if (align) {
    classes.push(`align-${align}`);
  }
  if (justify) {
    classes.push(`justify-${justify}`);
  }

  return classes.join(' ');
};
