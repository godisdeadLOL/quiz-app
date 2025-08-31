export function Spinner() {
	return (
		<div role="status">
			<svg
				aria-hidden="true"
				className="w-12 h-12 animate-spin"
				viewBox="0 0 32 32"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle
					cx="16"
					cy="16"
					r="14"
					fill="none"
					className="stroke-current text-surface-2"
					strokeWidth="3"
					strokeDasharray="100"
					strokeDashoffset="0"
				/>

				<circle
					cx="16"
					cy="16"
					r="14"
					fill="none"
					className="stroke-current text-green-500"
					strokeWidth="3"
					strokeDasharray="100"
					strokeDashoffset="75"
				/>
			</svg>
			<span className="sr-only">Loading...</span>
		</div>
	);
}
