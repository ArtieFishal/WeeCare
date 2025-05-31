import React from 'react';
import { interactiveComponents } from './interactive';

interface ChapterContentProps {
  chapterId: number;
}

const ChapterContent: React.FC<ChapterContentProps> = ({ chapterId }) => {
  const chapterTitles = [
    { id: 1, title: 'Regulatory Requirements', description: 'Understanding and navigating the regulatory landscape for child care centers.' },
    { id: 2, title: 'Licensing Process', description: 'Step-by-step guide to obtaining and maintaining your child care license.' },
    { id: 3, title: 'Accreditation Options', description: 'Exploring different accreditation paths to enhance your center\'s credibility.' },
    { id: 4, title: 'Location Selection', description: 'Factors to consider when choosing the perfect location for your child care center.' },
    { id: 5, title: 'Admissions & Weekly Billing', description: 'Managing enrollment, attendance tracking, and weekly billing in an integrated system.' },
    { id: 6, title: 'Equipment & Materials', description: 'Essential equipment and materials for a well-equipped child care center.' },
    { id: 7, title: 'Staffing & Hiring', description: 'Recruiting, hiring, and retaining qualified child care professionals.' },
    { id: 8, title: 'Staff Qualifications', description: 'Understanding required qualifications and ongoing professional development.' },
    { id: 9, title: 'Curriculum Development', description: 'Creating age-appropriate curriculum that supports holistic development.' },
    { id: 10, title: 'Daily Scheduling', description: 'Structuring daily routines that balance learning, play, and rest.' },
    { id: 11, title: 'Activity Planning', description: 'Designing engaging activities that promote development across domains.' },
    { id: 12, title: 'Child Assessment', description: 'Methods for observing, documenting, and assessing child development.' },
    { id: 13, title: 'Health & Safety', description: 'Implementing comprehensive health and safety protocols.' },
    { id: 14, title: 'Nutrition & Meals', description: 'Planning nutritious meals and snacks that meet dietary guidelines.' },
    { id: 15, title: 'Parent Communication', description: 'Building strong partnerships with families through effective communication.' },
    { id: 16, title: 'Financial Management', description: 'Budgeting, financial planning, and sustainable business practices.' },
    { id: 17, title: 'Marketing Strategies', description: 'Promoting your child care center and building enrollment.' }
  ];

  const currentChapter = chapterTitles.find(chapter => chapter.id === chapterId) || chapterTitles[0];
  const InteractiveComponent = interactiveComponents[chapterId as keyof typeof interactiveComponents];

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-2">{currentChapter.title}</h2>
        <p className="text-muted-foreground">{currentChapter.description}</p>
      </div>

      <div className="bg-card rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-bold mb-4">Chapter Content</h3>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            This chapter provides comprehensive guidance on {currentChapter.title.toLowerCase()}.
            Explore the interactive element below to apply concepts from this chapter to your
            child care center planning and operations.
          </p>
          
          <p>
            The content in this section is designed to help child care center directors and
            administrators implement best practices in {currentChapter.title.toLowerCase()}.
          </p>
        </div>
      </div>

      {InteractiveComponent && (
        <div className="bg-card rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4">Interactive Tool</h3>
          <InteractiveComponent />
        </div>
      )}

      <div className="bg-card rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-bold mb-4">Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-lg flex items-center">
            <span className="text-2xl mr-3">📄</span>
            <div>
              <h4 className="font-medium">Printable Worksheet</h4>
              <p className="text-sm text-muted-foreground">Download and print for offline use</p>
            </div>
          </div>
          <div className="p-4 border border-border rounded-lg flex items-center">
            <span className="text-2xl mr-3">🔗</span>
            <div>
              <h4 className="font-medium">Additional Resources</h4>
              <p className="text-sm text-muted-foreground">External links and references</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ChapterContent };
