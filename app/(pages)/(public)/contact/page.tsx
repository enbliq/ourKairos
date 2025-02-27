"use client";
import React, { useState } from "react";
import { Mail, Phone, MessageSquare } from "lucide-react";
import ContactOption from "@/app/components/ContactOption";

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSupportForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };
  const contactOptions = [
    { icon: Mail, title: "Email", content: "support@mywebsite.com" },
    { icon: Phone, title: "Phone", content: "+1 (555) 123-4567" },
    {
      icon: MessageSquare,
      title: "Live Chat",
      content: "Available 9am-5pm EST",
    },
  ];
  return (
    <div className="flex justify-center items-center min-h-screen bg-lavender px-2 py-2">
      <div className="w-full max-w-2xl  p-2 sm:p-8  ">
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-2 sm:mb-6">
          Contact Support
        </h1>
        <p className="text-xs sm:text-sm text-center text-gray-600 mb-6 sm:mb-8">
          We are here to help. Send us a message and we will respond as soon as
          possible.
        </p>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-2 sm:mb-8">
          {contactOptions.map((option, index) => (
            <ContactOption
              key={index}
              icon={option.icon}
              title={option.title}
              content={option.content}
            />
          ))}
        </div>
        <div className="bg-white items-center justify-center rounded-md -mb-2 shadow-sm border">
          <h2 className="text-md sm:text-lg font-medium m-4 sm:mb-4 p-2">
            Send us a message
          </h2>
        </div>
        <div className="bg-white p-5 shadow-sm border  rounded-b-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 sm:mb-4">
              <label
                htmlFor="name"
                className="block text-xs sm:text-sm font-medium text-gray-900 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="mb-3 sm:mb-4">
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium text-gray-900 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="mb-3 sm:mb-4">
              <label
                htmlFor="subject"
                className="block text-xs sm:text-sm font-medium text-gray-900 mb-1"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="mb-4 sm:mb-6">
              <label
                htmlFor="message"
                className="block text-xs sm:text-sm font-medium text-gray-900 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purpleCustom text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSupportForm;
