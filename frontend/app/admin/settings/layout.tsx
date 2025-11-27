import AppHeader from "@/components/app-header";
import SettingSideBar from "@/components/setting-sidebar";


const breadcrumbs = {
  link: "/admin/settings",
  linkTxt: "Settings",
};

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    
  return (
    <>
      <AppHeader breadcrumbs={breadcrumbs} />
      <section className="flex px-6 gap-6 py-4">
        {/* Sidebar */}
        <SettingSideBar />

        {/* Content area */}
        <section className="flex-1 bg-white rounded-2xl shadow-md p-6 border">
          {children}
        </section>
      </section>
    </>
  );
}
