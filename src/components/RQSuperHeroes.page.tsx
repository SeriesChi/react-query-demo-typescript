import axios from "axios";
import { useQuery } from "react-query";
import React, { useState } from "react";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";

export const RQSuperHeroesPage = () => {
	const onSuccess = (data: any) => {
		console.log("Perform side effect after data fetching", data);
	};

	const onError = (error: any) => {
		console.log("Perform side effect after data fetching", error);
	};

	const { isLoading, data, isError, error, isFetching, refetch } =
		useSuperHeroesData(onSuccess, onError);

	if (isLoading || isFetching) {
		return <h1>Loading...</h1>;
	}

	if (isError) {
		return <h1>{(error as Error)?.message}</h1>;
	}
	return (
		<div>
			<h2>React Query Super Heroes</h2>
			<button onClick={() => refetch()}>Fetch Super Heroes</button>
			{data?.data.map((hero: SuperHeroProps) => (
				<div key={hero.name}>
					<Link to={`rq-super-heroes/${hero.id}`}>{hero.name}</Link>
				</div>
			))}
			{/* {data.map((heroNames: string) => (
				<div key={heroNames}>{heroNames}</div>
			))} */}
		</div>
	);
};
