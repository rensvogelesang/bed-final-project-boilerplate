import { prisma } from "../prisma/client.js";

const hostSelect = {
  id: true,
  username: true,
  name: true,
  email: true,
  phoneNumber: true,
  pictureUrl: true,
  aboutMe: true,
  createdAt: true,
  updatedAt: true,
};

// GET ALL HOSTS

export const listHosts = async ({ name } = {}) => {
  if (name) {
    return prisma.host.findMany({
      where: { name },
      select: hostSelect,
    });
  }

  return prisma.host.findMany({
    select: hostSelect,
  });
};

// GET HOST BY ID

export const getHostById = async (id) => {
  return prisma.host.findUnique({
    where: { id },
    select: hostSelect,
  });
};

// GET HOST BY USERNAME

export const getHostByUsername = async (username) => {
  return prisma.host.findUnique({
    where: { username },
    select: hostSelect,
  });
};

// CREATE HOST

export const createHost = async (data) => {
  return prisma.host.create({
    data,
    select: hostSelect,
  });
};

// UPDATE HOST

export const updateHost = async (id, data) => {
  const exists = await prisma.host.findUnique({ where: { id } });
  if (!exists) return null;

  return prisma.host.update({
    where: { id },
    data,
    select: hostSelect,
  });
};

// DELETE HOST

export const deleteHost = async (id) => {
  const exists = await prisma.host.findUnique({ where: { id } });
  if (!exists) return null;

  await prisma.host.delete({ where: { id } });
  return true;
};
