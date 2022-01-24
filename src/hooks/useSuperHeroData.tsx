import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchHero = ({ queryKey }: any) => {
	const heroId = queryKey[1];
	return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId: string) => {
	const queryClient: any = useQueryClient();
	return useQuery(["super-heroes", heroId], fetchHero, {
		// for setting initial data
		initialData: () => {
			const hero = queryClient
				.getQueryData("super-heroes")
				?.data?.find(
					(hero: SuperHeroProps) => hero.id === parseInt(heroId)
				);

			if (hero) {
				return {
					data: hero,
				};
			} else {
				return undefined;
			}
		},
	});
};
