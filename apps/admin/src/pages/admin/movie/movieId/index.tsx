import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import MovieOverview, {
  MovieProps,
} from "@/components/admin/movies/movieId/MovieOverview";

function Movie() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log(movie);

  useEffect(() => {
    const getMovie = async () => {
      if (!movieId) {
        setError("Movie ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`/movie/${movieId}`);

        if (res.data) {
          setMovie(res.data);
        } else {
          setError("Movie not found");
          toast.error("Movie not found");
        }
      } catch (error: any) {
        console.error("Failed to fetch user:", error);
        setError("Failed to load user");

        if (error.response?.status === 404) {
          toast.error("Movie not found");
        } else {
          toast.error("Failed to load movie data");
        }
      } finally {
        setLoading(false);
      }
    };

    getMovie();
  }, [movieId]);

  const handleGoBack = () => {
    navigate("/admin/movies");
  };

  // Show loading state
  if (loading) {
    return (
      <div className="h-64 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading user...</span>
      </div>
    );
  }

  // Show error state with Go Back button
  if (error || !movie) {
    return (
      <div className="h-64 flex flex-col justify-center items-center p-4">
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          Movie Not Found
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          The requested user does not exist or you may not have permission to
          view it.
        </p>
        <Button
          onClick={handleGoBack}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back to Movies
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      {/* Add a back button at the top too */}
      <Button
        onClick={handleGoBack}
        variant="ghost"
        className="flex items-center gap-2 mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Movie
      </Button>

      <div className="flex gap-2">
        <MovieOverview movieInfo={movie} />
      </div>
    </div>
  );
}

export default Movie;
