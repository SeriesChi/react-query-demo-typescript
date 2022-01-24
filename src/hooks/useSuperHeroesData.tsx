import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "../utils/AxiosUtils";

const fetchSuperHeroes = () => {
	// return axios.get("http://localhost:4000/superheroes");
	return request({ url: "/superheroes" });
	// .then((res) => res.data);
};

const addSuperHero = (hero: any) => {
	// return axios.post("http://localhost:4000/superheroes", hero);
	return request({ url: "/superheroes", method: "post", data: hero });
};

export const useSuperHeroesData = (onSuccess: any, onError: any) => {
	return useQuery("super-heroes", fetchSuperHeroes, {
		// cacheTime: 5000, // can define the caching of data
		// staleTime: 0, // set the data stale after defined time
		// refetchOnMount: true, // refetch data on mount value: true, false, "always"
		// refetchOnWindowFocus: true, // refetch data on window focus, value: true, false, "always" -> refetch disregarding value of stale state
		// refetchInterval: 2000, // refetch the data every 2 seconds but stops it when window is out of focus
		// refetchIntervalInBackground: true, // refetch data even when window is not focused
		// enabled: false, // it disabled the fetching data on mount
		onSuccess,
		onError,
		// select: (data) => {
		// 	const superHeroesNames = data?.map((hero: any) => hero.name);
		// 	return superHeroesNames;
		// },
	});
};

export const useAddSuperHero = () => {
	const queryClient = useQueryClient();
	return useMutation(addSuperHero, {
		// onSuccess: (data) => {
		// 	// queryClient.invalidateQueries("super-heroes"); // to make query invalidate and refetch from api

		// 	// add the added data in the previous list instead of new api call
		// 	// queryClient.setQueryData("super-heroes", (oldQueryData: any) => {
		// 	// 	return {
		// 	// 		...oldQueryData,
		// 	// 		data: [...oldQueryData.data, data.data],
		// 	// 	};
		// 	// });
		// },

		// Optimistic Update means that the update will be guarenteed
		onMutate: (newHero) => {
			queryClient.setQueryData("super-heroes", (oldQueryData: any) => {
				return {
					...oldQueryData,
					data: [
						...oldQueryData.data,
						{ id: oldQueryData?.data?.length + 1, ...newHero },
					],
				};
			});
		},
		onError: (_error, _hero, context: any) => {
			queryClient.setQueryData("super-heroes", context.previousHeroData);
		},
		onSettled: () => {
			queryClient.invalidateQueries("super-heroes");
		},
	});
};
