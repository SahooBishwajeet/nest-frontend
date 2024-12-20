"use client";

import { useEffect, useState } from "react";
import api from "../api/axios";
import NotesSection from "./NotesSection/NotesSection";
import ProgressBar from "./ProgressBar";
import Sidebar from "./SidebarSection/Sidebar";
import VideoPlayer from "./VideoPlayerSection/VideoPlayer";

const CoursePage: React.FC = () => {
  const courseId = "C001"; // Replace with dynamic courseId if needed
  const userId = "123456"; // Replace with dynamic userId if needed

  const [course, setCourse] = useState<any>(null); // Course data from /courses
  const [userCourseStatuses, setUserCourseStatuses] = useState<any[]>([]); // User-specific statuses from /user-courses
  const [selectedContent, setSelectedContent] = useState<any>(null); // Currently selected content
  const [selectedContentId, setSelectedContentId] = useState<string | null>(
    null
  ); // ID of the selected content
  const [sidebarKey, setSidebarKey] = useState<number>(0); // Unique key for Sidebar re-render
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch course data
        const courseResponse = await api.get(`/courses/${courseId}`);
        setCourse(courseResponse.data);

        // Fetch user-specific content statuses
        const userCourseResponse = await api.get(
          `/user-courses/${userId}/${courseId}/contents`
        );
        setUserCourseStatuses(userCourseResponse.data);

        // Automatically select the first content from the first parent topic
        const firstParent = courseResponse.data.parentTopics[0];
        if (firstParent && firstParent.contents.length > 0) {
          const firstContent = firstParent.contents[0];
          const contentStatus = getContentStatus(
            userCourseResponse.data,
            firstParent.parentId,
            firstContent.contentId
          );

          setSelectedContent({
            ...firstContent,
            parentTopic: firstParent.parentId,
            status: contentStatus,
          });
          setSelectedContentId(firstContent.contentId);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [courseId, userId]);

  const getContentStatus = (
    statuses: any[],
    parentTopicId: string,
    contentId: string
  ): string => {
    const parentTopic = statuses.find(
      (topic: any) => topic.parentTopicId === parentTopicId
    );
    if (parentTopic) {
      const content = parentTopic.contents.find(
        (item: any) => item.contentId === contentId
      );
      return content ? content.status : "Not Completed";
    }
    return "Not Completed"; // Default status
  };

  const refreshSidebar = async () => {
    try {
      const response = await api.get(
        `/user-courses/${userId}/${courseId}/contents`
      );
      setUserCourseStatuses(response.data); // Update content statuses
      setSidebarKey((prevKey) => prevKey + 1); // Force Sidebar re-render by updating key
    } catch (error) {
      console.error("Error refreshing content statuses:", error);
    }
  };

  const handleContentSelect = (content: any, parentTopicId: string) => {
    const contentStatus = getContentStatus(
      userCourseStatuses,
      parentTopicId,
      content.contentId
    );

    setSelectedContent({
      ...content,
      parentTopic: parentTopicId,
      status: contentStatus,
    });
    setSelectedContentId(content.contentId);
  };

  const calculateProgress = (): number => {
    if (!userCourseStatuses || userCourseStatuses.length === 0) {
      return 0; // No data, no progress
    }

    const totalContents = userCourseStatuses.reduce(
      (total, parent) => total + parent.contents.length,
      0
    );
    const completedContents = userCourseStatuses.reduce(
      (completed, parent) =>
        completed +
        parent.contents.filter((content: any) => content.status === "Completed")
          .length,
      0
    );

    return totalContents > 0
      ? Math.round((completedContents / totalContents) * 100)
      : 0;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col h-full lg:flex-row">
      {/* Main Content */}
      <div className="flex-grow p-4">
        {/* Course Title */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">My Course / {course.category} / { course.title } </p>
        </div>

        {/* Video Player */}
        {selectedContent ? (
          <VideoPlayer
            selectedContent={selectedContent}
            userId={userId}
            courseId={courseId}
            parentTopics={course.parentTopics}
            onContentSelect={handleContentSelect}
            refreshSidebar={refreshSidebar}
          />
        ) : (
          <p>Please select a content to view</p>
        )}

        {/* Notes Section */}
        <NotesSection
          courseId={courseId}
          userId={userId}
          notes={course.notes}
        />
      </div>

      {/* Sidebar Section */}
      <div className={`w-full lg:w-1/3 bg-gray-100 p-4`}>
        {/* Course Name */}
        <p className="text-3xl font-semibold mb-2">{course.title}</p>
        {/* Progress Bar */}
        <ProgressBar progress={calculateProgress()} />

        {/* Sidebar */}
        <Sidebar
          key={sidebarKey} // Force re-render when key changes
          courseId={courseId}
          userId={userId}
          onContentSelect={handleContentSelect} // Pass parentTopic and content to handleContentSelect
          selectedContentId={selectedContentId}
          setSelectedContentId={setSelectedContentId}
          userCourseStatuses={userCourseStatuses} // Pass updated statuses
        />
      </div>
    </div>
  );
};

export default CoursePage;
