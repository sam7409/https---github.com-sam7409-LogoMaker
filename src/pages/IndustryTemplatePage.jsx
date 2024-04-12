import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/Header";
import CircularProgress from "@mui/material/CircularProgress";
import TemplateCard from "../components/IndustryTemplatePage/TemplateCard";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { loadTemplatesByIndustry } from "../redux/slices/TemplateSlice";

const IndustryTemplatePage = () => {
  const { industryName } = useParams();

  const dispatch = useDispatch();
  const templates = useSelector((state) => state.template.templates);
  const loading = useSelector((state) => state.template.loading);
  const error = useSelector((state) => state.template.error);

  useEffect(() => {
    dispatch(loadTemplatesByIndustry(industryName));
  }, [dispatch, industryName]);

  if (error)
    return (
      <Alert severity="error" className="fixed top-0 w-full">
        {error}
      </Alert>
    );

  return (
    <div className="bg-slate-200 w-full min-h-screen">
      <Header />
      <div className="w-full min-h-screen flex flex-col gap-y-5">
        <p className="bg-black text-white text-center py-2 text-lg pl-5 mt-3">
          {industryName}
        </p>
        {loading ? (
          <div className="w-full min-h-screen flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : templates && templates.length !== 0 ? (
          <TemplateCard templates={templates} />
        ) : (
          <div className="w-full min-h-screen flex justify-center items-center">
            <p className="text-2xl">No data found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndustryTemplatePage;
