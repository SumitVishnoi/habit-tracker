import axios from "axios";

const habitApiInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const getHabits = async () => {
  const response = await habitApiInstance.get(`/habits`, {
    withCredentials: true,
  });

  return response.data;
};

export const getHabitById = async (habitId) => {
  const response = await habitApiInstance.get(`/habits/${habitId}`, {
    withCredentials: true,
  });

  return response.data;
};

export const createHabit = async (habitData) => {
  const response = await habitApiInstance.post(`/habits`, habitData, {
    withCredentials: true,
  });

  return response.data;
};

export const updateHabit = async (habitId, habitData) => {
  const response = await habitApiInstance.patch(
    `/habits/${habitId}`,
    habitData,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const deleteHabit = async (habitId) => {
  const response = await habitApiInstance.delete(`/habits/${habitId}`, {
    withCredentials: true,
  });

  return response.data;
};
