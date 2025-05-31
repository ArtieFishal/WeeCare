import React from 'react';

const ChapterList: React.FC<{
  selectedChapter: number;
  onSelectChapter: (chapterId: number) => void;
}> = ({ selectedChapter, onSelectChapter }) => {
  const chapters = [
    { id: 1, title: 'Regulatory Requirements', icon: '📋' },
    { id: 2, title: 'Licensing Process', icon: '⏱️' },
    { id: 3, title: 'Accreditation Options', icon: '🏅' },
    { id: 4, title: 'Location Selection', icon: '📍' },
    { id: 5, title: 'Admissions & Weekly Billing', icon: '💰' },
    { id: 6, title: 'Equipment & Materials', icon: '🧸' },
    { id: 7, title: 'Staffing & Hiring', icon: '👥' },
    { id: 8, title: 'Staff Qualifications', icon: '🎓' },
    { id: 9, title: 'Curriculum Development', icon: '📚' },
    { id: 10, title: 'Daily Scheduling', icon: '⏰' },
    { id: 11, title: 'Activity Planning', icon: '🎮' },
    { id: 12, title: 'Child Assessment', icon: '📊' },
    { id: 13, title: 'Health & Safety', icon: '🩺' },
    { id: 14, title: 'Nutrition & Meals', icon: '🍎' },
    { id: 15, title: 'Parent Communication', icon: '💬' },
    { id: 16, title: 'Financial Management', icon: '💰' },
    { id: 17, title: 'Marketing Strategies', icon: '📣' }
  ];

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-md">
      <div className="p-4 bg-muted">
        <h2 className="text-xl font-bold">Chapters</h2>
      </div>
      <div className="divide-y">
        {chapters.map(chapter => (
          <button
            key={chapter.id}
            onClick={() => onSelectChapter(chapter.id)}
            onTouchStart={() => {}} // Empty handler to ensure touch events are captured
            data-chapter-id={chapter.id}
            className={`w-full p-3 text-left transition-colors flex items-center ${
              selectedChapter === chapter.id
                ? 'bg-primary/10 text-primary'
                : 'hover:bg-muted/50'
            }`}
            aria-label={`Select chapter: ${chapter.title}`}
            role="button"
            tabIndex={0}
          >
            <span className="text-xl mr-3">{chapter.icon}</span>
            <span className={selectedChapter === chapter.id ? 'font-medium' : ''}>
              {chapter.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export { ChapterList };
