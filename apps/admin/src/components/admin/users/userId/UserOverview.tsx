// import { Activity, Contact, Listing, User } from "@/lib/supabase/types";
// import { useTranslations } from "next-intl";
import EditUserForm from "./EditUserForm";

export type UserProps = {
  _id: string;
  username: string;
  email: string;
  phone: string;
};

export default function UserOverview({
  userInfo,
}: {
  userInfo: UserProps | null;
}) {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">User Overview</h1>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden">
          <EditUserForm userInfo={userInfo} />
        </div>
      </div>
    </>
  );
}
