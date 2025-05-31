import React from 'react';

interface CenterInfo {
  name: string;
  address: string;
  license: string;
  director: string;
  phone: string;
  email: string;
}

interface RegulationItem {
  id: string;
  category: string;
  description: string;
  reference: string;
  url?: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

interface PrintableProps {
  centerInfo: CenterInfo;
  regulations: RegulationItem[];
  checkedItems: Record<string, boolean>;
  notes: Record<string, string>;
  date: string;
}

const RegulationPrintable: React.FC<PrintableProps> = ({
  centerInfo,
  regulations,
  checkedItems,
  notes,
  date
}) => {
  const categories = [...new Set(regulations.map(item => item.category))];
  
  const calculateProgress = () => {
    const totalItems = regulations.length;
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((checkedCount / totalItems) * 100);
  };
  
  const calculateCategoryProgress = (category: string) => {
    const categoryItems = regulations.filter(reg => reg.category === category);
    const checkedCategoryItems = categoryItems.filter(reg => checkedItems[reg.id]);
    return Math.round((checkedCategoryItems.length / categoryItems.length) * 100);
  };
  
  return (
    <div className="print-container p-8 max-w-[800px] mx-auto bg-white text-black">
      <div className="header border-b-2 border-gray-800 pb-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Tennessee Child Care Regulation Compliance Report</h1>
            <p className="text-sm mt-1">Generated on: {date}</p>
          </div>
          <div className="text-right">
            <div className="w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-xl ml-auto" style={{
              borderColor: 
                calculateProgress() >= 90 ? '#22c55e' : 
                calculateProgress() >= 70 ? '#f59e0b' : 
                '#ef4444'
            }}>
              {calculateProgress()}%
            </div>
          </div>
        </div>
      </div>
      
      <div className="center-info mb-6">
        <h2 className="text-lg font-bold mb-2">Child Care Center Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Center Name:</strong> {centerInfo.name || 'Not provided'}</p>
            <p><strong>Address:</strong> {centerInfo.address || 'Not provided'}</p>
            <p><strong>License Number:</strong> {centerInfo.license || 'Not provided'}</p>
          </div>
          <div>
            <p><strong>Director:</strong> {centerInfo.director || 'Not provided'}</p>
            <p><strong>Phone:</strong> {centerInfo.phone || 'Not provided'}</p>
            <p><strong>Email:</strong> {centerInfo.email || 'Not provided'}</p>
          </div>
        </div>
      </div>
      
      <div className="summary mb-6">
        <h2 className="text-lg font-bold mb-2">Compliance Summary</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Category</th>
              <th className="border border-gray-300 p-2 text-center">Compliance</th>
              <th className="border border-gray-300 p-2 text-center">Items Met</th>
              <th className="border border-gray-300 p-2 text-center">Total Items</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => {
              const categoryItems = regulations.filter(reg => reg.category === category);
              const completedItems = categoryItems.filter(reg => checkedItems[reg.id]);
              return (
                <tr key={category}>
                  <td className="border border-gray-300 p-2">{category}</td>
                  <td className="border border-gray-300 p-2 text-center">{calculateCategoryProgress(category)}%</td>
                  <td className="border border-gray-300 p-2 text-center">{completedItems.length}</td>
                  <td className="border border-gray-300 p-2 text-center">{categoryItems.length}</td>
                </tr>
              );
            })}
            <tr className="font-bold bg-gray-100">
              <td className="border border-gray-300 p-2">Overall</td>
              <td className="border border-gray-300 p-2 text-center">{calculateProgress()}%</td>
              <td className="border border-gray-300 p-2 text-center">
                {Object.values(checkedItems).filter(Boolean).length}
              </td>
              <td className="border border-gray-300 p-2 text-center">{regulations.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="detailed-checklist">
        <h2 className="text-lg font-bold mb-2">Detailed Compliance Checklist</h2>
        
        {categories.map(category => (
          <div key={category} className="mb-6">
            <h3 className="font-bold border-b border-gray-300 pb-1 mb-2">{category}</h3>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left w-8">Status</th>
                  <th className="border border-gray-300 p-2 text-left">Requirement</th>
                  <th className="border border-gray-300 p-2 text-left w-24">Reference</th>
                  <th className="border border-gray-300 p-2 text-left w-20">Priority</th>
                </tr>
              </thead>
              <tbody>
                {regulations
                  .filter(reg => reg.category === category)
                  .map(regulation => (
                    <React.Fragment key={regulation.id}>
                      <tr>
                        <td className="border border-gray-300 p-2 text-center">
                          {checkedItems[regulation.id] ? '✅' : '❌'}
                        </td>
                        <td className="border border-gray-300 p-2">{regulation.description}</td>
                        <td className="border border-gray-300 p-2 text-xs">{regulation.reference}</td>
                        <td className="border border-gray-300 p-2">
                          <span className={
                            regulation.priority === 'critical' ? 'text-red-600 font-bold' :
                            regulation.priority === 'high' ? 'text-orange-500 font-bold' :
                            regulation.priority === 'medium' ? 'text-blue-600' :
                            'text-gray-600'
                          }>
                            {regulation.priority.charAt(0).toUpperCase() + regulation.priority.slice(1)}
                          </span>
                        </td>
                      </tr>
                      {notes[regulation.id] && (
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-2 text-center">📝</td>
                          <td className="border border-gray-300 p-2 text-xs italic" colSpan={3}>
                            <strong>Notes:</strong> {notes[regulation.id]}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      
      <div className="action-items mt-8 mb-6">
        <h2 className="text-lg font-bold mb-2">Priority Action Items</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Requirement</th>
              <th className="border border-gray-300 p-2 text-left w-20">Priority</th>
              <th className="border border-gray-300 p-2 text-left">Reference</th>
            </tr>
          </thead>
          <tbody>
            {regulations
              .filter(reg => !checkedItems[reg.id])
              .sort((a, b) => {
                const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
              })
              .slice(0, 10)
              .map(regulation => (
                <tr key={regulation.id}>
                  <td className="border border-gray-300 p-2">{regulation.description}</td>
                  <td className="border border-gray-300 p-2">
                    <span className={
                      regulation.priority === 'critical' ? 'text-red-600 font-bold' :
                      regulation.priority === 'high' ? 'text-orange-500 font-bold' :
                      regulation.priority === 'medium' ? 'text-blue-600' :
                      'text-gray-600'
                    }>
                      {regulation.priority.charAt(0).toUpperCase() + regulation.priority.slice(1)}
                    </span>
                  </td>
                  <td className="border border-gray-300 p-2 text-xs">{regulation.reference}</td>
                </tr>
              ))}
            {regulations.filter(reg => !checkedItems[reg.id]).length === 0 && (
              <tr>
                <td colSpan={3} className="border border-gray-300 p-2 text-center">
                  No pending items. All requirements have been met!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="footer mt-8 pt-4 border-t border-gray-300 text-xs text-gray-500">
        <p>This report is generated as a self-assessment tool and does not replace official Tennessee Department of Human Services inspections.</p>
        <p>For official regulations, visit: <span className="underline">https://www.tn.gov/humanservices/for-families/child-care-services.html</span></p>
        <div className="flex justify-between mt-2">
          <p>Tennessee Child Care Center Guide</p>
          <p>Page 1 of 1</p>
        </div>
      </div>
    </div>
  );
};

export default RegulationPrintable;
