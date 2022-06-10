import React from "react";
import { dashboardCounts } from "../api/apiFunctions";
import { useQuery } from "react-query";

const Userdata = () => {
  const { data, isLoading } = useQuery("DashboardCount", () =>
    dashboardCounts()
  );
  const data1 = [
    {
      image: "/images/g-1.svg",
      text: data?.data?.users,
      description: `All Users`,
      imagee: "/images/contactimg.svg",
    },
    {
      image: "/images/g-1.svg",
      text: data?.data?.macAddressess,
      description: `Total MacAdress`,
      imagee: "/images/contactimg.svg",
    },
    {
      image: "/images/g-1.svg",
      text: data?.data?.mqtt,
      description: `Total Data`,
      imagee: "/images/contactimg.svg",
    },
    {
      image: "/images/g-1.svg",
      text: data?.data?.ota,
      description: `Total Files`,
      imagee: "/images/contactimg.svg",
    },
  ];
  return (
    <div className=' flex pr-9 mx-auto my-3'>
      {data1.map((el, index) => {
        return (
          <div
            key={index}
            className=' flex border border-gray-400 rounded-lg mb-2 pt-2 px-2   pb-2 mx-2 '>
            <div style={{ display: "flex" }}>
              <div>
                <img className='mx-1' alt='' src={el.imagee}></img>
              </div>
              <div>
                <p className='text-[18px] font-semibold px-2'>
                  {isLoading || el.text}
                </p>
                <p className='text-[#4a47a3] font-semibold text-[12px] px-2'>
                  {el.description}
                </p>
              </div>
            </div>
            <div>
              <img alt='' src={el.image}></img>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Userdata;
