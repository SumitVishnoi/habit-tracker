import axios from "axios";

const checkinApiInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const createCheckIn = async (habitId, date) => {
  const response = await checkinApiInstance.post(
    `/habits/${habitId}/check-ins`,
    {
      date,
    },
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const getCheckInHistory = async (habitId) => {
  const response = await checkinApiInstance.get(
    `/habits/${habitId}/check-ins`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const deleteCheckIn = async (habitId, checkInId) => {
  const response = await checkinApiInstance.delete(
    `/habits/${habitId}/check-ins/${checkInId}`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};
