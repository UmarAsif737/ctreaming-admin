
"use client"; // Add this line at the very top

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import React from "react";
import Image from "next/image";
import Button from "../shared/button";
import SectionHeadings from "../shared/heading";
import * as Yup from "yup";
import { createNewAdmin } from "@/actions/user.action";
import { toast } from "sonner";
import { IMAGES } from "@/public";

const AdminSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

function NewAdmin() {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    username: "",
    name: "",
    email: "",
    password: "",
  };

  const createAdmin = async (values: any, actions: any) => {
    const payload = {
      ...values,
      role: "admin",
    };
    setLoading(true);
    try {
      const result = await createNewAdmin(payload);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Admin created successfully!");
        actions.resetForm();
      }
    } catch (error) {
      console.log("🚀 ~ createAdmin ~ error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center px-10 py-5 bg-white dark:bg-black max-md:px-5">
      <section className="flex flex-col-reverse lg:flex-row-reverse gap-10 justify-center xl:justify-between items-center w-full max-w-[1240px] flex-grow">
        <div className="flex flex-col justify-center max-w-xl xl:justify-between w-full md:w-6/12">
          <Formik
            initialValues={initialValues}
            validationSchema={AdminSchema}
            onSubmit={createAdmin}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col p-6 bg-white dark:bg-[#18181b] border max-w-2xl border-black dark:border-white rounded-custom-sm rounded-3xl shadow-custom-black dark:shadow-custom-white">
                <SectionHeadings title="Create New Admin" description="" />

                <hr className="w-full border border-[#5F5F5F]" />

                <div className="flex flex-col mt-5 md:mt-10 w-full">
                  <label className="text-base font-medium text-gray-600 dark:text-gray-300">
                    Username
                  </label>
                  <Field
                    name="username"
                    type="text"
                    placeholder="e.g. admin123"
                    className="block w-full py-3 rounded-xl px-4 mt-2 placeholder-gray-500 border border-gray-200  focus:outline-none "
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />

                  <label className="mt-3 text-base font-medium text-gray-600 dark:text-gray-300">
                    Name
                  </label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="e.g. John Doe"
                    className="block w-full py-3 rounded-xl mt-2 px-4 placeholder-gray-500 border border-gray-200  focus:outline-none"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />

                  <label className="mt-3 text-base font-medium text-gray-600 dark:text-gray-300">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="e.g. johndoe@gmail.com"
                    className="block w-full py-3 rounded-xl mt-2 px-4 placeholder-gray-500 border border-gray-200 focus:outline-none focus:border-blue-600"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />

                  <label className="mt-3 text-base font-medium text-gray-600 dark:text-gray-300">
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="***********"
                    className="block w-full py-3 rounded-xl mt-2 px-4 placeholder-gray-500 border border-gray-200 focus:outline-none"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />

                  <Button type="submit" className="w-full mt-5" variant="black">
                    {loading ? "Registering..." : "Register"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <Image
          src={IMAGES.AUTH_IMAGE}
          width={500}
          height={500}
          alt="auth image"
          className="object-contain aspect-square w-full lg:min-w-[240px] lg:w-[500px]"
        />
      </section>
    </main>
  );
}

export default NewAdmin;
