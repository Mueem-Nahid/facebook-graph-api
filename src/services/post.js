import axios from "axios";

export const addPost = async (payload) => {
  try {
    const response = await axios.post("/api/add-post", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response?.status === 201) {
      return response?.data;
    }
  } catch (error) {
    console.error("Error adding post:", error);
    return error;
  }
};
