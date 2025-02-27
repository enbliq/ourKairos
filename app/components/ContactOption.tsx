import { LucideIcon } from "lucide-react";

export interface ContactOptionProps {
  icon: LucideIcon;
  title: string;
  content: string;
}

// Reusable contact option component
const ContactOption: React.FC<ContactOptionProps> = ({
  icon: Icon,
  title,
  content,
}) => {
  return (
    <div className="flex flex-col items-center px-4 py-3 sm:py-4 bg-white shadow-sm border rounded-lg w-full sm:w-1/3">
      <div className=" p-2 rounded-full mb-2">
        <Icon className="h-5 w-5 text-purple-600" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{content}</p>
      </div>
    </div>
  );
};

export default ContactOption;
