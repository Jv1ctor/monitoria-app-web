import { ForumListPage } from "../forum/ForumList";
import { ForumTopicPage } from "../forum/ForumTopic";
import Dashboard from "./Dashboard";
import RatingTeachingAssistant from "./RatingTeachingAssistant";
import { WelcomeStudent } from "./WelcomeStudent";
import { studentLoader } from "@/loader/student.loader";

export const studentRoutes = [
  { index: true, element: <WelcomeStudent /> },
  {
    path: "subject",
    element: <Dashboard />,
  },
  {
    path: "frequency",
    element: <RatingTeachingAssistant />,
  },
  {
    path: "materials",
    element: <RatingTeachingAssistant />,
  },
  {
    path: "forum",
    loader: studentLoader,
    element: <ForumListPage />,
  },
  {
    path: "forum/:id",
    loader: studentLoader,
    element: <ForumTopicPage />,
  },
]
