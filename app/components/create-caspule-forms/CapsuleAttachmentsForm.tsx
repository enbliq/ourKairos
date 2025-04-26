import FileUpload from "@/app/components/form/FileUpload";
/* import Input from '@/app/components/form/Input';
import Select from '@/app/components/form/Select'; */

export default function CapsuleAttachmentsForm() {
  return (
    <div className="flex flex-col gap-3">
      <FileUpload
        name="medias"
        label="Upload media"
        maxFileSize={25}
        multiple
        optional
      />
      {/* <Input
        type="number"
        name="funds"
        label="Attach Funds"
        optional
        placeholder="Enter amount to include in this capsule (e.g., 0.5 ETH)"
        suffix={
          <Select
            standalone
            name="currency"
            label="Currency"
            optional
            options={{
              ETH: "ETH",
              BTC: "BTC",
            }}
          />
        }
      /> */}
    </div>
  );
}
