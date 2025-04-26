import Image from "next/image";

export type CapsuleStatus = "sent" | "received" | "public";

export interface CapsuleCardProps {
  name: string;
  description: string;
  timeCreated: string;
  unveilTime: string;
  capsuleLink: string;
  status: CapsuleStatus;
  imageSrc?: string;
}

const CapsuleCard = ({
  name,
  description,
  timeCreated,
  unveilTime,
  capsuleLink,
  status,
  imageSrc = "/images/capsuleCardImg.jpeg",
}: CapsuleCardProps) => {
  const statusConfig: Record<CapsuleStatus, { color: string; label: string }> =
    {
      sent: {
        color: "#1E90FF",

        label: "Sent",
      },
      received: {
        color: "#34D399",
        label: "Received",
      },
      public: {
        color: "#E98000",
        label: "Public",
      },
    };

  const config = statusConfig[status];

  return (
    <div className="flex flex-col border-[0.71px] border-[#EEEEEEEE] w-full max-w-[300px] md:max-w-[350px] rounded-[9.41px]">
      <div className="border-[0.71px] border-[#EEEEEEEE] overflow-hidden rounded-t-[9.41px]">
        <Image
          src={imageSrc}
          alt={`${name} Capsule`}
          width={500}
          height={500}
          className="w-full h-full max-h-[159px] object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 rounded-[9.41px] border-[0.71px] border-[#EEEEEEEE] p-3">
        <div className="flex justify-between flex-col gap-3">
          <p
            className="flex items-center gap-1.5 text-[10px] font-inter"
            style={{ color: config.color }}
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: config.color }}
            ></span>
            <span className="font-bold font-dmSans uppercase text-[10px]">
              {config.label}
            </span>
          </p>
          <div className="flex flex-col gap-3 text-[#212121]">
            <div className="gap-1.5 flex flex-col">
              <p className="text-normal font-dmSans font-bold leading-[100%]">
                {name}
              </p>
              <p className="text-[#212121] font-dmSans leading-[100%] font-normal line-clamp-3">
                {description}
              </p>
            </div>
            <span className="w-full flex justify-start items-center gap-2 font-black text-[10px] mt-1 leading-[100%] uppercase font-dmSans text-[#363A3F]">
              <span className="">Created:</span>
              <span className="">{timeCreated}</span>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between my-1">
          <span className="text-[10px] font-bold font-dmSans text-[#212121] uppercase">
            {unveilTime}
          </span>
          <a
            href={capsuleLink}
            className="font-dmSans inline-flex shadow-md p-2 rounded w-full max-w-[88px] items-center justify-center gap-2 whitespace-nowrap text-[10px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-to-r from-[#37945E] to-[#34D399] text-white hover:bg-gradient-to-br hover:from-[#37945E] hover:to-[#34D399]"
          >
            Open Capsule
          </a>
        </div>
      </div>
    </div>
  );
};

export default CapsuleCard;
