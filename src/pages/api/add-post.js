import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const FACEBOOK_GRAPH_API_URL = process.env.FACEBOOK_GRAPH_API_URL;
const PAGE_ID = process.env.PAGE_ID;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

export default async function handler(req, res) {
  try {
    const data = req.body;

    const response = await axios.post(
        `${FACEBOOK_GRAPH_API_URL}/${PAGE_ID}/feed?message=${data}&access_token=${PAGE_ACCESS_TOKEN}`
    );

    if (response.status === 200) {
      console.log('Post created successfully:', response.data);
      res.status(201).json({ message: 'Post created successfully' });
    }
  } catch (e) {
    console.log("==========" , e)
    res.status(500).json({ message: 'Server error' });
  }
}
