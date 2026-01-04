import * as propertiesService from "../services/properties.service.js";

const SERVER_ERROR = {
  message: "An error occurred on the server, please double-check your request!",
};

// helper: normalize body → Prisma-safe
const normalizePropertyInput = (body) => {
  return {
    hostId: body.hostId,
    title: body.title ?? null,
    description: body.description ?? null,
    location: body.location ?? null,
    pricePerNight: body.pricePerNight,
    bedroomCount: body.bedroomCount ?? body.bedRoomCount ?? null,
    bathroomCount: body.bathroomCount ?? body.bathRoomCount ?? null,
    maxGuestCount: body.maxGuestCount ?? null,
    rating: body.rating ?? null,
  };
};

export const getProperties = async (req, res) => {
  try {
    const properties = await propertiesService.listProperties();
    return res.status(200).json(properties);
  } catch (err) {
    return res.status(500).json(SERVER_ERROR);
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await propertiesService.getPropertyById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    return res.status(200).json(property);
  } catch (err) {
    return res.status(500).json(SERVER_ERROR);
  }
};

export const createProperty = async (req, res, next) => {
  try {
    const {
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathroomCount,
      maxGuestCount,
      rating,
    } = req.body;

    if (!hostId || !location || pricePerNight === undefined) {
      return res.status(400).json({ message: "Invalid property data" });
    }

    const newProperty = await propertiesService.createProperty({
      hostId,
      title: title ?? null,
      description: description ?? null,
      location,
      pricePerNight,
      bedroomCount: bedroomCount ?? null,
      bathroomCount: bathroomCount ?? null,
      maxGuestCount: maxGuestCount ?? null,
      rating: rating ?? null,
    });

    return res.status(201).json(newProperty);
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (req, res) => {
  try {
    const data = normalizePropertyInput(req.body);
    const property = await propertiesService.updateProperty(
      req.params.id,
      data
    );
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    return res.status(200).json(property);
  } catch (err) {
    return res.status(500).json(SERVER_ERROR);
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const deleted = await propertiesService.deleteProperty(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Property not found" });
    }
    return res.status(200).json({ message: "Property deleted" });
  } catch (err) {
    return res.status(500).json(SERVER_ERROR);
  }
};
