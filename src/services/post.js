import axios from "axios";
import { toast } from "react-toastify";

export const addPost = async (payload) => {
  try {
    const response = await axios.post("/api/add-post", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response?.status === 201) {
      toast.success(response?.data?.message);
      return response?.data;
    }
  } catch (error) {
    toast.error(`Failed to post: ${error?.response?.data?.message}`);
  }
};
