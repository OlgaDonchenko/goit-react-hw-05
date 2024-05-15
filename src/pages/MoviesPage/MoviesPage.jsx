import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import SearchBar from "../../components/Searcher/Searcher";
import { searchMovies, getTrendMovies } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
// import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let data;
        if (query) {
          data = await searchMovies(query, page);
        } else {
          data = await getTrendMovies(page);
        }
        setMovies(data);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setPage(selectedPage);
  };

  const handleSearch = (searchQuery) => {
    if (searchQuery !== query) {
      setQuery(searchQuery);
      setPage(1);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {loading && <p>Loading movies...</p>}
      {!loading && <MovieList movies={movies} />}
      {!loading && totalPages > 1 && (
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={css.pagination}
          activeClassName={css.active}
        />
      )}
    </div>
  );
}
