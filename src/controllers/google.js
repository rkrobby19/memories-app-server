import * as dotenv from "dotenv";
dotenv.config();
import { OAuth2Client, UserRefreshClient } from "google-auth-library";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, "postmessage");

export const googleAuth = async (req, res) => {
  try {
    const { tokens } = await oAuth2Client.getToken(req.body.code);

    return res.json({ tokens });
  } catch (error) {
    return res.send({ status: error.name, message: error.message });
  }
};

export const googleRefreshToken = async (req, res) => {
  try {
    const user = new UserRefreshClient(
      CLIENT_ID,
      CLIENT_SECRET,
      req.body.refreshToken
    );
    const { credentials } = await user.refreshAccessToken();
    return res.json(credentials);
  } catch (error) {
    return res.send({ status: error.name, message: error.message });
  }
};
