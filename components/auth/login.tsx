"use client";
import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/helpers/types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import React from "react";
import Image from "next/image";
import Button from "../shared/button";
import SectionHeadings from "../shared/heading";
import { IMAGES } from "@/public";

function LoginAccount({ searchParams }: { searchParams: { error?: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const initialValues: LoginFormType = {
    email: "",
    password: "",
  };

  const handleLogin = useCallback(async (values: LoginFormType) => {
    setLoading(true);
    try {
      await signIn("credentials", { ...values });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchParams.error) {
      router.replace("/login");
      toast.error(searchParams.error);
    }
  }, [searchParams, router]);

  return (
    <main className="flex flex-col h-screen items-center px-20 pt-5 mt-4 pb-9 bg-white dark:bg-black max-h-screen max-md:px-5">
      <section className="flex flex-col-reverse md:flex-row flex-wrap gap-10 justify-center xl:justify-between items-center w-full max-w-[1240px] flex-grow">
        <div className="flex flex-col justify-center  max-w-xl xl:justify-between w-full md:w-6/12">
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ handleSubmit, isSubmitting }) => (
              <Form className="flex flex-col p-6 bg-white dark:bg-[#18181b] border max-w-2xl border-black dark:border-white rounded-custom-sm rounded-3xl shadow-custom-black dark:shadow-custom-white ">
                <SectionHeadings title="Login & Continue" description="" />

                <hr className=" w-full border border-[#5F5F5F]" />

                {/* Input Fields */}
                <div className="flex flex-col mt-5 md:mt-10 w-full">
                  <label className="text-base font-medium text-gray-600 dark:text-gray-300">
                    Your Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="e.g. johndoe@gmail.com"
                    className="block w-full py-3 rounded-xl px-4 mt-2 placeholder-gray-500 border border-gray-200 focus:outline-none "
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />

                  <label className="mt-3 text-base font-medium text-gray-600 dark:text-gray-300">
                    Your Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="***********"
                    className="block w-full py-3 rounded-xl mt-2 px-4 placeholder-gray-500 border border-gray-200 focus:outline-none "
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />

                  <Button
                    type="submit"
                    className="w-full mt-5"
                    variant="black"
                    // disabled={isSubmitting}
                  >
                    {loading ? "Signing In..." : "Login"}
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
          className="object-contain aspect-square w-full md:min-w-[240px] md:w-[500px]"
        />
      </section>
    </main>
  );
}

export default LoginAccount;
