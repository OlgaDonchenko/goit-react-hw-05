import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import SearchBar from "../../components/Searcher/Searcher";
import { searchMovies } from "../../movies-api";
import { toast } from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page"), 10) || 1;

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;
      try {
        setLoading(true);
        const data = await searchMovies(query, page);
        if (data.length === 0) {
          toast.error("No movies found with this query");
        }
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 0);
      } catch (error) {
        console.error("Error fetching movies:", error);
        toast.error("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setSearchParams({ query, page: selectedPage });
  };

  const handleSearch = (searchQuery) => {
    if (searchQuery !== query) {
      setSearchParams({ query: searchQuery, page: 1 });
    }
  };

  return (
    <main>
      <section>
        <SearchBar onSubmit={handleSearch} />
        {loading && <p>Loading movies...</p>}
        {!loading && query && movies.length > 0 && (
          <MovieList movies={movies} />
        )}
        {!loading && query && movies.length === 0 && <p>No results found</p>}
        {!loading && query && totalPages > 1 && (
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
          />
        )}
      </section>
    </main>
  );
}
