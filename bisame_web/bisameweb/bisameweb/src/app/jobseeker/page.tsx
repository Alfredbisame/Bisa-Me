import { Suspense } from "react";
import JobSeekers from "../components/Forms/JobSeekers/JobSeekers";
import Loader from "../components/Loader/Loader";

const JobSeekerPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <JobSeekers />
    </Suspense>
  );
};

export default JobSeekerPage;
