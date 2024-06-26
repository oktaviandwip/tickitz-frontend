import Chart from "../../components/Dashboard/Chart";
import Header from "../../components/elements/Header";

const Dashboard = () => {
  const data1 = [
    "Movies Name",
    ["Black Widow", "The Witches", "Tenet", "Spider-Man: Homecoming"],
  ];
  const data2 = [
    "Period",
    ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"],
  ];

  const data3 = ["Category", ["Action", "Adventure", "Sci-Fi", "Comedy"]];
  const data4 = ["Location", ["Purwokerto", "Banjarnegara", "Purbalingga"]];

  return (
    <div className="w-full min-h-screen bg-dark-grey bg-opacity-[0.2] py-11">
      <Header userRole={"admin"} />
      <main className="w-[327px] md:w-[768px] lg:w-[1000px] xl:w-[1106px] mx-auto">
        <Chart title={"Sales Chart"} data1={data1} data2={data2} />
        <Chart title={"Ticket Sales"} data1={data3} data2={data4} />
      </main>
    </div>
  );
};

export default Dashboard;
