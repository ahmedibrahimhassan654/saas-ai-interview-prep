export function resetPasswordHTMLTemplate(username: string, resetURL: string): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Your Password</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2>Password Reset Request</h2>
    <p>Hello ${username},</p>
    <p>
      You recently requested to reset your password for your PrepAI account.
      Click the button below to reset it. This link is valid for 30 minutes.
    </p>
    <p>
      <a
        href="${resetURL}"
        style="display: inline-block; padding: 10px 20px; background-color: #0070f3; color: #fff; text-decoration: none; border-radius: 5px;"
      >
        Reset Password
      </a>
    </p>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>Best regards,<br />The PrepAI Team</p>
  </body>
</html>`;
}

export default resetPasswordHTMLTemplate;