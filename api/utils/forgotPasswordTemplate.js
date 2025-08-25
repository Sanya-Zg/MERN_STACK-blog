const forgotPasswordTemplate = ({ name, otp }) => {
  return `
    <div>
      <p>Dear ${name},</p>
      <p>You have requested a password reset. Please use the following OTP code to reset your password:</p>
      <div style='background:yellow; font-size:20px; padding:10px; text-align: center;'>
        <strong>${otp}</strong>
      </div>
      <p>This OTP is valid for 1 hour only. Enter this OTP on the Blog website to proceed with resetting your password.</p>
      <br/>
      <p>Thanks,</p>
      <p>BLOG Team</p>
    </div>
  `;
};
export default forgotPasswordTemplate;
