import axios from "axios";
import dotenv from "dotenv";
import { addMinutes } from "date-fns";

dotenv.config();

const FACEBOOK_GRAPH_API_URL = process.env.FACEBOOK_GRAPH_API_URL;
const PAGE_ID = process.env.PAGE_ID;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

export default async function handler(req, res) {
  try {
    const { message, link, scheduledPublishTime } = req.body;
    let data;
    if (scheduledPublishTime === "0") {
      data = {
        message,
        link,
        published: true,
      };
    } else {
      const now = new Date();
      const fiveMinutesFromNow = addMinutes(now, Number(scheduledPublishTime));
      const scheduledUnixPublishTime = Math.floor(
        fiveMinutesFromNow.getTime() / 1000,
      );
      data = {
        message,
        link,
        published: false,
        scheduled_publish_time: scheduledUnixPublishTime,
      };
      console.log("data->", data);
    }

    const response = await axios.post(
      `${FACEBOOK_GRAPH_API_URL}/${PAGE_ID}/feed`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PAGE_ACCESS_TOKEN}`,
        },
      },
    );

    if (response.status === 200) {
      res.status(201).json({
        data: response.data,
        message: "Post created successfully",
      });
    }
  } catch (e) {
    console.log("==========", e?.response?.data?.error?.message);
    res.status(500).json({
      data: {},
      message: e?.response?.data?.error?.message ?? e,
    });
  }
}
