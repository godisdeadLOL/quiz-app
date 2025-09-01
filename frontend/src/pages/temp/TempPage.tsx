import { useNavigate, useParams } from "react-router";

export function TempPage() {
	const params = useParams();
	const navigate = useNavigate();

	return (
		<div>
			<h1>Значения</h1>
			<ul>
				{Object.entries(params).map(([key, value]) => (
					<li data-testid={`entry-${key}`} key={key} onClick={() => navigate(value!)}>
						{key}: {value}
					</li>
				))}
			</ul>
		</div>
	);
}
