import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Setting from "./exam_one/Setting.js";
import Profile from "./exam_one/Profile";
import Fetch from "./exam_second/Fetch";

import { HomePage } from "./exam_third/components/Home.page";
import { SuperHeroesPage } from "./exam_third/components/SuperHeroes.page";
import { RQSuperHeroesPage } from "./exam_third/components/RQSuperHeroes.page";
import { RQSuperHeroPage } from "./exam_third/components/RQSuperHero";
import { Link, Routes, Route } from "react-router-dom";
import { ParallelQueriesPage } from "./exam_third/components/ParallelQueries.page";
import { DynamicParallelPage } from "./exam_third/components/DynamicParallel";
import { DependenetQueriesPage } from "./exam_third/components/DependentQueries.page";
import { PaginatedQueriesPage } from "./exam_third/components/PaginatedQueries.page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/super-heroes" element={<SuperHeroesPage />} />
          <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
          <Route
            path="/rq-super-heroes/:heroId"
            element={<RQSuperHeroPage />}
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/rq-parallel" element={<ParallelQueriesPage />} />
          <Route
            path="/rq-dynamic-parallel"
            element={<DynamicParallelPage heroIds={[1, 3]} />}
          />
          <Route
            path="/rq-dependent"
            element={<DependenetQueriesPage email="vishwas@example.com" />}
          />
          <Route path="/rq-paginated" element={<PaginatedQueriesPage />} />
        </Routes>
        <Setting />
        <Profile />
        <Fetch />
      </div>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
