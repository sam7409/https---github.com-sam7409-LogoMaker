import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "../components/common/Header";
import IndustryCard from "../components/HomePage/IndustryCard";
import { useDispatch, useSelector } from "react-redux";
import { loadIndustryTemplates } from "../redux/slices/TemplateSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const industries = useSelector((state) => state.template.industries);
  const loading = useSelector((state) => state.template.loading);
  const error = useSelector((state) => state.template.error);

  useEffect(() => {
    dispatch(loadIndustryTemplates());
  }, [dispatch]);

  if (error)
    return (
      <Alert severity="error" className="fixed top-0 w-full">
        {error}
      </Alert>
    );

  return (
    <div className="flex flex-col">
      <Header />
      <div className="bg-slate-100 pt-5 flex flex-col gap-y-4">
        <p className="text-xl text-center bg-black text-white py-2">
          Choose Your Industry Space
        </p>
        {loading ? (
          <div className="w-full min-h-screen flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : industries && industries.length !== 0 ? (
          <IndustryCard industries={industries} />
        ) : (
          <div className="w-full min-h-screen flex justify-center items-center">
            <p className="text-2xl">No data found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
