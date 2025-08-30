import { useEffect, useRef, useState } from "react";
import { formatTimerTime } from "./utils";

type TimerProps = {
	startedAt: number;
	duration: number;

	onComplete?: () => void;
};

export function Timer({ startedAt, duration, onComplete }: TimerProps) {
	const [value, setValue] = useState(getTimerValues().currentSecond);

	const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
	const completedRef = useRef(false);

	useEffect(() => {
		handleTick();

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
		};
	}, []);

	const handleTick = () => {
		const { currentSecond, nextDelta } = getTimerValues();
		setValue(currentSecond);

		if (!completedRef.current && currentSecond >= duration) {
			onComplete?.();
			completedRef.current = true;
		}

		timeoutRef.current = setTimeout(handleTick, nextDelta);
	};

	return formatTimerTime(value, duration);

	function getTimerValues() {
		const now = Date.now() / 1000.0 - startedAt;

		const currentSecond = Math.floor(now);
		const nextSecond = currentSecond + 1;
		const nextDelta = nextSecond - now;

		return { currentSecond, nextSecond, nextDelta };
	}
}
