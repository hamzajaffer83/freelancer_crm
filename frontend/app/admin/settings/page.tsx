import AppHeader from "@/components/app-header";

const breadcrumbs = {
  link: "/admin/settings",
  linkTxt: "Settings",
};

const Settings = () => {
  return (
    <div>
      <AppHeader breadcrumbs={breadcrumbs} />
      <section className="px-4">Settings</section>
    </div>
  );
};

export default Settings;
