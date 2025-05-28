/**
 * 지연된 로딩을 위한 hook 입니다.
 * 로딩이 너무 빠르게 끝나는 경우 오히려 로딩 UI가 너무 깜빡이게 노출되어
 * 유저에게 부정적인 ux를 줄 수 있습니다.
 * 따라서 최소한의 지연시간을 두고 로딩 UI를 노출합니다.
 * 주로 로딩이 너무 빠르게 노출되어 스켈레톤, 로딩에 대한 UX가 부정적으로 노출되는 경우 유저경험을 위해 사용하는걸 권장합니다.
 *
 * @param is_loading - 로딩 여부를 boolean으로 전달합니다.
 * @param delay - 로딩 지연 최소시간을 설정합니다. 기본값은 200ms 입니다.(추후 디자이너 싱크 이후 변경 예정)
 * @return is_delayed_loading - 지연된 로딩 여부를 반환합니다.
 *
 * @example
 *  const { data, isLoading } = useQuery(xx);
 *  const is_delay_loading = useDelayLoading(isLoading);
 *
 *  if (is_delay_loading) {
 *   return <Loading />;
 *  }
 *
 * or
 *
 *  *  const { data, isLoading } = useQuery(xx);
 *  const is_delay_loading = useDelayLoading(isLoading, 400);
 *
 *  if (is_delay_loading) {
 *   return <Loading />;
 *  }
 */
export declare function useDelayLoading(is_loading: boolean, delay?: number): boolean;
