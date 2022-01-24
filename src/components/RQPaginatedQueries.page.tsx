import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

type colorProp = {
	id: number;
	color: string;
};

const fetchColors = (pageNumber: number) => {
	return axios.get(
		`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`
	);
};

export const RQPaginatedQueries = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const { isLoading, data, isError, error, isFetching } = useQuery(
		["colors", pageNumber],
		() => fetchColors(pageNumber),
		{
			keepPreviousData: true,
		}
	);

	if (isLoading) {
		return <h2>Loading...</h2>;
	}

	if (isError) {
		return <h2>{error as Error}</h2>;
	}

	return (
		<div>
			<h2>Paginated Queries</h2>
			{data?.data.map((color: colorProp) => (
				<li key={color.id}>{color.color}</li>
			))}
			<button
				onClick={() => setPageNumber((page) => page - 1)}
				disabled={pageNumber === 1}
			>
				Previous Page
			</button>
			<button
				onClick={() => setPageNumber((page) => page + 1)}
				disabled={pageNumber === 4}
			>
				Next Page
			</button>
			{isFetching && "Loading..."}
		</div>
	);
};
