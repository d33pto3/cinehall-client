import EditMovieForm from "./EditMovieForm";

export type MovieProps = {
  _id: string;
  title: string;
  imageUrl: string;
  duration: string;
  genre: string;
  releaseDate: string;
  director: string;
  imageId?: string;
};

export default function MovieOverview({
  movieInfo,
}: {
  movieInfo: MovieProps | null;
}) {
  console.log(movieInfo);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Movie Overview</h1>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden">
          <EditMovieForm movieInfo={movieInfo} />
        </div>
      </div>
    </>
  );
}
