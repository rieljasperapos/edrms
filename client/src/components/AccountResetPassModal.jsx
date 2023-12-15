import React, { useState, useEffect } from "react";
import "../index.css";
import { IoMdCloseCircle } from "react-icons/io";
import Matched from "../assets/icon-check.png";
import EyeIcon from "../assets/eye-icon.png";
import { MdError } from "react-icons/md";

function AccountResetPassModal({
  propResetId,
  propSetVisiblePasswordReset,
  propSetPasswordResetSuccess,
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchStatus, setMatchStatus] = useState(false);
  const [validPassword, setValidPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [matchStatusPopup, setMatchStatusPopup] = useState(false);
  const [newPassRequired, setNewPassRequired] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setMatchStatus(
      password === confirmPassword &&
        (password !== "" || confirmPassword !== ""),
    );
  }, [password, confirmPassword]);

  const testPasswordValidity = (password, confirmPassword) => {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+={}[\]|;:'"<>?,.\/])[A-Za-z\d!@#$%^&*()\-_+={}[\]|;:'"<>?,.\/]{8,}$/;
    const isLengthValid = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()\-_+={}[\]|;:'"<>?,.\/]/.test(password);
    const meetsComplexityRequirements = regex.test(password);

    const isValid =
      password !== "" &&
      isLengthValid &&
      hasUppercase &&
      hasDigit &&
      hasSpecialChar &&
      meetsComplexityRequirements;

    return isValid;
  };

  const handleSubmit = () => {
    console.log(propResetId);
    setValidPassword(true);
    setMatchStatusPopup(false);
    setNewPassRequired(false);
    if (!testPasswordValidity(password, confirmPassword)) {
      setValidPassword(false);
      return;
    }
    if (!matchStatus) {
      setMatchStatusPopup(true);
      return;
    }

    fetch(`http://localhost:3000/resetPassword/${propResetId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newPassword: password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Check the status and handle accordingly
        if (data.status === 200) {
          // Password reset successfully
          console.log("Password reset successfully:", data.message);
          // You can handle success here, such as redirecting or showing a success message
          propSetVisiblePasswordReset(false);
          propSetPasswordResetSuccess(true);
        } else {
          // Handle other status codes or display an error message
          console.error("Error resetting password:", data.message);
          setNewPassRequired(true);
        }
      })
      .catch((error) => {
        console.error("Error resetting password:", error.message);
      });
  };

  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-70 ">
        <div className="flex w-5/12 flex-col gap-2 rounded-lg border-2 bg-white">
          <div className="flex flex-col">
            <button
              className="self-end rounded-lg pr-1 pt-1 text-2xl text-gray-500 hover:text-black"
              onClick={() => propSetVisiblePasswordReset(false)}
            >
              <IoMdCloseCircle />
            </button>
          </div>

          <form
            className="flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flex items-center justify-center p-4">
              <div className="w-full">
                <div className="flex">
                  <p>Password</p>
                  {matchStatus && (
                    <img className="ml-2 h-6" src={Matched}></img>
                  )}
                </div>
                <div className="relative">
                  <input
                    required
                    value={password}
                    type={showPassword ? "text" : "password"}
                    className="w-full rounded-lg border p-2"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className="absolute right-4 top-2.5 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    <img
                      className="h-5"
                      src={EyeIcon}
                      alt={showPassword ? "Hide" : "Show"}
                    />
                  </div>
                </div>
                {!validPassword && (
                  <div className="pt-1 text-xs text-red-500">
                    <div className="flex items-center gap-1">
                      <MdError />
                      Password must contain:
                    </div>
                    <ul>
                      <li>Minimum 8 characters required</li>
                      <li>Must contain at least one uppercase character.</li>
                      <li>Must contain at least one number (0-9)</li>
                    </ul>
                  </div>
                )}
                {newPassRequired && (
                  <div className="pt-1 text-xs text-red-500">
                    <div className="flex items-center gap-1">
                      <MdError />
                      New password cannot be the same with old password
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center p-4">
              <div className="w-full">
                <div className="flex">
                  <p>Confirm Password</p>
                  {matchStatus && (
                    <img className="ml-2 h-6" src={Matched}></img>
                  )}
                </div>
                <div className="relative">
                  <input
                    required
                    value={confirmPassword}
                    type={showPassword ? "text" : "password"}
                    className="w-full rounded-lg border p-2"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div
                    className="absolute right-4 top-2.5 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    <img
                      className="h-5"
                      src={EyeIcon}
                      alt={showPassword ? "Hide" : "Show"}
                    />
                  </div>
                </div>
                {matchStatusPopup && (
                  <div className="pt-1 text-xs text-red-500">
                    <div className="flex items-center gap-1">
                      <MdError />
                      Confirm Password must match password
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>

          <div className="mb-5 mt-3 flex w-full justify-center">
            <button
              className="rounded-lg border-2 bg-custom-green px-5 py-1 text-lg  text-white hover:bg-green-600"
              onClick={handleSubmit}
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountResetPassModal;
