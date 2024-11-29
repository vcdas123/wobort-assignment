"use client";
import { CameraData } from "@/store/interfaces/cameraInterface";
import { PiWarningCircleLight } from "react-icons/pi";

interface CameraNameIn {
  cameraItem: CameraData;
  getHighlightedText: (text: string) => string | (string | JSX.Element)[];
}

const CameraName = ({ cameraItem, getHighlightedText }: CameraNameIn) => {
  return (
    <div className="flex gap-2">
      <div
        className={`w-[10px] h-[10px] mt-3 rounded-full ${
          cameraItem?.current_status === "Online"
            ? "bg-green-600"
            : "bg-red-600"
        }`}
      ></div>
      <div className="flex flex-col gap-0">
        <div className="flex gap-2 items-center">
          <h2 className="text-md">{getHighlightedText(cameraItem?.name)}</h2>
          {cameraItem?.hasWarning && (
            <PiWarningCircleLight className="text-lg text-orange-600" />
          )}
        </div>
        <p className="text-sm text-gray-400">exmpleWilliam@wobot.ai</p>
      </div>
    </div>
  );
};

export default CameraName;
