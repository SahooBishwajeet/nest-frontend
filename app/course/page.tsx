'use client';

import { useEffect, useState } from 'react';
import api from '../api/axios';
import NotesSection from './NotesSection/NotesSection';
import ProgressBar from './ProgressBar';
import Sidebar from './SidebarSection/Sidebar';
import VideoPlayer from './VideoPlayerSection/VideoPlayer';

const CoursePage: React.FC = () => {
  const courseId = 'C001'; // Replace with dynamic courseId if needed
  const userId = '123456'; // Replace with dynamic userId if needed

  const [course, setCourse] = useState<any>(null); // Course data from /courses
  const [selectedContent, setSelectedContent] = useState<any>(null); // Currently selected content
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null); // ID of the selected content
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch course data
        const courseResponse = await api.get(`/courses/${courseId}`);
        setCourse(courseResponse.data);

        // Automatically select the first content from the first parent topic
        const firstParent = courseResponse.data.parentTopics[0];
        if (firstParent && firstParent.contents.length > 0) {
          setSelectedContent({
            ...firstParent.contents[0],
            parentTopic: firstParent.parentId, // Include parentTopic when setting state
          });
          setSelectedContentId(firstParent.contents[0].contentId);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [courseId]);

  const handleContentSelect = (content: any, parentTopic: string) => {
    setSelectedContent({
      ...content,
      parentTopic, // Add parentTopic to the selectedContent
    });
    setSelectedContentId(content.contentId);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Main Content */}
      <div className="flex-grow p-4">
        {/* Course Title */}
        <div className="mb-4">
          <h2 className="text-xl font-bold">{course.title}</h2>
          <p className="text-sm text-gray-500">My Course / {course.category}</p>
        </div>

        {/* Video Player */}
        {selectedContent ? (
          <VideoPlayer
            selectedContent={selectedContent}
            userId={userId}
            courseId={courseId}
            refreshSidebar={() => {
              // Fetch updated user-course content statuses
              const fetchUserContentStatuses = async () => {
                try {
                  const response = await api.get(`/user-courses/${userId}/${courseId}/contents`);
                  setUserCourseProgress(response.data); // Assuming this state exists to store progress
                } catch (error) {
                  console.error('Error refreshing content statuses:', error);
                }
              };

              fetchUserContentStatuses();
            }}
          />
        ) : (
          <p>Please select a content to view</p>
        )}

        {/* Notes Section */}
        <NotesSection courseId={courseId} userId={userId} notes={course.notes} />
      </div>

      {/* Sidebar Section */}
      <div className="w-full md:w-1/3 bg-gray-100 p-4">
        {/* Progress Bar */}
        <ProgressBar progress={course.progress?.completedPercentage || 0} />

        {/* Sidebar */}
        <Sidebar
          courseId={courseId}
          userId={userId}
          onContentSelect={handleContentSelect} // Pass parentTopic to handleContentSelect
          selectedContentId={selectedContentId}
          setSelectedContentId={setSelectedContentId}
        />
      </div>
    </div>
  );
};

export default CoursePage;
