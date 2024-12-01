import ContentList from './ContentList';
import NotesSection from './NotesSection';
import ProgressBar from './ProgressBar';
import VideoPlayer from './VideoPlayer';

const CoursePage = () => {
    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Main Content */}
            <div className="flex-grow p-4">
                {/* Breadcrumb and Title */}
                <div className="mb-4">
                    <h2 className="text-xl font-bold">Milk Processing and Standardization</h2>
                    <p className="text-sm text-gray-500">My Course / GATE XE / Food Technology</p>
                </div>
                {/* Video Player */}
                <VideoPlayer videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
                {/* Notes Section */}
                <NotesSection />
            </div>
            {/* Sidebar */}
            <div className="w-full md:w-1/3 bg-gray-100 p-4">
                <ProgressBar progress={82} />
                <ContentList />
            </div>
        </div>
    );
};

export default CoursePage;
