import { Suspense } from "react";
import Jobs from "../components/Forms/Jobs/Jobs";
import Loader from "../components/Loader/Loader";

const JobsPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Jobs />
    </Suspense>
  );
};

export default JobsPage;
