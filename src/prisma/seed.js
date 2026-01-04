import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import usersData from "../data/users.json" assert { type: "json" };
import hostsData from "../data/hosts.json" assert { type: "json" };
import propertiesData from "../data/properties.json" assert { type: "json" };
import bookingsData from "../data/bookings.json" assert { type: "json" };
import reviewsData from "../data/reviews.json" assert { type: "json" };

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  /* =====================
     USERS
  ===================== */
  for (const user of usersData.users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        ...user,
        password: await bcrypt.hash(user.password, 10),
      },
    });
  }

  /* =====================
     HOSTS
  ===================== */
  for (const host of hostsData.hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: {
        ...host,
        password: await bcrypt.hash(host.password, 10),
      },
    });
  }

  /* =====================
   PROPERTIES
===================== */
  for (const property of propertiesData.properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: {
        id: property.id,
        title: property.title,
        description: property.description ?? null,
        location: property.location ?? null,
        pricePerNight: property.pricePerNight,
        bedroomCount: property.bedroomCount ?? null,
        bathroomCount: property.bathroomCount ?? null,
        maxGuestCount: property.maxGuestCount ?? null,
        rating: property.rating ?? null,
        hostId: property.hostId,
      },
    });
  }

  /* =====================
   BOOKINGS
===================== */
  for (const booking of bookingsData.bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: {
        id: booking.id,
        userId: booking.userId,
        propertyId: booking.propertyId,
        checkInDate: new Date(booking.checkinDate),
        checkOutDate: new Date(booking.checkoutDate),
        numberOfGuests: booking.numberOfGuests ?? null,
        totalPrice: booking.totalPrice ?? null,
        bookingStatus: booking.bookingStatus
          ? booking.bookingStatus.toUpperCase()
          : "PENDING",
      },
    });
  }

  /* =====================
     REVIEWS
  ===================== */
  for (const review of reviewsData.reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: review,
    });
  }

  console.log("✅ Database seeded successfully");
}

main()
  .then(() => {
    console.log("🌱 Seeding database finished successfully");
  })
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
