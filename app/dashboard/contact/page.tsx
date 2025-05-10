import React from "react";
import { Accounts } from "@/components/accounts";
import { getAllUsers } from "@/actions/user.action";
import Error from "@/components/error";
import { getContactForms } from "@/actions/contact-form/action";
import { Contact } from "@/components/contact-forms";

const defaultMeta = {
  current_page: 1,
  page_items: 0,
  total_items: 0,
  total_pages: 1,
};
const ContactForms = async ({
  searchParams,
}: {
  searchParams: { page?: number; limit?: number };
}) => {
  const { error, data, meta } = await getContactForms({
    page: searchParams.page,
    limit: searchParams.limit,
  });
  console.log("🚀 ~ data:", data);

  if (!meta) return <Error error={error || "No Data found"} />;
  return <Contact data={data!} meta={meta} />;
};

export default ContactForms;
