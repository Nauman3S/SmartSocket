import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAllUsersMacaddress } from "../api/apiFunctions";

const AllUsersData = () => {
  /* Component States */
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  /* Component Data Fetching */
  const { data, isLoading } = useQuery(
    "getAllUsersMacaddress",
    getAllUsersMacaddress
  );

  /* Use Effect Hooks */
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  useEffect(() => {
    setUserData(data?.data?.Macaddressess);
    setFilteredData(data?.data?.Macaddressess);
  }, [isLoading, data?.data?.Macaddressess]);

  /* On change function for fields */

  const onSearch = ({ target: { value } }) =>
    setFilteredData(
      userData.filter((user) =>
        `${user.fullName}`.toLowerCase().includes(value.toLowerCase())
      )
    );
  const userDataArea = (data, index) => {
    if (data.userId.role === "admin") return;
    return (
      <tr key={index}>
        <td className='table_text'>{`${data.userId.fullName}`}</td>
        <td className='table_text'>{`${data.userId.email}`}</td>
        <td className='table_text'>{`${data.macAddress}`}</td>
      </tr>
    );
  };
  return (
    <>
      <div>
        <div className='d-flex justify-content-between'>
          <p
            className='dash_title
      pt-2'>
            All Users
          </p>
        </div>
        <div className='patient_labels d-flex justify-content-between pr-5'>
          <div className='patient_data'>
            Users /
            <span style={{ color: "#4A47A3", paddingLeft: "8px" }}>
              All users data
            </span>
          </div>
        </div>
        <div className=' mt-3'>
          <div className='serch'>
            <img className='search_img' src='/images/searc.svg' alt='' />
            <input
              type='text'
              className='form-control search_input col-10'
              placeholder='Search By User Name'
              onChange={onSearch}
            />
          </div>
        </div>
        <div className='col-lg-12 col-md-8 padding_table mt-2 pl-0'>
          <div className='table-responsive pl-0 pr-0'>
            <table className='table  background_table'>
              <thead className='thead-dark'>
                <tr>
                  <th className='heading_table' scope='col'>
                    Full Name
                  </th>
                  <th className='heading_table' scope='col'>
                    Email
                  </th>
                  <th className='heading_table' scope='col'>
                    MacAddressess
                  </th>
                </tr>
              </thead>
              {isLoading ||
                (filteredData && Object.keys(filteredData).length > 0 && (
                  <tbody>{filteredData.map(userDataArea)}</tbody>
                ))}
            </table>
            {isLoading && <Skeleton paragraph={{ rows: 5 }} active />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsersData;
