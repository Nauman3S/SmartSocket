import DashboardData from "../components/DashboardData";
import Userdata from "../components/Userdata";
const Admin = () => {
  return (
    <div className=''>
      <div className='dashboard-contents'>
        <div
          className='dash_title
      pt-2'>
          Dashboard
        </div>
      </div>

      <Userdata />
      <DashboardData />
    </div>
  );
};

export default Admin;
