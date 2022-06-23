import { Skeleton, Modal, Input, Select, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import moment from "moment";
import {
  getDataByMacAddress,
  addMacAddress,
  publishToMqtt,
  updateBtnState,
  getAllMacAdresses,
  getButtonByMacAddress,
} from "../api/apiFunctions";
import Swal from "sweetalert2";

const { Option } = Select;

const pumpBtns = [{ name: "Pump 1", value: 1, state: 0 }];

const Client = () => {
  /* Component States */
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [macaddress, setMacaddress] = useState("");
  const [selectedMacaddress, setSelectedMacaddress] = useState("");
  const [okBtnLoading, seOkBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mqttData, setMqttData] = useState([]);
  const [btns, setBtns] = useState([{ name: "", value: null, state: null }]);
  const [isBtnModalVisible, setBtnModalVisible] = useState(false);
  const [btnName, setBtnName] = useState("");
  const [btn, setBtn] = useState({});

  /* Component Data Fetching */
  const { data: macAddressess } = useQuery("MacAddressess", getAllMacAdresses);

  const { data: mqttDataBtn, isLoading: mqttLoading } = useQuery(
    ["getButtonByMacAddress", selectedMacaddress],
    () => getButtonByMacAddress(selectedMacaddress)
  );

  useEffect(() => {
    setBtn(mqttDataBtn?.data?.button[0]?.deviceDetails[0]);
    setMqttData(mqttDataBtn?.data?.data);
    setFilteredData(mqttDataBtn?.data?.data);
  }, [mqttDataBtn?.data?.data, mqttDataBtn?.data?.button]);

  const queryClient = useQueryClient();

  /* Mutations */
  const getMacMutation = useMutation(getAllMacAdresses, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("MacAddressess");
    },
  });

  const getDataMutation = useMutation(getButtonByMacAddress, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([
        "getButtonByMacAddress",
        selectedMacaddress,
      ]);
    },
  });

  /* Use Effect Hooks */
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const userDataArea = (data, index) => {
    return (
      <tr key={index}>
        <td className='table_text'>{`${data.macAddress}`}</td>
        <td className='table_text'>{`${data.currentValue}`}</td>
        <td className='table_text'>{`${data.switchState}`}</td>
        <td className='table_text'>{`${moment(data.updatedAt).format(
          "DD-MM-YYYY/HH:mm:ss"
        )}`}</td>
      </tr>
    );
  };

  //Modal functions
  const handleOk = async () => {
    seOkBtnLoading(true);
    const res = await addMacAddress(macaddress, btnName, "0");
    if (res.status === 200) {
      getMacMutation.mutate();
      seOkBtnLoading(false);

      setBtnModalVisible(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Macaddress Added",
        titleText: res?.data?.message,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      setBtnModalVisible(false);
      seOkBtnLoading(false);

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
  const handleMacaddressChange = async (value) => {
    setSelectedMacaddress(value);
  };

  const renderOptions = macAddressess?.data?.data?.deviceDetails?.map(
    (data) => {
      return <Option value={data.macAddress}>{data.macAddress}</Option>;
    }
  );
  const handleBtnOnOff = async (macAddress, btnState, btnName) => {
    seOkBtnLoading(true);
    if (btnState === "1") {
      btnState = "0";
    } else {
      btnState = "1";
    }
    const res = await updateBtnState(macAddress, btnName, btnState);
    if (res.status === 200) {
      getDataMutation.mutate();
    }

    const message = {
      btnName: btnName,
      state: btnState,
    };

    const res1 = await publishToMqtt(selectedMacaddress, message);
    if (res1.status === 200) {
      seOkBtnLoading(false);

      // Swal.fire({
      //   position: "center",
      //   icon: "success",
      //   title: "Pump",
      //   titleText: `Pump ${pumpNumber} ${pumpState === 1 ? "Off" : "On"}`,
      //   showConfirmButton: false,
      //   timer: 2000,
      // }
      // );
    } else {
      seOkBtnLoading(false);

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

  // const renderButtons = macAddressess?.data?.data?.deviceDetails?.map(
  //   (data) => {
  //     return (
  //       <button
  //         className='creat_btn mt-5 mb-3 mr-4'
  //         onClick={() =>
  //           handlePumpBtns(data.macAddress, data.btnState, data.btnName)
  //         }>
  //         {data.btnName}
  //       </button>
  //     );
  //   }
  // );

  const handleAddNewBtn = () => {
    handleOk();
    // seOkBtnLoading(true);
    const count = btns.length;
    setBtns([...btns, { name: `${btnName}`, value: count, state: 0 }]);
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
          {/* <Link className='' to='/add-new-patient'> */}
          <button
            className='creat_btn mt-5 mb-3 mr-4'
            onClick={() => setBtnModalVisible(true)}>
            Add New Button
          </button>
          {/* </Link> */}
        </div>
        <div className='patient_labels d-flex justify-content-between pr-5'>
          <div className='patient_data'>
            Sensors /
            <span style={{ color: "#4A47A3", paddingLeft: "8px" }}>Data</span>
          </div>
        </div>
        <div className=' mt-3'>
          <div className='serch'>
            <div style={{ display: "flex" }}>
              <Select
                className='col-10'
                defaultValue='Select Macaddress'
                onClick={() => {
                  getMacMutation.mutate();
                }}
                onChange={handleMacaddressChange}>
                {renderOptions}
              </Select>
            </div>
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
                    Macaddress
                  </th>
                  <th
                    className='heading_table'
                    scope='col'
                    style={{ textAlign: "center" }}>
                    Power Usage (Watts)
                  </th>
                  <th
                    className='heading_table'
                    scope='col'
                    style={{ textAlign: "center" }}>
                    Switch State
                  </th>

                  <th
                    className='heading_table'
                    scope='col'
                    style={{ textAlign: "center" }}>
                    Date/Time
                  </th>
                </tr>
              </thead>
              {mqttData && Object.keys(mqttData).length > 0 && (
                <tbody>{mqttData.map(userDataArea)}</tbody>
              )}
            </table>
            {/* {loading && <Skeleton paragraph={{ rows: 5 }} active />} */}

            {/* {renderButtons} */}
            {selectedMacaddress && btn && (
              <Button
                className='mt-5 mb-3 mr-4 ml-5'
                style={{
                  width: "40%",
                  border: "none",
                  height: "40px",
                  backgroundColor: "#1890ff",
                  color: "white",
                }}
                shape='round'
                loading={okBtnLoading}
                // type='primary'
                onClick={() =>
                  handleBtnOnOff(btn.macAddress, btn.btnState, btn.btnName)
                }>
                {`${btn.btnName} ${btn.btnState === "0" ? "(OFF)" : "(ON)"}`}
              </Button>
            )}
          </div>
        </div>
      </div>
      <Modal
        title='New MacAddress'
        visible={isModalVisible}
        onOk={handleOk}
        destroyOnClose
        okText={"Add"}
        okButtonProps={{
          loading: okBtnLoading,
          style: { backgroundColor: "#1890ff", color: "white" },
        }}
        okType={"primary"}
        bodyStyle={{ borderRadius: 50 }}
        onCancel={() => setIsModalVisible(false)}>
        <Input
          placeholder='Enter Macaddress'
          onChange={(e) => {
            setMacaddress(e.target.value);
          }}
        />
      </Modal>
      <Modal
        title='New Button'
        destroyOnClose
        visible={isBtnModalVisible}
        onOk={handleAddNewBtn}
        okText={"Add"}
        okButtonProps={{
          loading: okBtnLoading,
          style: { backgroundColor: "#1890ff", color: "white" },
        }}
        // okType={"primary"}
        bodyStyle={{ borderRadius: 50 }}
        onCancel={() => setBtnModalVisible(false)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Input
            placeholder='Enter Button Name'
            style={{
              marginBottom: "10px",
              width: "80%",
              borderRadius: "10px",
              height: "40px",
            }}
            onChange={(e) => {
              setBtnName(e.target.value);
            }}
          />
          <Input
            placeholder='Enter Id (Macaddress)'
            onChange={(e) => {
              setMacaddress(e.target.value);
            }}
            style={{
              width: "80%",
              borderRadius: "10px",
              height: "40px",
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default Client;
