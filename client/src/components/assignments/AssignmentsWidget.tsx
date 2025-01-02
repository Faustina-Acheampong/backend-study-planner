{
  /* component that is on the home page */
}
{
  /* Assignments title + show all button */
}
{
  /* list view of 5 assignments */
}

import React from "react";
import TasksSection from "./TasksSection";
import AssignmentHeader from "./AssignmentHeader";
import AssignmentDetails from "./AssignmentDetails";
import NotesSection from "./NotesSection";

const AssignmentsWidget = () => {
  return (
    <div className="container">
      <AssignmentHeader />
      <AssignmentDetails />
      <TasksSection />
      <NotesSection />
    </div>
  );
};

export default AssignmentsWidget;
