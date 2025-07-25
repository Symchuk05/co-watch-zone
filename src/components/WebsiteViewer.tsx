interface WebsiteViewerProps {
  url: string;
  className?: string;
}

const WebsiteViewer = ({ url, className = "" }: WebsiteViewerProps) => {
  // Clean the URL for iframe usage
  const cleanUrl = url.startsWith('http') ? url : `https://${url}`;
  
  return (
    <div className={`w-full h-full relative ${className}`}>
      <iframe
        src={cleanUrl}
        className="w-full h-full border-0"
        frameBorder="0"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        title="Website Viewer"
      />
      <div className="absolute top-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
        {cleanUrl}
      </div>
    </div>
  );
};

export default WebsiteViewer;