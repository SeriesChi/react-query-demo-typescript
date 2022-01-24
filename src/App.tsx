import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page";
import { HomePage } from "./components/Home.page";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RQSuperHero } from "./components/RQSuperHero.page";
import { ParallelQueries } from "./components/ParallelQueries.page";
import { DynamicParallelQueries } from "./components/DynamicParallelQueries.page";
import { DependentQueries } from "./components/DependentQueries.page";
import { RQPaginatedQueries } from "./components/RQPaginatedQueries.page";
import { RQInfiniteQuery } from "./components/RQInfiniteQuery.page";
import { RQMutate } from "./components/RQMutate.page";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<div>
					<nav>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/super-heroes">
									Traditional Super Heroes
								</Link>
							</li>
							<li>
								<Link to="/rq-super-heroes">
									RQ Super Heroes
								</Link>
							</li>
						</ul>
					</nav>
					<Switch>
						<Route path={"/rq-super-heroes/:heroId"}>
							<RQSuperHero />
						</Route>
						<Route path="/super-heroes">
							<SuperHeroesPage />
						</Route>
						<Route path="/rq-super-heroes">
							<RQSuperHeroesPage />
						</Route>
						<Route path="/parallel-queries">
							<ParallelQueries />
						</Route>
						<Route path="/dynamic-parallel-queries">
							<DynamicParallelQueries heroIds={[1, 3]} />
						</Route>
						<Route path="/dependent-queries">
							<DependentQueries email="Series@example.com" />
						</Route>
						<Route path="/paginated-queries">
							<RQPaginatedQueries />
						</Route>
						<Route path="/rq-infinite">
							<RQInfiniteQuery />
						</Route>
						<Route path="/rq-mutate">
							<RQMutate />
						</Route>
						<Route path="/">
							<HomePage />
						</Route>
					</Switch>
				</div>
			</Router>
			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
		</QueryClientProvider>
	);
}

export default App;
