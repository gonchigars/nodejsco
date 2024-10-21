const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendJobAlert = async (recipient, job) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipient,
    subject: `New Job Alert: ${job.title}`,
    html: `
      <h1>New Job Opportunity</h1>
      <h2>${job.title}</h2>
      <p><strong>Company:</strong> ${job.company.name}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Description:</strong> ${job.description}</p>
      <p><strong>Requirements:</strong></p>
      <ul>
        ${job.requirements.map((req) => `<li>${req}</li>`).join("")}
      </ul>
      <p><strong>Salary:</strong> ${job.salary}</p>
      <p><strong>Application Deadline:</strong> ${job.applicationDeadline.toDateString()}</p>
      <p>Apply now on our job board!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Job alert sent to ${recipient}`);
  } catch (error) {
    console.error("Error sending job alert:", error);
  }
};

module.exports = {
  sendJobAlert,
};
