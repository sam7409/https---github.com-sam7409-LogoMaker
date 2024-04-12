import React, { useRef } from "react";
import TemplateEditorHeader from "../components/TemplateEditorPage/TemplateEditorHeader/TemplateEditorHeader";
import TemplateEditorSidebar from "../components/TemplateEditorPage/TemplateEditorSidebar/TemplateEditorSidebar";
import IconsComponent from "../components/TemplateEditorPage/TemplateEditorSidebar/Icons/IconsComponent";
import TemplateEditor from "../components/TemplateEditorPage/TemplateEditor/TemplateEditor";
import BackgroundComponent from "../components/TemplateEditorPage/TemplateEditorSidebar/Background/BackgroundComponent";
import TemplateScale from "../components/TemplateEditorPage/TemplateEditor/TemplateScale/TemplateScale";
import TextComponent from "../components/TemplateEditorPage/TemplateEditorSidebar/TextTab/TextComponent";
import TextColor from "../components/TemplateEditorPage/TemplateEditor/TextBar/TextColor/TextColor";
import TextBackground from "../components/TemplateEditorPage/TemplateEditor/TextBar/TextBackground/TextBackground";

const TemplateEditorPage = () => {
  const objectRef = useRef({});
  return (
    <div className="w-full min-h-screen">
      <TemplateEditorHeader />

      <div className="flex">
        <TemplateEditorSidebar />
        <IconsComponent />
        <BackgroundComponent />
        <TextComponent />
        <TextColor />
        <TextBackground />
        <TemplateEditor objectRef={objectRef} />
      </div>

      {/* <TemplateScale /> */}
    </div>
  );
};

export default TemplateEditorPage;
