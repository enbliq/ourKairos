import Input from "@/app/components/form/Input";
import RichTextField from "../RichText";
import { useFormContext } from "react-hook-form";

export default function CapsuleCreationForm() {
  const { watch, setValue } = useFormContext();
  const message = watch("message") || "";

  return (
    <div className="flex flex-col gap-1">
      <Input name="senderName" label="Sender Name" placeholder="Enter a name" />
      <Input
        name="name"
        label="Capsule Name"
        details="Give your capsule a meaningful title"
        placeholder="Name"
      />
      <RichTextField
        message={message}
        onMessageChange={(value) =>
          setValue("message", value, { shouldValidate: true })
        }
      />
    </div>
  );
}
