import { useEffect, useState } from "react";
import axios from "axios";

type SuperHeroesProps = SuperHeroProps[];

export const SuperHeroesPage = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<SuperHeroesProps>([]);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		axios
			.get("http://localhost:4000/superheroes")
			.then((res) => {
				setData(res.data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <h1>Loading...</h1>;
	}

	if (error) {
		return <h1>{error}</h1>;
	}

	return (
		<div>
			<h2>Super Heroes page</h2>
			{data.map((hero) => (
				<div key={hero.name}>{hero.name}</div>
			))}
		</div>
	);
};
