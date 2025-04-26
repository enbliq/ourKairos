import { useFormContext } from "react-hook-form";
import Input from "@/app/components/form/Input";
import Select from "@/app/components/form/Select";
import { MouseEvent } from "react";
import useClipboard from "@/app/_hooks/useClipboard";

export default function CapsuleDeliveryForm() {
  const { isAvailable, copyText } = useClipboard();
  const { setValue, watch } = useFormContext();

  const [shareLink, deliveryOption] = watch(["shareLink", "deliveryOption"]);

  return (
    <div className="flex flex-col gap-3">
      <Select
        name="deliveryOption"
        label="Delivery Options"
        details="Public or Private"
        options={{
          "Email Address": "email",
          "Shareable Link": "link",
        }}
      />
      {deliveryOption === "email" && (
        <Input
          type="email"
          name="recipientEmail"
          label="Recipient Email Address"
          placeholder="Enter email address"
        />
      )}
      {deliveryOption === "link" && (
        <Input
          name="shareLink"
          label="Capsule Link"
          suffix={generateLinkPrefix()}
          readOnly
        />
      )}
      <Input
        type="password"
        name="password"
        label="Password protection"
        optional
        toggleable
        placeholder="Enter password"
      />
    </div>
  );

  function generateLinkPrefix() {
    if (!shareLink) {
      return (
        <div
          onClick={onGenerateLink}
          data-copy-to-clipboard-target="share-link"
          className="flex text-primary font-semibold cursor-pointer justify-center items-center text-nowrap select-none mx-4"
        >
          Generate link
        </div>
      );
    }

    if (isAvailable) {
      return (
        <div
          onClick={onCopyLink}
          className="flex text-primary font-semibold cursor-pointer justify-center items-center text-nowrap select-none mx-4"
        >
          Copy
        </div>
      );
    }
  }

  function onGenerateLink(ev: MouseEvent) {
    // Generate a unique link with timestamp and random components
    const timestamp = Date.now().toString(36); // Base36 timestamp
    const randomPart = generateRandomString(8); // 8 character random string
    const uniqueLink = `https://example.com/${timestamp}-${randomPart}`;

    setValue("shareLink", uniqueLink);
    ev.preventDefault();
  }

  function generateRandomString(length: number): string {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    if (window.crypto && window.crypto.getRandomValues) {
      const values = new Uint32Array(length);
      window.crypto.getRandomValues(values);

      for (let i = 0; i < length; i++) {
        result += charset[values[i] % charset.length];
      }
    } else {
      for (let i = 0; i < length; i++) {
        result += charset[Math.floor(Math.random() * charset.length)];
      }
    }

    return result;
  }

  function onCopyLink(ev: MouseEvent) {
    copyText(shareLink);
    ev.preventDefault();
  }
}
