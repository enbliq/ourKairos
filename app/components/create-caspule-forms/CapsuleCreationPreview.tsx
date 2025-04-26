"use client";

import { useFormContext } from "react-hook-form";
import MediaCarousel from "../MediaCarousel";
import { CreateCapsuleForm } from "@/app/_hooks/forms/useCreateCapsuleForm";
import { useMemo } from "react";
import { format } from "date-fns";

export default function CapsuleCreationPreview() {
  const { getValues, watch } = useFormContext<CreateCapsuleForm>();
  const formValues = getValues();

  const name = watch("name");
  const senderName = watch("senderName");
  const message = watch("message");
  const medias = watch("medias");
  const openDate = watch("openDate");

  const formattedDate = openDate ? format(openDate, "MM/dd/yyyy, h:mm a") : "";

  const mediaItems = useMemo(() => {
    if (!medias || medias.length === 0) return [];

    return Array.from(medias).map((file) => {
      const fileType = file.type.split("/")[0];

      return {
        src: URL.createObjectURL(file),
        alt: file.name,
        type: fileType as "image" | "video" | "audio",
        muted: fileType === "video",
        duration: 0,
      };
    });
  }, [medias]);

  return (
    <div className="w-full">
      <div className="mb-8 mt-8">
        <h2 className="text-lg font-medium mb-1">Preview Capsule</h2>
        <p className="text-sm text-gray-500 mb-4">
          Preview of capsule details before sending.
        </p>

        <div className="w-full h-48 bg-gradient-to-r from-pink-200 via-red-300 to-purple-200 rounded-lg mb-6"></div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="mb-2 font-bold">{name || "Hey User"}</h3>
            </div>
            {openDate && (
              <div className="text-right">
                <div className="text-sm">UNVEIL DATE</div>
                <div>{formattedDate}</div>
              </div>
            )}
          </div>

          <div className="mb-4">
            <span
              className="mb-2"
              dangerouslySetInnerHTML={{
                __html: message || "<p>No message content</p>",
              }}
            />
          </div>
          <p className="text-right">
            – <em>{senderName || "Anonymous"}</em>
          </p>
        </div>

        {mediaItems.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Media Attachment</h3>
            <MediaCarousel mediaItems={mediaItems} />
          </div>
        )}

        {formValues.deliveryOption === "link" && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Capsule Link</h3>
            <div className="bg-gray-50 p-3 rounded flex justify-between items-center">
              <div className="truncate">{formValues.shareLink}</div>
            </div>
          </div>
        )}

        {formValues["toggle-expiration"] && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Expiration</h3>
            <div className="bg-gray-50 p-3 rounded">
              {formValues.expiration} {formValues["expiration-unit"]}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
