import { useState } from 'react';

const PreviewToggle = ({ children, previewLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const content = children?.toString() || '';
  const shouldShowToggle = content.length > previewLength;

  if (!shouldShowToggle) {
    return (
      <pre className="whitespace-pre-wrap select-all cursor-text font-mono text-sm">
        {content}
      </pre>
    );
  }

  const displayContent = isExpanded ? content : content.slice(0, previewLength) + '...';

  return (
    <div className="space-y-2">
      <pre className="whitespace-pre-wrap select-all cursor-text font-mono text-sm">
        {displayContent}
      </pre>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 
                  transition-colors duration-200"
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>
    </div>
  );
};

export default PreviewToggle; 