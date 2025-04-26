import cn from "classnames";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface CapsuleCountDownProps {
  className?: string;
}

const dayDivider = 60 * 60 * 24;
const hourDivider = 60 * 60;
const minuteDivider = 60;

export default function CapsuleCountDown(props: CapsuleCountDownProps) {
  const { className } = props;

  const { watch } = useFormContext();

  const openDate = watch("openDate") as Date;
  const currentDate = Date.now();

  const [dateDiff, setDateDiff] = useState(openDate.getTime() - currentDate);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDateDiff(openDate.getTime() - Date.now());
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <div>
      <div
        className={cn(
          "border rounded-lg py-11 px-9 border-field bg-field",
          className,
        )}
      >
        <div className="bg-white rounded border border-dashed border-gray-400 flex flex-col items-center p-4">
          {dateDiff <= 0 ? renderDatePassed() : renderCountDown()}
        </div>
      </div>
    </div>
  );

  function renderDatePassed() {
    return <div>Already visible</div>;
  }

  function renderCountDown() {
    let dateDiffSec = Math.round(dateDiff / 1000);

    const nbDays = Math.floor(dateDiffSec / dayDivider);
    dateDiffSec -= nbDays * dayDivider;

    const nbHours = Math.floor(dateDiffSec / hourDivider);
    dateDiffSec -= nbHours * hourDivider;

    const nbMinutes = Math.floor(dateDiffSec / minuteDivider);
    dateDiffSec -= nbMinutes * minuteDivider;

    return (
      <>
        <div className="font-medium text-sm mb-2">
          {nbDays} Days - {nbHours.toString().padStart(2, "0")} Hr:
          {nbMinutes.toString().padStart(2, "0")}min:
          {dateDiffSec.toString().padStart(2, "0")}sec
        </div>
        <div className="text-sm mb-1">UNVEIL DATE</div>
        <div className="text-xs">{openDate.toLocaleString()}</div>
      </>
    );
  }
}
