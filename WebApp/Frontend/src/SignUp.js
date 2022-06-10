import { Button, Form, Input, notification } from "antd";
// import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Globle.css";
import { Link } from "react-router-dom";
import { signUp } from "./api/apiFunctions";
import { useNavigate } from "react-router";
function Signup() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        window.location.pathname = "/dashboard";
      }
    }
  }, [loading, isAuthenticated]);
  const handleSignup = async (values) => {
    const res = await signUp(values);
    if (res.status === 200) {
      notification["success"]({
        message: `${res.data.message}`,
      });
      navigate("/");
    } else {
      notification["error"]({
        message: "Signup Failed",
      });
    }
  };
  return (
    <>
      <div
        style={{ display: `${loading ? "none" : "flex"}` }}
        className='login_page'>
        <div className='flex1'>
          <img src='/images/logo.jpeg' alt=''></img>
        </div>
        <div className='flex2'>
          <img className='phone_sec' src='/images/logo.jpeg' alt=''></img>
          <p className='login_title'>Smart Hydroponics</p>

          <Form
            style={{ width: "100%", marginLeft: "100px" }}
            autoComplete='off'
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            onFinish={(values) => {
              handleSignup(values);
            }}
            onFinishFailed={(error) => {}}>
            <div className='inputs_login'>
              <div className='input_lable'>Full Name</div>
              <Form.Item
                className='email_input'
                name='fullName'
                rules={[
                  {
                    required: true,
                    message: "Please enter your Full Name",
                  },
                ]}
                hasFeedback>
                <Input placeholder='Enter Full Name' />
              </Form.Item>
            </div>
            <div className='inputs_login'>
              <div className='input_lable'>Email</div>
              <Form.Item
                className='email_input'
                name='email'
                // label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email",
                  },
                  { type: "email", message: "Please enter a valid email" },
                ]}
                hasFeedback>
                <Input placeholder='Enter Email' />
              </Form.Item>
            </div>
            <div className='inputs_login'>
              <div className='input_lable'>Password</div>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                  },
                  { min: 8 },
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(""),
                  },
                ]}
                hasFeedback>
                <Input.Password placeholder='Enter Password' />
              </Form.Item>
            </div>

            <Form.Item style={{ marginLeft: "100px" }}>
              <div style={{ textAlign: "center" }}>
                <Button
                  loading={loading}
                  className='login_btn'
                  htmlType='submit'>
                  Signup
                </Button>
                <p>
                  Already Have an account?{" "}
                  <Link
                    to='/'
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                      fontWeight: "bold",
                    }}>
                    Login
                  </Link>
                </p>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Signup;
