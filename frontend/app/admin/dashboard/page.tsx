import AppHeader from "@/components/app-header";

const breadcrumbs = {
  link: "/admin/dashboard",
  linkTxt: "Dashboard",
};

const Dashboard = () => {
  return (
    <div>
      <AppHeader breadcrumbs={breadcrumbs} />
      <section className="px-4">Admin Dashboard</section>
    </div>
  );
};

export default Dashboard;
