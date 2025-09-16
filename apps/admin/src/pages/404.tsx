// import { ThemeProvider } from "next-themes";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    // <ThemeProvider>
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">404</h1>
        <span className="font-medium">Title</span>
        <p className="text-center text-muted-foreground">
          It seems like the page you're looking for <br />
          does not exist or might have been removed
        </p>
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleGoBack}
            className="text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 hover:cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
    // </ThemeProvider>
  );
}

export default NotFound;
