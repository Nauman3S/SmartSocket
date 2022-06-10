import { useState, useEffect } from "react";

import { Skeleton, Button, Popconfirm, Empty } from "antd";
import { getAllMacAdresses, removeMacaddress } from "../api/apiFunctions";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";

const Settings = () => {
  const [macaddressess, setMacaddressess] = useState([]);

  const { data: macAddressess, isLoading: loading } = useQuery(
    "MacAddressess",
    getAllMacAdresses
  );

  useEffect(() => {
    setMacaddressess(macAddressess?.data?.data);
  }, [macAddressess?.data?.data]);

  const queryClient = new useQueryClient();
  const getMacMutation = useMutation(getAllMacAdresses, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("MacAddressess");
    },
  });

  console.log(macAddressess);

  const userDataArea = (data, index) => {
    return (
      <tr key={index}>
        <td className='table_text'>{`${data}`}</td>
        <td className='table_text'>
          <Popconfirm
            title='Are you sure to delete this MacAddress?'
            onConfirm={() => handleDeleteMacaddress(data)}
            // onCancel={cancel}
            okText='Yes'
            cancelText='No'>
            {" "}
            <Button type='danger'>Delete</Button>
          </Popconfirm>
        </td>
      </tr>
    );
  };
  const handleDeleteMacaddress = async (macAddress) => {
    const res = await removeMacaddress(macAddress);
    if (res.status === 200) {
      getMacMutation.mutate();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Macaddress Deleted",
        titleText: res?.data?.message,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went Wrong! Please check your internet connection",
        // titleText: res?.data?.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
  return (
    <>
      <div>
        <div className='d-flex justify-content-between'>
          <p
            className='dash_title
      pt-2'>
            Settings
          </p>
          <button
            className='creat_btn mt-5 mb-3 mr-4'
            style={{ cursor: "none" }}>
            {macAddressess?.data?.data?.userId?.fullName}
          </button>
          {/* </Link> */}
        </div>
        <div className='patient_labels d-flex justify-content-between pr-5'>
          <div className='patient_data'>
            User /
            <span style={{ color: "#4A47A3", paddingLeft: "8px" }}>Data</span>
          </div>
        </div>

        <div className='col-lg-12 col-md-8 padding_table mt-2 pl-0'>
          <div className='table-responsive pl-0 pr-0'>
            <table className='table  background_table'>
              <thead className='thead-dark'>
                <tr>
                  <th
                    className='heading_table'
                    scope='col'
                    style={{ textAlign: "center" }}>
                    MacAddressess
                  </th>
                  <th
                    className='heading_table'
                    scope='col'
                    style={{ textAlign: "center" }}>
                    Action
                  </th>
                </tr>
              </thead>
              {macaddressess && Object.keys(macaddressess).length > 0 && (
                <tbody>{macaddressess?.macAddress?.map(userDataArea)}</tbody>
              )}
            </table>
            {loading && <Skeleton paragraph={{ rows: 5 }} active />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
