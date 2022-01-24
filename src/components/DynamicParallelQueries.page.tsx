import axios from "axios";
import { useQueries } from "react-query";

type DynPllQueryProps = {
	heroIds: string[] | number[];
};

const fetchSuperHeroes = (heroId: string | number) => {
	return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const DynamicParallelQueries = (heroIds: DynPllQueryProps) => {
	const queryResult = useQueries<any>(
		heroIds?.heroIds.map((id) => {
			return {
				queryKey: ["super-heroes", id],
				queryFn: fetchSuperHeroes(id),
			};
		})
	);
	console.log(queryResult, "query result");
	return <div>Dynamic Parallel Queries</div>;
};
