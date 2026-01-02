import { Suspense } from "react";
import Health from "../components/Forms/Health/Health";
import Loader from "../components/Loader/Loader";

const HealthPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Health />
    </Suspense>
  );
};

export default HealthPage;
