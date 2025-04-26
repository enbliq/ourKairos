"use client";

import React, { memo, useMemo, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RichTextFieldProps {
  message: string;
  onMessageChange: (value: string) => void;
}

const RichTextField: React.FC<RichTextFieldProps> = memo(
  ({ message, onMessageChange }) => {
    // Simplified toolbar to match the Figma design
    const modules = useMemo(
      () => ({
        toolbar: {
          container: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            ["link", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            [{ indent: "-1" }, { indent: "+1" }],
          ],
        },
        history: {
          delay: 2000,
          maxStack: 100,
          userOnly: true,
        },
      }),
      [],
    );

    const formats = useMemo(
      () => [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "indent",
        "link",
        "align",
        "code-block",
      ],
      [],
    );

    useEffect(() => {
      const style = document.createElement("style");
      style.innerHTML = `
        .quill {
          border-radius: 8px;
          overflow: hidden;
        }
        
        .ql-toolbar.ql-snow {
          border: none;
          border-bottom: 1px solid #E8E8E8;
          padding: 8px 12px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          background-color: white;
        }
        
        .ql-container.ql-snow {
          border: none;
          background-color: #F7FBFD;
          font-family: inherit;
          min-height: 200px;
        }
        
        .ql-editor {
          padding: 16px;
          min-height: 200px;
          font-size: 16px;
        }
        
        .ql-editor.ql-blank::before {
          font-style: normal;
          color: #9CA3AF;
          font-size: 16px;
          left: 16px;
        }
        
        .ql-formats {
          margin-right: 0 !important;
          margin-bottom: 0 !important;
        }
        
        .ql-toolbar button {
          padding: 4px;
          height: 28px;
          width: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }, []);

    return (
      <div className="flex flex-col w-full">
        <label className="block text-sm sm:text-base text-[#343434] mb-2">
          <span className="font-semibold text-xl font-kumbhSans">
            Message (Optional):
          </span>{" "}
          Write something memorable...
        </label>

        <div className="rich-text-editor rounded-lg border border-[#E8E8E8] overflow-hidden">
          <ReactQuill
            value={message}
            onChange={onMessageChange}
            placeholder="Start Typing..."
            modules={modules}
            formats={formats}
            className="h-full"
            theme="snow"
          />
        </div>
      </div>
    );
  },
);

RichTextField.displayName = "RichTextField";

export default RichTextField;
