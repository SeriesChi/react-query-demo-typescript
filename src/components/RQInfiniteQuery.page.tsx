import axios from "axios";
import React, { Fragment } from "react";
import { useInfiniteQuery } from "react-query";

type ColorProp = {
	id: number;
	color: string;
};

type FetchButtonProp = React.MouseEventHandler<HTMLButtonElement> | undefined;

const fetchColors = ({ pageParam = 1 }) => {
	return axios.get(
		`http://localhost:4000/colors?_limit=2&_page=${pageParam}`
	);
};

export const RQInfiniteQuery = () => {
	const {
		isLoading,
		data,
		isError,
		error,
		isFetching,
		hasNextPage,
		fetchNextPage,
	} = useInfiniteQuery(["colors"], fetchColors, {
		getNextPageParam: (_lastPage, pages) => {
			if (pages.length < 4) {
				return pages.length + 1;
			} else {
				return undefined;
			}
		},
	});

	if (isLoading) {
		return <h2>Loading...</h2>;
	}

	if (isError) {
		return <h2>{error as Error}</h2>;
	}
	return (
		<div>
			<h2>Infinite Query</h2>
			{data?.pages.map((group, i) => (
				<Fragment key={i}>
					{group.data.map((color: ColorProp) => (
						<h2>
							{color.id} {color.color}
						</h2>
					))}
				</Fragment>
			))}
			<button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
				Load more
			</button>
			<div>{isFetching && "Fetching..."}</div>
		</div>
	);
};
