export function formatTimerTime(passed: number, duration: number) {
	const left = Math.max(0, duration - passed);

	const hours = Math.floor(left / 3600);
	const minutes = Math.floor((left % 3600) / 60);
	const seconds = left % 60;

	const values = duration > 3600 ? [hours, minutes, seconds] : [minutes, seconds];
	return values.map((val) => String(val).padStart(2, "0")).join(":");
}
