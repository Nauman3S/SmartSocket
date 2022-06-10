import React, { useState } from "react";
import { Modal, Upload, notification, Button, message, Popconfirm } from "antd";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAllFiles, uploadOtaFile, deleteOtaFile } from "../api/apiFunctions";
import {
  LoadingOutlined,
  DeleteOutlined,
  UploadOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";

export default function DashboardData() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uploadFileList, setUploadFileList] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploaing] = useState(false);
  const [showUploadList, setUploadList] = useState(true);

  const { data, isLoading: dataLoading } = useQuery("getAllFiles", getAllFiles);
  console.log(data);

  const queryClient = useQueryClient();

  const getDataMutation = useMutation(getAllFiles, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getAllFiles");
    },
  });

  const userDataArea = (data, index) => {
    return (
      <tr key={index}>
        <td className='table_text'>{`${data.fileName}`}</td>
        <td className='table_text'>
          {
            <Popconfirm
              title='Are you sure to delete this file?'
              onConfirm={() => {
                handleDeleteFile(data.key);
              }}
              okText='Yes'
              cancelText='No'>
              <Button type='danger'>Delete</Button>
            </Popconfirm>
          }
        </td>
      </tr>
    );
  };
  const handleDeleteFile = async (key) => {
    const res = await deleteOtaFile(key);
    if (res.status === 200) {
      getDataMutation.mutate();

      notification["success"]({
        message: "File Deleted ",
      });
    } else {
      setUploaing(false);
      setIsModalVisible(false);
      setUploadFile(null);
      notification["error"]({
        message: "Something went wrong! Please check your internet connection",
      });
      setUploadList(false);
    }
  };
  const handleUpload = async () => {
    const formData = new FormData();
    setUploaing(true);
    setUploaing(false);
    setIsModalVisible(false);
    setUploadList(false);
    setUploadFile(null);

    // uploadFileList.forEach((file) => {
    formData.append("file", uploadFile);
    // });

    const res = await uploadOtaFile(formData);
    if (res.status === 200) {
      getDataMutation.mutate();

      notification["success"]({
        message: "File Uploaded Successfully!",
      });
    } else {
      setUploaing(false);
      setIsModalVisible(false);
      setUploadFile(null);
      notification["error"]({
        message: "Something went wrong! Please check your internet connection",
      });
      setUploadList(false);
    }
  };

  const beforeUpload = (file, fileList) => {
    setUploadFile(file);
    return false;
  };

  return (
    <>
      <div className='dashboard'>
        <div className='d-flex justify-content-between'>
          <p
            className='dash_title
      pt-2'></p>
          {/* <Link className='' to='/add-new-patient'> */}
          <button
            className='creat_btn mt-5 mb-3 mr-10'
            onClick={() => {
              console.log("hello");
              setIsModalVisible(true);
            }}>
            Upload File
          </button>
          {/* </Link> */}
        </div>
        <div className='pr-4'>
          <div className='row pl-0 pr-0 mr-0 ml-0'>
            <div className='col-lg col-md padding_table'>
              <div className='table-responsive'>
                <div className='table_label mb-3 mt-3'>
                  <div className='upcom_lable'>All Files</div>
                  <div>
                    <div>
                      <img src='/images/table.svg' height='' width='' alt='' />
                    </div>
                  </div>
                </div>
                <table className='table  background_table'>
                  <thead className='thead-dark'>
                    <tr>
                      <th className='heading_table' scope='col'>
                        File Name
                      </th>
                      <th className='heading_table' scope='col'>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataLoading || data?.data?.ota.map(userDataArea)}
                  </tbody>
                </table>
                {/* <Link className='' to='/all-users-data'>
                  <div className='text-center pb-4'>
                    <img src='/images/dateimg.svg' alt='' />
                  </div>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title='Upload File'
        visible={isModalVisible}
        // onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        footer={null}>
        <div style={{ textAlign: "center" }}>
          <Upload
            showUploadList={true}
            beforeUpload={beforeUpload}
            // onRemove={onRemove}
          >
            <Button
              type='primary'
              icon={<AppstoreAddOutlined />}
              style={{ marginTop: "5vh", width: "100%" }}>
              Select File
            </Button>
          </Upload>

          <Button
            type='primary'
            onClick={handleUpload}
            loading={uploading}
            // disabled={uploadFile}
            icon={<UploadOutlined />}
            style={{ marginTop: "5vh", width: "100%" }}>
            <span className='btn-inner--text'>
              {uploading ? "Uplaoding" : "Upload Photos"}
            </span>
            {/* <span className='btn-inner--icon'>
              {uploading ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ fontSize: 24, marginLeft: "20px" }}
                      spin
                    />
                  }
                />
              ) : (
                <i className='ni ni-cloud-upload-96'></i>
              )}
            </span> */}
          </Button>
        </div>
      </Modal>
    </>
  );
}
