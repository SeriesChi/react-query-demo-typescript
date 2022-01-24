import React from "react";
import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

export const RQSuperHero = () => {
	const { heroId } = useParams<SuperHeroIdProps>();
	const { isLoading, data, isError, error } = useSuperHeroData(heroId);

	if (isLoading) {
		return <h2>Loading...</h2>;
	}

	if (isError) {
		return <h2>{error as Error}</h2>;
	}

	return (
		<div>
			<h2>Super Hero Details</h2>
			<div>
				{data?.data.name} - {data?.data.alterEgo}
			</div>
		</div>
	);
};
