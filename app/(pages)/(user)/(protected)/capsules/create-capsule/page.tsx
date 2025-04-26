"use client";
import React from "react";
import useStepper from "@/app/_hooks/useStepper";
import CapsuleAttachmentsForm from "@/app/components/create-caspule-forms/CapsuleAttachmentsForm";
import CapsuleCreationForm from "@/app/components/create-caspule-forms/CapsuleCreationForm";
import CapsuleDeliveryForm from "@/app/components/create-caspule-forms/CapsuleDeliveryForm";
import CapsuleExpiryForm from "@/app/components/create-caspule-forms/CapsuleExpiryForm";
import BackButton from "@/app/components/BackButton";
import Button from "@/app/components/Button";
import useCreateCapsuleForm, {
  CreateCapsuleForm,
} from "@/app/_hooks/forms/useCreateCapsuleForm";
import { FormProvider } from "react-hook-form";
import CapsuleCountDown from "@/app/components/create-caspule-forms/CapsuleCountDown";
import CapsuleCreationPreview from "@/app/components/create-caspule-forms/CapsuleCreationPreview";
import { useRouter } from "next/navigation";

// Define interfaces for type safety
interface MediaItem {
  mediaId: string;
  url: string;
  mediaType: string;
  fileName: string;
  fileSize: number;
}

interface MediaUploadResult {
  public_id: string;
  secure_url: string;
  resource_type: string;
  original_filename: string;
  bytes: number;
}

const nbSteps = 4;

export default function NewCapsulePage() {
  const router = useRouter();
  const { step, nextStep, previousStep, Stepper } = useStepper({
    steps: nbSteps,
  });
  const form = useCreateCapsuleForm(step);

  return (
    <div className="px-10 mt-14 mb-8">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 xl:grid-cols-[5fr_4fr] gap-x-32 gap-y-8">
            <div className="flex items-end justify-between">
              <div className="max-w-[372px]">
                <div className="font-bold text-xl mb-3 font-kumbhSans">
                  Create Your Timely Capsule
                </div>
                <div className="text-base font-medium text-[#3C3C3C] font-inter">
                  Send a message into the future—text, media, or even crypto
                  gifts, sealed until the perfect moment.
                </div>
              </div>
              <Stepper />
            </div>
            <div />
            {displayStep()}
            {renderButtons()}
          </div>
        </form>
      </FormProvider>
    </div>
  );

  function displayStep() {
    if (step === 4) {
      return <CapsuleCreationPreview />;
    } else if (step === 3) {
      return (
        <>
          <CapsuleDeliveryForm />
          <CapsuleCountDown />
        </>
      );
    } else if (step === 2) {
      return (
        <>
          <CapsuleExpiryForm />
          <div />
        </>
      );
    }
    return (
      <>
        <CapsuleCreationForm />
        <CapsuleAttachmentsForm />
      </>
    );
  }

  function renderButtons() {
    const buttons: JSX.Element[] = [];

    if (step > 1) {
      buttons.push(
        <BackButton key="back" buttonAction={previousStep} variant="plain" />,
      );
    }

    const label =
      step === 3 ? "See Preview" : step === nbSteps ? "Create Capsule" : "Next";

    buttons.push(
      <Button
        key="next"
        outline={false}
        label={label}
        type="submit"
        size="lg"
      />,
    );

    return (
      <div className="flex gap-4 items-center justify-end mt-12">{buttons}</div>
    );
  }

  function onSubmit(data: CreateCapsuleForm) {
    nextStep();
    //console.log('submit capsule', form.getValues());

    if (step >= nbSteps) {
      submitForm(data);
    }
  }

  async function submitForm(data: CreateCapsuleForm) {
    try {
      //setSubmitting(true);

      // Step 1: Upload any media files first
      const mediaUploadPromises: Promise<MediaUploadResult>[] = [];
      const mediaData: MediaItem[] = [];

      if (data.medias && data.medias.length > 0) {
        for (const file of data.medias) {
          mediaUploadPromises.push(uploadMedia(file));
        }

        // Wait for all uploads to complete
        const uploadedMedia = await Promise.all(mediaUploadPromises);

        // Format media data for the capsule
        uploadedMedia.forEach((media) => {
          mediaData.push({
            mediaId: media.public_id,
            url: media.secure_url,
            mediaType: media.resource_type,
            fileName: media.original_filename,
            fileSize: media.bytes,
          });
        });
      }

      // Step 2: Create the capsule with uploaded media references
      const capsuleData = {
        name: data.name,
        senderName: data.senderName,
        message: data.message,
        type: data.type || "public",
        openDate: data.openDate,
        expirationEnabled: data["toggle-expiration"] || false,
        expiration: data.expiration,
        expirationUnit: data["expiration-unit"] || "minutes",
        deliveryOption: data.deliveryOption,
        shareLink: data.shareLink,
        recipientEmail: data.recipientEmail,
        passwordProtected: data["toggle-password"] || false,
        password: data.password,
        media: mediaData,
        currency: data.currency,
        funds: data.funds,
      };

      // Send the capsule data to your API
      //const response = await axios.post('/api/capsules', capsuleData);

      router.push(`/capsules`);
      console.log("Capsule created successfully:", capsuleData);
      console.log("Capsule created successfully:", data);
    } catch (error) {
      console.error("Error submitting capsule:", error);
      //setSubmitError('Failed to create capsule. Please try again.');
    } finally {
      //setSubmitting(false);
    }
  }

  async function uploadMedia(file: File): Promise<MediaUploadResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          public_id: `capsule_media_${Math.random().toString(36).substring(2, 15)}`,
          secure_url: URL.createObjectURL(file),
          resource_type: file.type.split("/")[0],
          original_filename: file.name,
          bytes: file.size,
        });
      }, 1000);
    });
  }
}
