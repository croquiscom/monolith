export type CountdownType = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
};
interface CountdownProps {
    /**
     * 카운트다운 종료 시간을 지정합니다.
     * timestamp 형태로 지정해야 합니다.
     * @example dayjs().valueOf();
     */
    end_at: number;
    /**
     * 카운트다운 활성화 여부를 지정합니다.
     * (타이머 중간에 카운트다운을 멈추고 싶을 때 사용하는것도 가능합니다.)
     */
    enable?: boolean;
    /**
     * throttle_time을 지정합니다.
     * ms를 사용하지 않는다면 1_000으로 설정을 권장드립니다. (성능 이슈)
     * @default 10
     */
    throttle_time?: number;
}
/**
 * 주어진 시간 까지 11:59:59:99 형태의 카운트다운을 표현하기 위해 사용하는 hook 입니다.
 * hour, minute, second, millisecond 단위 까지 지원 합니다.
 * 추가적으로 ms 단위까지 표현하다 보니 성능상의 이슈가 있을수 있어 작업시 rerender 이슈를 체크하면서 해주시면 좋습니다.
 *
 * @example
 * ```tsx
 *   // MEMO: 1시간 카운트 다운
 *   const { days, hours, minutes, seconds, milliseconds } = useTimer({ timestamp: dayjs().add(1, 'hours').valueOf() })
 *   console.log(days)  // 남은 일
 *   console.log(hours)  // 남은 시간
 *   console.log(minutes)  // 남은 분
 *   console.log(seconds)  // 남은 초
 *   console.log(milliseconds)  // 남은 밀리 세컨드
 *
 *
 * ms 를 안쓰고 second 단위 까지만 사용이 필요한 경우
 *   // MEMO: 초단위 쓰로틀링 적용
 *   const { days, hours, minutes, seconds, milliseconds } = useTimer({ timestamp: dayjs().add(1, 'hours').valueOf(), throttle_time: 1_000 })
 *
 *  타이머 종료되는 경우
 *   const { is_finished } = useTimer({ timestamp: dayjs().add(1, 'hours').valueOf(), throttle_time: 1_000 })
 *
 *
 *  enable이 false 경우 타이머 종료여부는 false로 고정됩니다.
 *   const { is_finished } = useTimer({ timestamp: dayjs().add(1, 'hours').valueOf(), throttle_time: 1_000, enable: false })
 *   console.log(is_finished) // false
 * ```
 */
export declare const useCountDownTimer: ({ end_at, enable, throttle_time }: CountdownProps) => {
    is_finished: boolean;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
};
export {};
