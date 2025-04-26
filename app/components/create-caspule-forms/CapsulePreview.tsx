"use client";
import MediaAttachmentPreview from "../MediaAttachmentPreview";

export default function CapsulePreview({ isCreationMode = true }) {
  // Default data if not provided
  const capsule = {
    deliveryOption: "link",
    medias: [{}],
    "toggle-expiration": true,
    currency: "ETH",
    type: "private",
    senderName: "name",
    name: "capsule name",
    message: "<p>asdjkadas</p>",
    expiration: 2,
    openDate: "2025-04-23T08:29:00.000Z",
    "expiration-unit": "hours",
    shareLink: "https://example.com/m9mj3yxd-BDN9VTNv",
    "toggle-password": true,
    password: "12121",
  };

  // Format the dates for display
  const formattedDueDate = new Date(capsule.openDate).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );

  const formattedCreatedDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Format the open date for countdown
  const openDate = new Date(capsule.openDate);
  const timeString = openDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const dateString = openDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with progress indicator - only shown in creation mode */}
        {isCreationMode && (
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Preview Capsule
              </h1>
              <div className="mt-2 sm:mt-0 flex items-center">
                <span className="text-sm font-medium text-gray-500">
                  Step 3 of 3
                </span>
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Completed
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Preview of capsule details before sending.
            </p>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Capsule header with gradient */}
          <div className="relative h-48 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>

            {/* Date information */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between text-white">
              <div className="bg-black/30 backdrop-blur-md rounded-full px-4 py-1 text-sm">
                <span>Due Date: {formattedDueDate}</span>
              </div>
              <div className="bg-black/30 backdrop-blur-md rounded-full px-4 py-1 text-sm">
                <span>Created: {formattedCreatedDate}</span>
              </div>
            </div>
          </div>

          {/* Capsule content */}
          <div className="p-6">
            {/* Capsule name */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {capsule.name}
              </h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                {capsule.type === "private" ? "Private" : "Public"}
              </span>
            </div>

            {/* Message section */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Message
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div
                  className="text-gray-800"
                  dangerouslySetInnerHTML={{ __html: capsule.message }}
                />
                <div className="mt-2 text-gray-700">– {capsule.senderName}</div>
              </div>
            </div>

            {/* Delivery method section */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Delivery Method
              </h3>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  {capsule.deliveryOption === "link" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {capsule.deliveryOption === "link"
                      ? "Shareable Link"
                      : "Email Delivery"}
                  </div>
                  {capsule.deliveryOption === "link" && (
                    <div className="text-xs text-gray-500 flex items-center">
                      <span className="truncate max-w-xs">
                        {capsule.shareLink}
                      </span>
                      <button className="ml-2 text-blue-500 hover:text-blue-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="9"
                            y="9"
                            width="13"
                            height="13"
                            rx="2"
                            ry="2"
                          ></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Password protection */}
              {capsule["toggle-password"] && (
                <div className="mt-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Password Protected
                    </div>
                    <div className="text-xs text-gray-500">
                      Recipient will need the password to view
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Media attachment section */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Media Attachment
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2].map((item, index) => (
                  <MediaAttachmentPreview
                    alt="media uploads"
                    key={index}
                    src="/public/images/character.png"
                  />
                ))}
                <MediaAttachmentPreview
                  alt="media uploads"
                  src="/public/audio/winner.mp3"
                />
                <MediaAttachmentPreview
                  alt="media uploads"
                  src="/public/img/character.png"
                />
              </div>
            </div>
          </div>

          {/* Countdown section */}
          <div className="mt-6 mx-6 p-4 border border-dashed border-gray-300 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Countdown
            </h3>
            <div className="flex justify-center">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-gray-900">00</div>
                  <div className="text-xs text-gray-500">Days</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">00</div>
                  <div className="text-xs text-gray-500">Hours</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">00</div>
                  <div className="text-xs text-gray-500">Minutes</div>
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-center items-center text-sm text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>{dateString}</span>
              <span className="mx-2">•</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>{timeString}</span>
            </div>

            {/* Expiration info */}
            {capsule["toggle-expiration"] && (
              <div className="mt-3 text-center text-xs text-gray-500">
                <span className="inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 2h4"></path>
                    <path d="M12 14v-4"></path>
                    <path d="M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6"></path>
                  </svg>
                  Expires {capsule.expiration} {capsule["expiration-unit"]}{" "}
                  after opening
                </span>
              </div>
            )}

            {/*  <CapsuleCountDown /> */}
          </div>

          {/* Fund attachment section */}
          {/*  <div className="mt-6 mx-6 p-4 border border-dashed border-gray-300 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Fund Attachment
            </h3>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-amber-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path>
                  <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path>
                  <path d="M18 12a2 2 0 0 0 0 4h2v-4h-2z"></path>
                </svg>
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  30 {capsule.currency}
                </div>
                <div className="text-xs text-gray-500">Attached to capsule</div>
              </div>
            </div>
          </div> */}

          {/* Action buttons - only shown in creation mode */}
          {isCreationMode && (
            <div className="p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-between gap-3">
              <button className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Edit Capsule
              </button>
              <button className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Send Capsule
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
