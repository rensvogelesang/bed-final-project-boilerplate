import { prisma } from "../prisma/client.js";

const propertySelect = {
  id: true,
  title: true,
  description: true,
  location: true,
  pricePerNight: true,
  bedroomCount: true,
  bathroomCount: true,
  maxGuestCount: true,
  rating: true,
  hostId: true,
  createdAt: true,
  updatedAt: true,
};

export const listProperties = async (query = {}) => {
  const where = {};

  if (query.location) where.location = query.location;
  if (query.hostId) where.hostId = query.hostId;
  if (query.maxGuestCount) {
    where.maxGuestCount = {
      gte: Number(query.maxGuestCount),
    };
  }

  return prisma.property.findMany({
    where,
    select: propertySelect,
  });
};

export const getPropertyById = async (id) => {
  return prisma.property.findUnique({ where: { id }, select: propertySelect });
};

export const createProperty = async (data) => {
  return prisma.property.create({ data, select: propertySelect });
};

export const updateProperty = async (id, data) => {
  const exists = await prisma.property.findUnique({ where: { id } });
  if (!exists) return null;
  return prisma.property.update({
    where: { id },
    data,
    select: propertySelect,
  });
};

export const deleteProperty = async (id) => {
  const exists = await prisma.property.findUnique({ where: { id } });
  if (!exists) return null;
  await prisma.property.delete({ where: { id } });
  return true;
};
