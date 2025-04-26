/* eslint-disable @typescript-eslint/no-explicit-any */
import cn from "classnames";
import {
  FieldValues,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";

import { svgs } from "@/app/components/svgs";
import {
  CommonFields,
  extractBaseFieldProps,
  getFieldClassname,
} from "./_helpers";
import {
  ChangeEvent,
  DragEvent,
  InputHTMLAttributes,
  MouseEvent,
  useState,
} from "react";
import withBaseField from "./_withBaseField";

type FileUploadProps = CommonFields &
  InputHTMLAttributes<HTMLInputElement> & {
    multiple?: boolean;
    maxFileSize?: number;
  };

const imageTypes = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  "image/avif",
  "image/svg+xml",
];
const videoTypes = ["video/webm", "video/mp4"];

function FileUpload<T extends FieldValues>(
  props: FileUploadProps & UseControllerProps<T>,
) {
  const { className, maxFileSize, multiple = false, ...otherProps } = props;

  const [error, setError] = useState("");

  const { getValues, setValue, watch } = useFormContext();

  const fileList = watch(props.name) as File[];

  return (
    <div className={cn(getFieldClassname(otherProps), "py-11 px-9", className)}>
      <input
        {...extractBaseFieldProps(otherProps)}
        className="hidden"
        type="file"
        multiple={multiple}
        onChange={onSelectFile}
      />
      <div
        id="drop_zone"
        className="bg-white rounded border border-dashed border-gray-400 flex flex-col items-center p-4"
        onDrop={onDropFile}
        onDragOver={onDragOver}
      >
        {renderUploadedFiles()}
        {renderPlaceholder()}
        {renderError()}
      </div>
    </div>
  );

  function renderUploadedFiles() {
    if (fileList.length === 0) {
      return null;
    }

    if (!multiple) {
      const file = fileList[0];

      if (imageTypes.includes(file.type)) {
        const tmpFileUrl = URL.createObjectURL(file);
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={tmpFileUrl} alt="temp" />;
      }

      if (videoTypes.includes(file.type)) {
        const tmpFileUrl = URL.createObjectURL(file);
        return (
          <video controls>
            <source src={tmpFileUrl} type={file.type} />
          </video>
        );
      }
    }

    return (
      <ul className="text-sm text-gray-700 mb-4 self-start">
        {fileList.map((filename, index) => (
          <li key={filename.name}>
            {filename.name}{" "}
            <span
              className="text-xs"
              onClick={(ev: MouseEvent) => removeFile(ev, index)}
            >
              ❌
            </span>
          </li>
        ))}
      </ul>
    );
  }

  function renderPlaceholder() {
    if (fileList.length === 0) {
      return (
        <>
          <div className="h-[44px] w-[44px] bg-gray-100 rounded-full flex flex-col items-center justify-center mb-6">
            <svgs.Camera />
          </div>
          <p className="flex flex-wrap gap-x-2 justify-center">
            <span className="font-medium text-center font-kumbhSans">
              Click to Upload
            </span>{" "}
            <span className="text-gray-700">or drag</span>
          </p>
          {maxFileSize && (
            <p className="text-xs text-gray-700 mt-2 text-center">
              {" "}
              (Max. File size: {maxFileSize} MB)
            </p>
          )}
        </>
      );
    }

    if (multiple) {
      return (
        <>
          <p className="flex flex-wrap gap-x-2 justify-center mt-2">
            <span className="font-medium text-center font-kumbhSans">
              Click to Add
            </span>{" "}
            <span className="text-gray-700">or drag</span>
          </p>
          {renderRemoveButton()}
        </>
      );
    }

    return (
      <>
        <p className="flex flex-wrap gap-x-2 justify-center mt-2">
          <span className="font-medium text-center font-kumbhSans">
            Click to Change
          </span>{" "}
          <span className="text-gray-700">or drag</span>
        </p>
        {renderRemoveButton()}
      </>
    );
  }

  function renderRemoveButton() {
    return (
      !multiple && (
        <p
          className="text-red-700 font-semibold cursor-pointer mt-1"
          onClick={cleanFiles}
        >
          Remove
        </p>
      )
    );
  }

  function renderError() {
    if (!error) {
      return null;
    }

    return <div className="text-red-600 font-bold">{error}</div>;
  }

  function onSelectFile(event: ChangeEvent<HTMLInputElement>) {
    if (!multiple) {
      cleanFiles();
    }
    if (event.target.files) {
      [...event.target.files].forEach((file) => registerFile(file));
    }
  }

  function onDropFile(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    if (!multiple) {
      cleanFiles();
    }

    if (event.dataTransfer.items) {
      [...event.dataTransfer.items].forEach((item) => {
        if (item.kind === "file") {
          const file = item.getAsFile();

          if (file) {
            registerFile(file);
          }
        }
      });
    } else if (event.dataTransfer.files) {
      [...event.dataTransfer.files].forEach((file) => registerFile(file));
    }
  }

  function onDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function removeFile(ev: MouseEvent, index: number) {
    const allMedias = getValues(props.name) as File[];
    allMedias.splice(index, 1);
    setValue(props.name, [...allMedias] as any);
    ev.preventDefault();
  }

  function cleanFiles() {
    setValue(props.name, [] as any);
  }

  function registerFile(file: File) {
    setError("");
    const allMedias = getValues(props.name) as File[];

    const totalSize = allMedias.reduce((sum, file) => sum + file.size, 0);

    if (maxFileSize && maxFileSize * 1000000 < totalSize + file.size) {
      setError(
        `Can't upload more files, it exceeds the limit of ${maxFileSize}Mb`,
      );
    } else {
      setValue(props.name, [...allMedias, file] as any);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default withBaseField(FileUpload<any>);
