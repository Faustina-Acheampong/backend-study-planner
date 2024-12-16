import { app } from "./app.js";
import { PORT } from "./utils/config.js";

app.post("/assignments", async (req, res) => {
  try {
    const result = await assignmentsController.createAssignment(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create assignment" });
  }
});

app.get("/assignments", async (req, res) => {
  try {
    const assignments = await assignmentsController.getAssignments();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
