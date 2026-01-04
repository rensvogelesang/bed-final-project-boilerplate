import { prisma } from "../prisma/client.js";

const userSelect = {
  id: true,
  username: true,
  name: true,
  email: true,
  phoneNumber: true,
  pictureUrl: true,
  createdAt: true,
  updatedAt: true,
};

export const listUsers = async ({ username, email } = {}) => {
  const where = {};

  if (username) where.username = username;
  if (email) where.email = email;

  return prisma.user.findMany({
    where,
    select: userSelect,
  });
};

export const getUserById = async (id) => {
  return prisma.user.findUnique({ where: { id }, select: userSelect });
};

export const createUser = async (data) => {
  const created = await prisma.user.create({ data, select: userSelect });
  return created;
};

export const updateUser = async (id, data) => {
  const exists = await prisma.user.findUnique({ where: { id } });
  if (!exists) return null;

  return prisma.user.update({ where: { id }, data, select: userSelect });
};

export const deleteUser = async (id) => {
  const exists = await prisma.user.findUnique({ where: { id } });
  if (!exists) return null;

  await prisma.user.delete({ where: { id } });
  return true;
};
