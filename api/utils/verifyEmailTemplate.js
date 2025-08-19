const verifyEmailTemplate = ({ username, url }) => {
  return `
  <p>Dear <span style='font-size: 20px; color: green; font-weight: 600'>${username}</span></p>
  <p>Thank you for registering in <span style='font-size: 18px; color: blue; font-weight: 500'>Blog</span>.</p>
  <a href=${url} style='display: inline-block; padding: 10px 20px; background: #007BFF; color: white; font-weight: 500; text-decoration: none; border-radius: 5px;'>
    Verify Email
  </a>
  `;
};

export default verifyEmailTemplate;
