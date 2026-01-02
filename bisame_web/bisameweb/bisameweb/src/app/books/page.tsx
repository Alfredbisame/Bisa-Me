import React, { Suspense } from "react";
import Books from "../components/Forms/Books/Books";
import Loader from "../components/Loader/Loader";

const BooksPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Books />
    </Suspense>
  );
};

export default BooksPage;
