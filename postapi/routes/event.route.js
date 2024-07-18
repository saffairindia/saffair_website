const router = require("express").Router();
// const { verify } = require("jsonwebtoken");
const Event = require("../models/Event.model");
const verifyToken = require("../utils/verifyUser");
const campcount = require("../models/Camcount.model")
//create event
const call = async (event) => {
  // Your logic for handling the event goes here
  console.log("Event received:", event);
  // Example: Send event to another service, process it further, etc.
};

router.post("/", async (req, res) => {
  // Check if req.body contains valid data
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing or empty" });
  }

  const newEvent = new Event(req.body);
  try {
    const savedEvent = await newEvent.save();
    // Call the `call` function with the saved event
    await call(savedEvent);
    res.status(201).json(savedEvent); // Use 201 for successful creation
  } catch (error) {
    console.error("Error saving event:", error);
    res.status(500).json({ error: "Failed to save event" });
  }
});
// Add interest to an event
router.post('/addInterest', async (req, res) => {
  const { eventId, userId, response } = req.body;
  
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send('Event not found');
    }

    let Count = await campcount.findOne({ eventId });
    if (!Count) {
      Count = await campcount.create({ eventId, yesCount: 0, noCount: 0, maybeCount: 0, userResponses: [] });
    }
    
    const existingInterest = await campcount.findOne({ eventId, userResponses: { $elemMatch: { userId } } });

    if (existingInterest) {
      
       return res.status(400).json({ message: "User has already shown interest in the event" });
    }
    
    const userResponse = {
      userId,
      response,
    };
     
    await campcount.updateOne(
      { eventId },
      {
        $push: { userResponses: userResponse },
        $inc: { [`${userResponse.response}Count`]: 1 },      }
    );
    
    const updatedCampCount = await campcount.findOne({ eventId });

    res.status(200).json(updatedCampCount);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error adding interest to event');
  }
});

router.get('/getCounts/:eventId', async (req, res) => {
  const { eventId } = req.params;

  try {
    const CampCount = await campcount.findOne({ eventId });

    if (!CampCount) {
      return res.status(404).send('Event not found');
    }

    res.status(200).json({ // Changed status code to 200
      yes: CampCount.yesCount,
      no: CampCount.noCount,
      maybe: CampCount.maybeCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching counts for event');
  }
});
//interest
router.put("/addInterest/:eventId/:userId", async (req, res) => {
  try {
    // Extract data from the request body with validation
    const { response } = req.body;

    // Find the event by its ID
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user already has an interest in the event (optional, based on your logic)
    const existingInterest = event.interest.find(
      (interest) => interest.userId === req.params.userId
    );

    if (existingInterest) {
      return res
        .status(400)
        .json({ message: "User has already shown interest in the event" });
    }

    // Create a new interest object
    const newInterest = {
      userId: req.params.userId,
      response,
    };

    // Add the new interest to the event's interests array
    event.interest.push(newInterest);

    // Save the updated event
    await event.save();

    // Send a response indicating success
    res.status(201).json({ success: true });
  } catch (error) {
    console.log("Error adding interest to event:", error);
    res.status(500).json({ message: "Failed to add interest to event" });
  }
});

//update

router.put("updateEvent/:EventId/:userId", async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(500).json("you are not not allowed to update this event");
  }
  try {
    const updateEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(2000).status(updateEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to add an entry to the eventEntries subdocument
router.put("/addEntry/:eventId/:userId", async (req, res) => {
  try {
    // Extract data from the request body with validation
    const { content, image1, image2, link1, link2, category } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    // Find the event by its ID
    const event = await Event.findById({ _id: req.params.eventId });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check for existing entry (optional, based on your logic)
    const existingEntry = event.eventEntries.find(
      (entry) => entry.userId === req.params.userId
    );

    if (existingEntry) {
      return res
        .status(400)
        .json({ message: "User is already a participant in the event" });
    }

    // Create a new entry object with current date and time
    const newEntry = {
      userId: req.params.userId,
      content,
      image1,
      image2,
      date: new Date(), // Use new Date() for current date/time
    };

    // Add the new entry to the eventEntries array
    event.eventEntries.push(newEntry);

    // Save the updated event
    const updatedEvent = await event.save();

    // Send a response indicating success and the updated event data
    res.status(201).json(updatedEvent);
  } catch (error) {
    console.log("Error updating event entry:", error);
    res.status(500).json({ message: error.message }); // Generic error message for user
  }
});

// router.put("joinEvent/:eventId/:userId", async (req, res) => {
//   if (req.user.isAdmin) {
//     res.status(500).json("you are not allowed to join this event");
//   }
//   try {
//     // const joinEvent = await Event.findByIdAndUpdate(
//     //   req.params.id,
//     //   { $set: req.body },
//     //   { new: true }
//     // );

//     const joinEvent = await Event.findOne({ _id: req.body.eventId });

//     joinEvent.data.push({
//       userId: req.params.userId,
//       title,
//       image1,
//       image2,
//       image3,
//       content,
//     });
//     res.status(2000).status(joinEvent);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//api for list event

router.get('/eventTitles', async (req, res) => {
  try {
    const currentDate = new Date(); // Get the current date
    const events = await Event.find({ endDate: { $gte: currentDate } }, 'eventTitle'); // Query to find events where endDate is greater than or equal to currentDate
    res.json(events); // Send the event titles as JSON response
  } catch (error) {
    console.error('Error fetching event titles:', error);
    res.status(500).json({ error: 'Failed to fetch event titles' });
  }
});

router.get("/Events", async (req, res) => {
  res.json(await Event.find().sort({ createdAt: -1 }));
});

//api for event page
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const eventDoc = await Event.findById(id);
  res.json(eventDoc);
});

//delete

router.delete(
  "/deleteEvent/:eventId/:userId",
  verifyToken,
  async (req, res) => {
    if (
      !req.user.isAdmin &&
      req.user.id !== req.params.userId &&
      req.user.id !== req.params.postId
    ) {
      return res.status(403).json("you are not allowed to delete this event");
    }

    try {
      await Event.findByIdAndDelete(req.params.eventId);
      res.status(200).json("The Event has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

module.exports = router;
