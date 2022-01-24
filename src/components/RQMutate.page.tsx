import React, { useState } from "react";
import { useQuery } from "react-query";
import {
	useAddSuperHero,
	useSuperHeroesData,
} from "../hooks/useSuperHeroesData";

export const RQMutate = () => {
	const [name, setName] = useState("");
	const [alterEgo, setAlterEgo] = useState("");

	const onSuccess = (data: any) => {
		console.log("Perform side effect after data fetching", data);
	};

	const onError = (error: any) => {
		console.log("Perform side effect after data fetching", error);
	};

	const { isLoading, data, isError, error } = useSuperHeroesData(
		onSuccess,
		onError
	);

	const {
		mutate: addSuperHero,
		isLoading: isLoadingAddHero,
		isError: isErrorAddHero,
		error: errorAddHero,
	} = useAddSuperHero();

	const addHero = () => {
		console.log("add Hero", name, alterEgo);
		const hero = { name, alterEgo };
		addSuperHero(hero);
	};

	if (isLoading) {
		return <h2>Loading...</h2>;
	}

	if (isError) {
		return <h2>{error as Error}</h2>;
	}

	return (
		<div>
			<h2>Post or Mutation</h2>
			<div>
				<input
					type="text"
					onChange={(event) => setName(event.currentTarget.value)}
					placeholder="Name"
				/>
				<input
					type="text"
					onChange={(event) => setAlterEgo(event.currentTarget.value)}
					placeholder="Alter Ego"
				/>
				<button onClick={addHero}>Add Hero</button>
			</div>
			{data?.data.map((hero: SuperHeroProps) => (
				<div key={hero.id}>
					{hero.name} - {hero.alterEgo}
				</div>
			))}
		</div>
	);
};
